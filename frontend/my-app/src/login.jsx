import React, { Component } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from './input';

class Login extends Component {
    /*navigate = useNavigate();*/

    state = {
        account: {
            username:'',
            password:'',
            email:''
        },
        errors: [],
        sending: false,
        message: ''
    }

    handelchange = (e)=>{
        const input = e.currentTarget
        const account = {...this.state.account}
        account[input.name] = input.value
        this.setState({account:account})
    }

    schema = yup.object().shape({
        username: yup.string().required('پر کردن این فیلد الزامی است'),
        password: yup.string().min(5,'رمز عبور حداقل باید 4 حرف داشته باشد').required('پر کردن این فیلد الزامی است'),
        email: yup.string().required('پر کردن این فیلد الزامی است')
    })

    validate = async() => {
        try {
            const result = await this.schema.validate(this.state.account, {abortEarly: false});
            return result
        } catch (error) {
            const errors = {};
            for (let err of error.inner) {
            errors[err.path] = err.message;
            }
            this.setState({ errors });
            return null;
        }
    }


    handelsubmit = async (e) => {
        e.preventDefault();
        const result = await this.validate()
        if(result){
            
            try {
                this.setState({sending:true})
                const response = await axios.post('https://todo12-2.onrender.com/login/',result);
                console.log(response.data.access_token)
                localStorage.setItem('token',response.data.access_token)
                this.setState({message: 'ورود موفقیت آمیز بود'})
                window.location.href = "/";
                this.setState({sending:false})

            } catch (error) {
                console.log("Login error:", error.response?.data || error.message);
                this.setState({sending:false})
                this.setState({errors: {general: 'نام کاربری یا رمز عبور صحیح نمیباشد'}})
            }
        }

    }
    render() {
    const { username, password, email } = this.state.account;
    const { errors, sending, message } = this.state;

    return (
        <div>
            {errors.general && (
            <div className='error-messages'>
                <p>{errors.general}</p>
            </div>
            )}

            <div className='login-wrapper'>
            <form className='login-form' onSubmit={this.handelsubmit}>
                <Input
                name='username'
                value={username}
                label='نام کاربری'
                onChange={this.handelchange}
                type='text'
                error={errors.username}
                />
                <Input
                name='password'
                value={password}
                label='رمز عبور'
                onChange={this.handelchange}
                type='text'
                error={errors.password}
                />
                <Input
                name='email'
                value={email}
                label='ایمیل'
                onChange={this.handelchange}
                type='email'
                error={errors.email}
                />

                <button disabled={sending} className='login-submit-btn'>
                {sending ? 'در حال ورود...' : 'ورود'}
                </button>
            </form>
            <p className="timeslot-message">{message}</p>
            </div>

            {/* پیام ثبت نام زیر فرم */}
            <div className="register-message">
                <p>
                    اگر حساب کاربری ندارید،{' '}
                    <Link to="/register" className="register-link">
                    ثبت نام
                    </Link>{' '}
                    کنید.
                </p>
            </div>

        </div>
    );

    }
}


export default Login;