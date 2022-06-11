FROM python:3.9-slim-buster
WORKDIR /home/build
RUN mkdir /home/build/python/

COPY . .

RUN bash _pydantic.sh
RUN bash _clean.sh
RUN mv \
	$(python3 -c 'import sysconfig; print(sysconfig.get_paths()["purelib"])')/* \
    /home/build/python