from enum import Enum

from .utils import load_json


def build_response(
    status_code: int,
    name: str = "",
    content_type: str = "application/json",
    **kwargs,
) -> dict:
    kwargs = {k: v.value if issubclass(type(v), Enum) else v for k, v in kwargs.items()}
    template = {
        status_code: {
            "description": name,
            "content": {content_type: {}},
        }
    }
    # obtain correct template based on quantities
    _key = template[status_code]["content"][content_type]

    if len(kwargs) == 1:
        first_kwarg = kwargs[list(kwargs)[0]]
        _key["example"] = load_json(first_kwarg)  # assign content
    elif len(kwargs) > 1:
        _key["examples"] = {  # assign content
            k: {"summary": k, "value": load_json(v)} for k, v in kwargs.items()
        }
    else:
        raise SyntaxError("you must provide at least 1 kwarg")
    return template


def build_examples(**kwargs) -> dict:
    kwargs = {k: v.value if issubclass(type(v), Enum) else v for k, v in kwargs.items()}
    kwargs = {k: load_json(v) for k, v in kwargs.items()}
    return {k: {"summary": k, "value": v} for k, v in kwargs.items()}
