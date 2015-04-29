apt-get update && apt-get install -y \
	build-essential \
	python-dev \
	python-pip \
	curl \
	python-psycopg2

pip install -r /app/env/server/requirements.txt

