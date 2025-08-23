import React, { Component } from 'react';
import { Link,Route,Routes } from 'react-router-dom';
import MusicPlayer from './music';
import MotivationalCard from './motivated';

class Home extends Component {
    render() { 
        return (
            <div className='wow'>

                <h1 className='welcome'>به تسک کده خوش آمدید </h1>
                {!this.props.user ? (
                    <>
                    <Link to='login' className='login-link'><h2>ورود</h2></Link>
                    <Link to='register' className='login-link'><h2>ثبت نام</h2></Link>
                    </>
                ): (
                    <>
                    <Link to='logout' className='login-link'><h2>خروج</h2></Link>
                    </>
                    
                ) }
                <div className='task-program' >
                    <Link to='program' className='program-link'><h2>شروع برنامه ریزی</h2></Link>
                    <Link to='/tasks' className='tasks-link'><h2>وضعیت تسک ها</h2></Link>
                    <MotivationalCard />
                </div>
    
            </div>
        );
    }
}
 
export default Home