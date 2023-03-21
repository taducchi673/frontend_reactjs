import React, { useContext, useEffect, useState } from 'react';
import './sidebar.css'
import logo from '../../assets/phenikaaLogo.png'
import { BaseURLContext } from '../../App';
import { Link } from 'react-router-dom';



const Sidebar = () => {
    const BaseURL = useContext(BaseURLContext)
    const [TeacherList, setTeacherList] = useState([]);
    const [CourseList, setCourseList] = useState([]);
    const [BlogList, setBlogList] = useState([]);




    useEffect(() => {
        fetch(`${BaseURL}api/blogs/`).then(data => data.json()).then(data => setBlogList(data));
        fetch(`${BaseURL}api/courses/`).then(data => data.json()).then(data => setCourseList(data));
        fetch(`${BaseURL}api/usertypes/1/users`).then(data => data.json()).then(data => setTeacherList(data));
        return () => {
        };
    }, []);


    return (
        <div className='sidebar'>
           
            <img src={logo} alt="" />
            
            <div className='sidebar__div'>
                <h2>
                    Khoá học nổi bật
                </h2>
                <ol>
                    {CourseList.map((item, id) => <li><Link to={`/app/courses/${item.id}`} key={id}>{item.name}</Link></li>)}
                </ol>
            </div>
            <div className='sidebar__div'>
                <h2>
                    Giảng Viên tiêu biểu
                </h2>
                <ol>
                    {TeacherList.map((item, id) => <li><Link to={`/app/teachers/${item.id}`} key={id}>{item.last_name} {item.first_name}</Link></li>)}
                </ol>
            </div>
            <div className='sidebar__div'>
                <h2>
                    Bài Viết Nổi Bật
                </h2>
                <ol>
                    {BlogList.map((item, id) => <li><Link to={`/app/blogs/${item.id}`} key={id}>{item.name}</Link></li>)}
                    
                </ol>
            </div>
        
        </div>
    );
}

export default Sidebar;
