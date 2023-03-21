import React, { useContext, useEffect, useState } from 'react';
import Filter from './filter/filter';
import Listcourse from './listcourse/listcourse';
import './courses.css'
import { BaseURLContext } from '../../App';


const Courses = () => {


    const BaseURL = useContext(BaseURLContext)
    const [coursesList, setcoursesList] = useState([]);
    

    useEffect(() => {
        fetch(`${BaseURL}api/courses/`).then(data=>data.json()).then(data=>{setcoursesList(data);console.log(data)})
        return () => {
            
        };
    }, []);

    return (
        <div className='courses'>
            
            <div className='courses__content'>
                <Filter setcoursesList = {setcoursesList}/>
                <Listcourse courseList = {coursesList}/>
            </div>
        </div>
    );
}

export default Courses;
