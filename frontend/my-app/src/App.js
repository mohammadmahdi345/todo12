import React, { Component } from 'react';
import { Link,Route,Routes } from 'react-router-dom';
import Program from './program';
import Login from './login';
import Register from './register';
import axios from 'axios';
import Timeslot from './timeslot';
import './style.css';
import Logout from './logout';
import Home from './home';
import Tasks from './tasks';
import { PrivateRoute } from './private';
import TaskStatus from './status';
import MusicPlayer from './music';

class App extends Component { 
    state = {
        user:null, 
    }

    async componentDidMount() {
    const token = localStorage.getItem('token');
    console.log(token);

    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    if (!token) {
        this.setState({ user: null });
        return;
    }
    


    try {
        const response = await axios.get('http://localhost:8007/user/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // چون response.data خودش کاربره
        this.setState({ user: response.data });
        console.log(response.data);
        

    } catch (error) {
        console.log('Error fetching user:', error);
        this.setState({ user: null });
        console.log(this.state.user);
    }
}
    render() { 
        return (
        <>
        
        <div>
            <MusicPlayer />
            
            <Routes>
                <Route path="/program" element={<PrivateRoute user={this.state.user}><Program /></PrivateRoute>} />
                <Route path="/tasks" element={<PrivateRoute user={this.state.user}><Tasks /></PrivateRoute>} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/task-status" element={<TaskStatus />} />
                <Route path="/music" element={<MusicPlayer />} />
                <Route path="/" element={<Home user={this.state.user} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/time/:pk" element={<Timeslot />} />
                {/*<Route path='*' element={<NotFound />} /> */}
            </Routes>

        </div>
        </>
        )
    }
}
 
export default App;