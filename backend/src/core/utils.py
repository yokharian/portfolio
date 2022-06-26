import base64
import csv
import json
from datetime import datetime, timedelta
from io import BytesIO, StringIO
from typing import Any, Iterable, List, Optional, Tuple, Union
from urllib.parse import urlparse

import pytz as tz
from pandas import DataFrame as DaFe, Timestamp
import boto3
from botocore.exceptions import ClientError
from loguru import logger

from .config import STAGE

TEXT_TYPES = ["csv", "txt", "xml", "json"]
FILE_TYPES = [*TEXT_TYPES, "xslx"]


def load_json(file_path):
    """Load a json file."""
    with open(file_path, "r") as file:
        return json.load(file)


def detect_extension(file_path: str) -> str:
    """
    Detects the file type of the given file path.
    Args:
        file_path: to detect extension
    """
    name_split = file_path.split(".")
    if len(name_split) > 1:
        cur_extension = name_split[-1]
        if cur_extension in FILE_TYPES:
            return cur_extension
    return "unknown"


def download_from_s3(bucket: str, key: str) -> Union[BytesIO, StringIO]:
    """
    Downloads the contents of a file from Amazon S3.

    Args:
        bucket: selected bucket
        key: full s3 route to download example
            document.xlsx or my_files/document.xlsx
    """
    obj = boto3.resource("s3").Bucket(bucket).Object(key=key)
    if detect_extension(key) in TEXT_TYPES:
        response = obj.get()
        output = StringIO(response["Body"].read().decode("utf-8"))
    else:
        output = BytesIO()
        obj.download_fileobj(output)
    return output


def upload_to_s3(file: Any, route: str, bucket: str, **kwargs):
    """Upload a file to an S3 bucket
    **kwargs passed through directly to defined uploader method
    returns str if error else None"""
    logger.info("[-] uploading to s3")
    bucket_obj = boto3.resource("s3").Bucket(bucket)
    if type(file) != DaFe:
        return bucket_obj.put_object(Key=route, Body=file, **kwargs)

    extension = detect_extension(route)
    extension = "excel" if extension == "xlsx" else extension
    s3_uri = f"s3://{bucket}/{route}"
    try:
        handler = getattr(file, f"to_{extension}")
        handler(s3_uri, **kwargs)
    except AttributeError:
        return bucket_obj.put_object(Key=route, Body=file, **kwargs)


def obtain_secret(
    name: str, stage: str = STAGE, version=None, decode=True
) -> Optional[Union[bytes, str]]:
    """Using AWS SecretsManager obtain a secret.
    Version (if defined) is used to retrieve a particular version of the secret.
    stage: str = Useful to achieve id = (name + '_' + stage) format"""
    try:
        kwargs = {"SecretId": name}
        if version is not None:
            kwargs["VersionStage"] = version
        response = boto3.client("secretsmanager").get_secret_value(**kwargs)
    except ClientError as e:
        # Secrets Manager can't decrypt the protected secret text
        # using the provided KMS key.
        raise e
    else:
        # Depending on whether the secret is a string or binary,
        # one of these fields will be populated.
        if "SecretString" in response:
            response = json.loads(response["SecretString"])
            return response[f"{name}_{stage}"]
        if decode:
            return base64.b64decode(response["SecretBinary"])
        return response["SecretBinary"]


def extract_csv_header(iterable) -> List[str]:
    reader = csv.reader(iterable)
    return next(reader)


def extract_csv_as_records(
    file_path_or_buffer: Any,
    header_key="header",
    content_key="values",
):
    header = extract_csv_header(file_path_or_buffer)
    reader = csv.reader(file_path_or_buffer)
    content = list(reader)
    return {header_key: header, content_key: content}


def extract_records_as_csv(header: Iterable[str], values: List[List[str]]):
    output = StringIO()
    writer = csv.writer(output, lineterminator="\n")
    writer.writerow(header)
    writer.writerows(values)
    return output


def check_if_exists(s3_key: str):
    bucket = s3_key.split("/").pop(2)
    key = "/".join(s3_key.split("/")[3:])
    try:
        boto3.client("s3").head_object(Bucket=bucket, Key=key)
    except ClientError:
        raise ValueError(f"file not found with {bucket=}, {key=}")


def ensure_tz(*targets) -> Union[Tuple[datetime, ...], datetime]:
    output = []
    for target in targets:
        output += (
            [target.astimezone(tz.UTC)]
            if target.tzinfo
            else [tz.utc.localize(target)]
        )
    return tuple(output) if len(output) > 1 else output[0]
