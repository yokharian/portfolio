"""https://fastapi.tiangolo.com/advanced/custom-response/?h=orjsonresponse"""
from typing import Any, Optional

from fastapi.responses import ORJSONResponse


def error(_error: Optional[Any] = None, **body):
    """
    Create a 400 error response.

    Args:
        _error: "error" description
        body: raw response here
    """
    final_body = {"error": _error, **body}
    return ORJSONResponse({k: v for k, v in final_body.items() if v}, 400)


def invalid(_error: Optional[Any] = None, **body):
    """
    Create a 422 error response.

    Args:
        _error: "error" description
        body: raw response here
    """
    final_body = {"error": _error, **body}
    return ORJSONResponse({k: v for k, v in final_body.items() if v}, 422)


def not_found(_error: Optional[Any] = None, **body):
    """
    Default 404 response

    Args:
        _error: response msg
        body: raw response here
    """
    final_body = {"error": _error, **body}
    return ORJSONResponse({k: v for k, v in final_body.items() if v}, 404)


def partial(**body):
    """
    Create a ORJSONResponse with status code 206.

    Args:
        body: raw response here
    """
    return ORJSONResponse(body, 206)


def done(_message: str = "", **body):
    """
    Create a ORJSONResponse with status code 200.

    Args:
        _message: response msg
        body: raw response here
    """
    final_body = {"message": _message, **body}
    return ORJSONResponse({k: v for k, v in final_body.items() if v}, 200)


def created(_created: Optional[Any] = None, **body):
    """
    Create a new resource.

    Args:
        _created: what have you created
        body: raw response here
    """
    final_body = {"created": _created, **body}
    return ORJSONResponse({k: v for k, v in final_body.items() if v}, 201)
