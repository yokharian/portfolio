
FROM python:3.8-slim-buster
WORKDIR /home/build

COPY . .
RUN bash _pydantic.sh
RUN bash _clean.sh

RUN mkdir /home/build/python && mv \
	$(python3 -c 'import sysconfig; print(sysconfig.get_paths()["purelib"])')/* \
    /home/build/python

FROM lambci/lambda:build-python3.8
WORKDIR /home/build

COPY . .

RUN pip3 install -r requirements.txt
# already installed pydantic at previous stage, so we can skip it here
RUN pip3 uninstall pydantic -y
RUN bash _clean.sh

# restore site-packages from previous pydantic build
COPY --from=0 /home/build/python /home/build/python/
RUN cp -r \
    $(python3 -c 'import sysconfig; print(sysconfig.get_paths()["purelib"])')/* \
    /home/build/python
