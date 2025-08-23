import { useParams, useNavigate } from 'react-router-dom';
import Input from './input';
import React, { useState } from "react";
import axios from "axios";
import * as Yup from 'yup';

const Timeslot = () => {
    const { pk } = useParams();

    const [time, setTime] = useState({
        start_time: "",
        end_time: "",
    });

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});  // برای ذخیره خطاهای اعتبارسنجی

    const navigate = useNavigate();

    const validationSchema = Yup.object({
        start_time: Yup.string()
            .matches(
                /^([0-9]{2}):([0-9]{2})$/, 
                'زمان شروع باید به فرمت HH:MM باشد'
            )
            .required('زمان شروع الزامی است'),
        end_time: Yup.string()
            .matches(
                /^([0-9]{2}):([0-9]{2})$/, 
                'زمان پایان باید به فرمت HH:MM باشد'
            )
            .required('زمان پایان الزامی است')
            .test('end-time-check', 'زمان پایان باید بعد از زمان شروع باشد', function (value) {
                const { start_time } = this.parent;
                if (!start_time || !value) return true;
                return value > start_time;
            }),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTime({ ...time, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // اعتبارسنجی با yup
            await validationSchema.validate(time, { abortEarly: false });
            setErrors({});  // اگر اعتبارسنجی موفق بود، خطاها را پاک می‌کنیم

            // ارسال درخواست به سرور
            const response = await axios.post(`http://localhost:8007/time/${pk}/`, time);
            setMessage('تایم با موفقیت ثبت شد');
            navigate('/')
        } catch (err) {
            // اگر اعتبارسنجی با yup شکست خورد
            if (err.inner) {
                const newErrors = err.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {});
                setErrors(newErrors);  // ذخیره خطاها
            }
            setMessage('تایم ثبت نشد');
        }
    };

    return (
        <div>
            <h2>لطفا بازه زمانی مشخصی را انتخاب کنید</h2>
            <form className="timeslot-form" onSubmit={handleSubmit}>
                <div>
                    <Input
                        name="start_time"
                        className="timeslot-input"
                        value={time.start_time}
                        onChange={handleChange}
                        label="زمان شروع"
                    />
                    {errors.start_time && <div className="error-message">{errors.start_time}</div>}
                </div>

                <div>
                    <Input
                        name="end_time"
                        className="timeslot-input"
                        value={time.end_time}
                        onChange={handleChange}
                        label="زمان پایان"
                    />
                    {errors.end_time && <div className="error-message">{errors.end_time}</div>}
                </div>

                <button type="submit" className="timeslot-submit-btn">تایید</button>
            </form>
            <p className="timeslot-message">{message}</p>
        </div>
    );
};

export default Timeslot;
