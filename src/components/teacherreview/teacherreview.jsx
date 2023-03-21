import React from 'react';
import { Link } from 'react-router-dom';
import './teacherreview.css'


const Teacherreview = ({name, image, id}) => {
    return (
        <Link className='teacherreview' to={`/app/teachers/${id}`}>
            <img src={image} alt="" />
            <h3>
                Giảng Viên: {name}
            </h3>
        </Link>
    );
}

export default Teacherreview;
