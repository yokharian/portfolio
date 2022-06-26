from itertools import chain, islice
from typing import Any, Callable, Generator, Iterable, Optional
from datetime import datetime, timedelta

from pandas import to_datetime

ONE_DAY = 60 * 60 * 24


def parse_datetimes(start: datetime, stop: datetime):
    return dict(
        year_start=start.year,
        year_end=stop.year,
        month_start=start.month,
        month_end=stop.month,
        day_start=start.day,
        day_end=stop.day,
    )


def chunker(seq: Iterable, size: int) -> Generator[list, Any, None]:
    """https://stackoverflow.com/a/24527424"""
    seq = iter(seq)
    for first in seq:
        yield list(chain([first], islice(seq, size - 1)))


def _comparison(
    less: bool = False, greater: bool = False, than: bool = True
) -> Callable:
    """
    Returns a comparison function.

    Args:
        less: write your description
        greater: write your description
        than: write your description
    """
    if (less and greater) or (not less and not greater):
        raise SyntaxError("must specify only one as True for less or greater")
    if less and than:
        return lambda a, b: a.__lt__(b)
    elif less:  # less and not than
        return lambda a, b: a.__le__(b)
    elif than:  # greater and than
        return lambda a, b: a.__gt__(b)
    else:  # greater and not than
        return lambda a, b: a.__ge__(b)


def _return_func(floor: Optional[str]) -> Callable:
    """
    Returns a function that converts datetime. datetime to pydatetime. datetime.

    Args:
        floor: write your description
    """
    if floor:
        # noinspection PyArgumentList
        return lambda x: to_datetime(x).floor(freq=floor).to_pydatetime()
    else:
        return lambda x: to_datetime(x).to_pydatetime()


def chunk_dates(
    start: datetime,
    stop: datetime,
    delta: timedelta = timedelta(days=1),
    floor: Optional[str] = "1min",
    strict_comparison=True,
    go_backwards=True,
    enable_out_of_phase_range=True,
) -> list:
    """
    Split dates into chunks.

    Args:
        start: starting date.
        stop: stop date.
        delta: timedelta to perform differences.
        floor: pandas string to floor (start & stop) datetimes
        strict_comparison: if true use (> or <) else (<= or >=) comparators.
        go_backwards: if true delta as subtract, else delta as add.
        enable_out_of_phase_range: if True yield first range even if it is
            outside (start < output < stop) range.
    """
    if start > stop:  # swap to keep range logic
        stop, start = start, stop
    comparator = _comparison(
        less=not go_backwards, greater=go_backwards, than=strict_comparison
    )
    return_func: Callable = _return_func(floor)

    if go_backwards:
        current_date_time = stop
        if enable_out_of_phase_range:
            new_date_time = current_date_time - delta
            yield return_func(new_date_time), return_func(current_date_time)
            current_date_time = new_date_time
        while comparator(current_date_time, start):
            new_date_time = current_date_time - delta
            yield return_func(new_date_time), return_func(current_date_time)
            current_date_time = new_date_time
    else:
        current_date_time = start
        if enable_out_of_phase_range:
            new_date_time = current_date_time + delta
            yield return_func(current_date_time), return_func(new_date_time)
            current_date_time = new_date_time
        while comparator(current_date_time, stop):
            new_date_time = current_date_time + delta
            yield return_func(current_date_time), return_func(new_date_time)
            current_date_time = new_date_time
