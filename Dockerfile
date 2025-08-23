FROM python:3.13.5

RUN apt-get update && apt-get install -y gcc libpq-dev

WORKDIR /app/backend

# فایل requirements که در سطح ریشه‌ست رو کپی می‌کنیم به دایرکتوری کاری
COPY r.txt /app/

# نصب وابستگی‌ها از فایل ریکوایرمنتس که در مسیر /app/r.txt قرار داره
RUN pip install --upgrade pip && pip install -r /app/r.txt

# حالا کد backend رو کپی می‌کنیم (از پوشه backend)
COPY backend /app/backend

CMD ["gunicorn", "planning.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4"]

EXPOSE 8000
