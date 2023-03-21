import React from 'react';
import { BsQuestionSquare } from 'react-icons/bs'
import { Link } from 'react-router-dom';


const Testreview = ({item, course}) => {
    return (
        <div>
            <Link exact to={`/courses/${course}/tests/${item.id}`}>
                <BsQuestionSquare size={20} style={{
                    marginRight: "10px"
                }} /> {item.name}
            </Link>
            
            
        </div>
    );
}

export default Testreview;
