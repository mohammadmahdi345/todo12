FROM python:3.13.5

RUN apt-get update && apt-get install -y gcc libpq-dev

WORKDIR /app

COPY r.txt .
RUN pip install --upgrade pip && pip install -r r.txt

COPY . .

CMD ["gunicorn", "planning.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4"]

EXPOSE 8000
