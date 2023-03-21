import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseURLContext } from '../../../App';
import Coursereview from '../../coursereview/coursereview';
import "./listcourse.css"
import {IoMdCreate} from 'react-icons/io'


const Listcourse = ({courseList}) => {

    const [usertype, setUsertype] = useState(Cookies.get("usertype"))

    return (
        <div className='listcourse'>
            <div className='listcourse_tocreate'>
                <h2>Danh sách khoá học</h2>
                {(usertype == 1 || usertype == 3) ? 
                    <button>
                        <Link to="/app/courses/create/">
                            <IoMdCreate size={25} /> Tạo khoá học
                        </Link>
                    </button>
               : <h3>Danh sách khoá học</h3>}
            </div>
            <div className="listcourse__content">
            {courseList.map((item, id) => <Coursereview image = {item.imageurl} name={item.name} id={item.id} teacher={item.teacher} key = {id}/>)}
            </div>
        </div>
    );
}

export default Listcourse;
