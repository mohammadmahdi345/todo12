# 📝 Daily Planning (To-Do List)

یک وب‌اپلیکیشن برای **برنامه‌ریزی روزانه و مدیریت کارها** ساخته شده با:
- **Backend:** Django & Django REST Framework  
- **Frontend:** React & CSS  
- **Database:** PostgreSQL  
- **Auth:** Custom JWT (SimpleJWT)  

---

## ✨ ویژگی‌ها
- 🔐 ثبت‌نام و ورود با نام کاربری، پسورد و ایمیل  
- 🎵 پخش موسیقی‌های متنوع هنگام کار  
- 🗂️ اضافه کردن تسک‌ها با تاریخ و ساعت دلخواه  
- ✅ مدیریت و کنترل وضعیت تسک‌ها  
- 📊 نمایش نموداری وضعیت تسک‌ها  
- 🔒 امنیت با SimpleJWT  

---

## 🔐 امنیت
- فعال بودن **HTTPS** (`SECURE_SSL_REDIRECT = True`)  
- جلوگیری از **CSRF** و **XSS**  
- ذخیره مقادیر حساس در `.env` با [django-environ](https://github.com/joke2k/django-environ)  
- محدودسازی دسترسی با **IsAuthenticated**, **IsOwner**, **IsAdminUser** و ...  

---

## 📦 پیش‌نیازها
- Python `3.8+`  
- Django `3.2+`  
- Django REST Framework  
- PostgreSQL  
- pip  

---
## 🚀 اجرای پروژه
1. کلون کردن پروژه:
```bash
git clone https://github.com/mohammadmahdi345/todo12.git
cd daily-planning
```
2. اجرای پروژه با Docker Compose:
```bash
docker-compose up -d --build
```
3. برای توقف:
```bash
docker-compose down
```
پروژه بعد از اجرا روی آدرس [http://localhost:8007](http://localhost:8007) قابل دسترس است.


## 🏗️ ساختار پروژه
- `./frontend/my-app/` → Dockerfile فرانت‌اند
- `./backend/` → Dockerfile بک‌اند
- `docker-compose.yml` → تنظیمات محیط توسعه


## 🤝 مشارکت در پروژه
1. پروژه را Fork کنید
2. یک شاخه جدید بسازید:
```bash
git checkout -b feature-name
```
3. تغییرات خود را اعمال کنید
4. تغییرات را کامیت کنید:
```bash
git commit -am "Add new feature"
```
5. شاخه خود را به گیت‌هاب پوش کنید:
```bash
git push origin feature-name
```
6. یک Pull Request ایجاد کنید.


