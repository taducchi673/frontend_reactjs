import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Blogs from '../blogs/blogs';
import Courses from '../courses/courses';
import Footer from '../footer/footer';
import Header from '../header/header';
import Teachers from '../teachers/teachers';

const Homepage = () => {
    return (
        <div>
            <Header></Header>
            <Outlet />
        
                
            <Footer />
        </div>
    );
}

export default Homepage;
