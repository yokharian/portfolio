FROM lambci/lambda:build-python3.8
WORKDIR /home/build
RUN mkdir /home/build/python/

COPY . .
RUN pip3 install -r requirements.txt
RUN bash _clean.sh

RUN mv \
	$(python3 -c 'import sysconfig; print(sysconfig.get_paths()["purelib"])')/* \
    /home/build/python/