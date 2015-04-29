FROM python:2-onbuild
MAINTAINER Vadim Caen <vadimcaen@gmail.com>

RUN apt-get update && apt-get install -y \
	python-psycopg2

EXPOSE 8000
ENTRYPOINT python /app/server.py