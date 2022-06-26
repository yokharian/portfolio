import sys
from pathlib import Path
from typing import Optional
from os import environ, getenv

from loguru import logger
from starlette.middleware.cors import ALL_METHODS

DATETIME_FORMAT = "%Y-%m-%dT%H:%M:00Z"
DATE_FORMAT = "%Y-%m-%d"

STAGE = getenv("STAGE", "prod").lower()
PROJECT_NAME = f"REST API {STAGE}".upper()


_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": ", ".join(ALL_METHODS),
    "Access-Control-Allow-Credentials": "true",
}

if not getenv("AWS_DEFAULT_REGION"):
    environ["AWS_DEFAULT_REGION"] = "us-east-1"
AWS_DEFAULT_REGION: str = getenv("AWS_DEFAULT_REGION", "us-east-1")

LOCALLY_DEBUG: bool = bool(int(getenv("LOCALLY_DEBUG", "0")))


# region LOG CONFIGS
LOGURU_LEVEL: Optional[str] = getenv("LOGURU_LEVEL")
if not LOGURU_LEVEL:
    LOGURU_LEVEL: str = "DEBUG" if STAGE == "dev" else "INFO"
# reset level
logger.remove()
logger.add(sys.stdout, level=LOGURU_LEVEL)

DEV_LOG_FORMAT = """<green>{time:HH:mm:ss}</green> | \
<cyan>{level}</cyan> | <level>{message}</level>"""
PROD_LOG_FORMAT = """{level} | <level>{message}</level>"""
LOGURU_FORMAT = PROD_LOG_FORMAT if STAGE != "dev" else DEV_LOG_FORMAT
# endregion


HERE = Path(__file__).parent
ROOT = HERE.parent.parent
STATIC = ROOT.joinpath("static")
