import boto3
from ssm_parameter_store import SSMParameterStore

FIVE_MINUTES = 60 * 5
ssm_client = boto3.client("ssm")
store = SSMParameterStore(
    ssm_client=ssm_client, ttl=FIVE_MINUTES, prefix="/yokharian/portfolio/"
)
RDS_URI_CONN = store["rds-uri-conn"]
