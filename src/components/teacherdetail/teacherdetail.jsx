import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseURLContext } from '../../App';
import Sidebar from '../sidebar/sidebar';
import './teacherdetail.css'


const Teacherdetail = () => {
    const {teacherId} = useParams()
    const [Teacher, setTeacher] = useState({});
    const BaseURL = useContext(BaseURLContext)

    useEffect(() => {
        fetch(`${BaseURL}api/users/${teacherId}`).then(data => data.json()).then((data) => setTeacher(data))
        return () => {
        };
    }, [teacherId]);


    return (
        <div className='teacherdetail'>
            <div className="teacherdetail__content">
                <h1>
                    {
                        Teacher.last_name
                    } {
                        Teacher.first_name
                    }
                </h1>
                <br />
                <hr />
                <br />
                <div dangerouslySetInnerHTML={{ __html: Teacher.discription }} className="blogdetail__content"></div>

            </div>  
            <Sidebar />
        </div>
    );
}

export default Teacherdetail;
