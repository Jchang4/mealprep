FROM python:alpine

MAINTAINER Justin Chang "justinchangmusic@gmail.com"

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN apk update && \
 apk add python3 postgresql-libs && \
 apk add --virtual .build-deps gcc python3-dev musl-dev postgresql-dev && \
 python3 -m pip install -r requirements.txt --no-cache-dir && \
 apk --purge del .build-deps

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python", "./run.py" ]
