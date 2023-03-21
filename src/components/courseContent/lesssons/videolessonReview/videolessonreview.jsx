import React from 'react';
import { BsCameraVideo } from 'react-icons/bs'
import { Link } from 'react-router-dom';


const Videolessonreview = ({ item, course}) => {
    return (
        <div >
            <Link exact to={`/courses/${course}/videolessons/${item.id}`} >
            
                <BsCameraVideo size={20} style={{
                    marginRight: "10px"
                }} /> {item.name}
                </Link>
        </div>
    );
}

export default Videolessonreview;
