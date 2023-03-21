import React from 'react';
import { useParams } from 'react-router-dom';
import CourseContent from '../../courseContent/courseContent';
import CourseContentUpdate from '../../courseContentUpdate/courseContentUpdate';
import "./updatecoursecontent.css"

const Updatecoursecontent = () => {

    const {courseId} = useParams()
    return (
        <div className='updatecoursecontent'>
            <h3>CHỈNH SỬA NỘI DUNG KHÓA HỌC</h3>
            {/* <br /> */}
            <hr />
            <CourseContentUpdate course_id={ courseId } />
           {/* Hello {courseId} */}
        </div>
    );
}

export default Updatecoursecontent;
