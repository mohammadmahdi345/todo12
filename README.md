شبیه سازی سایتی برای برنامه ریزی روزانه(تودو لیست) – Backend with Django & DRF | Frontend with react  & css 




این یک پروژه سایت پیرایش تودو لیست است که با استفاده از Django REST Framework و React ساخته شده. هدف پروژه پیاده‌سازی قابلیت اضافه کردن تسک برای تاریخ و ساعات متفاوت و همینطور کنترل وضعیت میباشد این پروژه از سیستم jwt کاستوم به عنوان احراز هویت استفاده میکند
ویژگی‌ها:


    امکان ثبت‌نام و ورود با نام کاربری, پسوورد و ایمیل
    امکان پخش موسیقی های متعدد و متناسب با هر نوع سلیقه ای در هنگام کار
    اضاقه کردن تسک های مختلف با قابلیت کنترل تسک ها و حتی دیدن نموداری وضعیت 
    مدیریت امنیت با simple jwt
    استفاده از دیتابیس PostgreSQL


🔐 امنیت

    فعال بودن HTTPS (SECURE_SSL_REDIRECT = True)
    جلوگیری از CSRF و XSS
    ذخیره مقادیر حساس در .env (با django-environ)
    محدودسازی دسترسی با IsAuthenticated, IsOwner, IsAdminUser و غیره


پیش‌نیازها:

برای راه‌اندازی این پروژه به موارد زیر نیاز دارید:


    Python 3.8+
    Django 3.2+
    Django REST Framework
    PostgreSQL
    pip (برای نصب بسته‌ها)

نصب و راه‌اندازی:
پروژه را کلون کنید:

git clone https://github.com/mohammadmahdi345/todo12.git
cd daily planning

- این پروژه از داکرکامپوز استفاده میکنه
ساختار پروژه
  ./frontend/my-app: Dockerfile: داکرفایل برای فرانت اند
  ./backend: Dockerfile :  داکرفایل برای بک اند
    docker-compose.yml : تنظیمات محیط توسعه
  

اجرای پروژه در محیط توسعه (با Docker Compose)

docker-compose up -d --build برای اجرای کانتینرها
docker-compose down برای توقف کانتینرها





6. حالا می‌تونی به پروژه دسترسی پیدا کنی:
    - آدرس: (http://localhost:8007)


## مشارکت در پروژه:

اگر مایل به مشارکت در این پروژه هستید، می‌توانید از مراحل زیر پیروی کنید:

1. فورک کنید پروژه رو.
2. یک شاخه جدید بسازید (`git checkout -b feature-name`).
3. تغییرات مورد نظر رو اعمال کنید.
4. تغییرات رو کامیت کنید (`git commit -am 'Add new feature'`).
5. شاخه‌تون رو به گیت‌هاب پوش کنید (`git push origin feature-name`).
6. درخواست کشش (Pull Request) بدید.
