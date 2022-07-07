FROM python:3.8

EXPOSE 5000

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

RUN python -m pip install pymongo

RUN python -m pip install dnspython

RUN python -m pip install 'pymongo[srv]'


ADD requirements.txt .
RUN python -m pip install -r requirements.txt

WORKDIR /app
ADD . /app