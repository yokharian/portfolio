from os import environ, getenv
import uvicorn

if __name__ == "__main__":
    # MUST, may cause mis-understanding if you lie
    environ["LOCALLY_DEBUG"] = "1"
    if not getenv("LOGURU_LEVEL"):
        environ["LOGURU_LEVEL"] = "DEBUG"

    uvicorn.run(
        "app:app",
        access_log=False,
        port=8000,
        reload=True,
    )
