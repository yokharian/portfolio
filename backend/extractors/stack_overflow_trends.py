"""
create a filter for queries
https://api.stackexchange.com/docs/create-filter
"""
from datetime import datetime, timezone
from enum import Enum
from typing import Union
import itertools

import requests
from dateutil.relativedelta import relativedelta
from stackapi import StackAPI, StackAPIError

from src.utils import ONE_DAY, chunk_dates

keywords = [
    "python",
    "javascript",
    "C/C++",
    "JAVA",
    "R language",
    "Kotlin",
    "C#",
    "Go",
    "Scala",
]
RELATIVE_TIME = ONE_DAY * 7
REST_API_ENDPOINT = (
    "https://soysofia.mx/api/v1/data_bridge/stack_overflow/questions"
)
SITE = StackAPI("stackoverflow")


class StackApiFilters(Enum):
    ONLY_CREATION_DATE = "!--RG1_f8IF)r"
    # exclude items, include the "total" property of .wrapper
    ONLY_TOTAL_SUM = "!-)5fGp*dqmLp"


def fetch_questions(
    start: datetime,
    stop: datetime,
    tag: str,
    q_filter: Union[str, StackApiFilters] = StackApiFilters.ONLY_TOTAL_SUM,
    sort="creation",
    order="desc",
):
    if isinstance(q_filter, StackApiFilters):
        q_filter = q_filter.value

    if not sort or not order:
        sort, order = None, None

    has_more = True
    while has_more:
        try:
            _response = SITE.fetch(
                "questions",
                tagged=tag,
                fromdate=start,
                todate=stop,
                filter=q_filter,
                sort=sort,
                order=order,
            )
        except StackAPIError as e:
            print("\t" + f"Error URL: {e.url}")
            print("\t" + f"Error Code: {e.code}")
            print("\t" + f"Error Error: {e.error}")
            print("\t" + f"Error Message: {e.message}")
            raise e from e
        else:
            has_more = _response["has_more"]
            yield _response


if __name__ == "__main__":
    NOW: datetime = datetime.now(timezone.utc)
    NOW = NOW.replace(hour=0, minute=0, second=0, microsecond=0)
    dates = chunk_dates(NOW - relativedelta(seconds=RELATIVE_TIME), NOW)

    for (date_from, date_to), a_tag in itertools.product(dates, keywords):
        for response in fetch_questions(date_from, date_to, a_tag):
            response["date_from"] = date_from.isoformat()
            response["date_to"] = date_to.isoformat()
            requests.post(REST_API_ENDPOINT, json=response)
