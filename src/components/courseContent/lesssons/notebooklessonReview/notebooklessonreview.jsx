import React from 'react';
import { GiNotebook } from 'react-icons/gi'
import { Link } from 'react-router-dom';


const Notebooklessonreview = ({item, course}) => {
    return (
        <div>
            <Link exact to={`/courses/${course}/notebooklessons/${item.id}`}>
                <GiNotebook size={20} style={{
                    marginRight: "10px"
                }} /> {item.name}
                </Link>
        </div>
    );
}

export default Notebooklessonreview;
