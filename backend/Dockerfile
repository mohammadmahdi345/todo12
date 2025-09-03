FROM python:3.13.5

RUN apt-get update && apt-get install -y gcc libpq-dev

WORKDIR /app

# از همون سطح backend شروع کن، نه دوباره backend/
COPY r.txt ./r.txt

RUN pip install --upgrade pip && pip install -r r.txt

# کل پوشه backend رو کپی نکن، چون همینجایی! فقط . کافیه
COPY . /app/

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
