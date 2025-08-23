import React, { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import Input from './input';
import { Link } from 'react-router-dom';

const Register = () => {
  const [account, setAccount] = useState({
    username: '',
    password: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const schema = yup.object().shape({
    username: yup.string().required('پر کردن این فیلد الزامی است'),
    password: yup
      .string()
      .min(5, 'رمز عبور حداقل باید 5 حرف داشته باشد')
      .required('پر کردن این فیلد الزامی است'),
    email: yup.string().required('پر کردن این فیلد الزامی است')
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount(prev => ({ ...prev, [name]: value }));

    // حذف ارور فیلد وقتی کاربر شروع به تایپ می‌کنه
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const validate = async () => {
    try {
      await schema.validate(account, { abortEarly: false });
      setErrors({});
      return account;
    } catch (error) {
      const errObj = {};
      for (let err of error.inner) {
        errObj[err.path] = err.message;
      }
      setErrors(errObj);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await validate();
    if (result) {
      try {
        setSending(true);
        const response = await axios.post('http://localhost:8007/register/', result);
        console.log(response.data.access_token);
        localStorage.setItem('token', response.data.access_token);
        setMessage('ثبت‌نام با موفقیت انجام شد');
        setErrors({});
        setSending(false);
        window.location.href = '/';
      } catch (error) {
        console.log('Register error:', error.response?.data || error.message);
        setSending(false);
        setErrors({ general: 'ثبت‌نام با خطا مواجه شد' });
      }
    }
  };

  const { username, password, email } = account;

  return (
    <div>
      {/* ارور کلی بیرون از فرم */}
      {errors.general && (
        <div className='error-messages'>
          <p>{errors.general}</p>
        </div>
      )}

      {/* فرم و wrapper آن */}
      <div className='login-wrapper'>
        <form className='login-form' onSubmit={handleSubmit}>
          <Input
            name='username'
            value={username}
            label='نام کاربری'
            onChange={handleChange}
            type='text'
            error={errors.username}
          />
          <Input
            name='password'
            value={password}
            label='رمز عبور'
            onChange={handleChange}
            type='text'
            error={errors.password}
          />
          <Input
            name='email'
            value={email}
            label='ایمیل'
            onChange={handleChange}
            type='email'
            error={errors.email}
          />

          <button disabled={sending} className='login-submit-btn'>
            {sending ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
          </button>
        </form>

        {/* پیام وضعیت (موفقیت یا خطا) داخل فرم مناسب است */}
        <p className="timeslot-message">{message}</p>
      </div>

      {/* پیام لینک به صفحه دیگر بیرون از فرم */}
      <div className="register-message">
        <p>
          اگر از قبل حساب کاربری دارید،{' '}
          <Link to="/login" className="register-link">
            ورود
          </Link>{' '}
          کنید.
        </p>
      </div>
    </div>
  );

};

export default Register;
