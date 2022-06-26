from datetime import datetime, timezone

import requests
from dateutil.relativedelta import relativedelta
from pytrends.request import TrendReq

from backend.extractors.src.utils import ONE_DAY, chunker, parse_datetimes

lista_palabras = [
    "javascript",
    "C/C++",
    "JAVA",
    "R language",
    "Kotlin",
    "C#",
    "Go",
    "Scala",
]
TREND_REQ = TrendReq(
    hl="en-US", tz=360, timeout=(10, 25), retries=2, backoff_factor=0.1
)
RELATIVE_TIME_IN_SECONDS = ONE_DAY * 7
MAXIMUM_COMPARISONS = 5  # Google-Trends hard limit
REST_API_ENDPOINT = (
    "https://soysofia.mx/api/v1/data_bridge/google_trends/comparisons"
)

if __name__ == "__main__":
    NOW: datetime = datetime.now(timezone.utc)
    dates = parse_datetimes(
        start=NOW - relativedelta(seconds=RELATIVE_TIME_IN_SECONDS), stop=NOW
    )
    for chunk in chunker(map(str.capitalize, lista_palabras), 4):
        keywords = (chunk + ["python"])[:MAXIMUM_COMPARISONS]
        # most of the time will print
        # The request failed: Google returned a response with code 400.,
        # this is completelly normal as function does double request,
        # 1 being safe and 2 trying to obtain the newer 'remaining' data ?
        df = TREND_REQ.get_historical_interest(
            keywords, **dates, geo=None, cat=0, frequency="daily"
        )
        requests.post(REST_API_ENDPOINT, json=df.to_json(orient="split"))
