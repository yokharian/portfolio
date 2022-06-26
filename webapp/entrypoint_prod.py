"""https://stackoverflow.com/a/66954510/19163261"""
from collections import namedtuple
import pkg_resources

# backup true function
_true_get_distribution = pkg_resources.get_distribution

_Dist = namedtuple("_Dist", ["version"])


def _get_distribution(dist):
    if dist == "flask-compress":
        return _Dist("1.9.0")  # your flask-compress version
    else:
        return _true_get_distribution(dist)


# monkey patch the function so it can work once frozen and pkg_resources is of
# no help
pkg_resources.get_distribution = _get_distribution

# noinspection PyUnresolvedReferences
from entrypoint import server
