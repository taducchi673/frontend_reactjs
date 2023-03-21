import Cookies from 'js-cookie';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseURLContext } from '../../../App';
import Teacherreview from '../../teacherreview/teacherreview';
import './listteacher.css'


const Listteacher = () => {

    const BaseURL = useContext(BaseURLContext)
    const [Listteacher, setListteacher] = useState([]);
    


    useEffect(()=> {
        fetch(`${BaseURL}api/usertypes/1/users/`).then(data=>data.json()).then(data => {setListteacher(data);console.log(data)})
    }, [])

    return (
        <div className='listteacher'>
            <div className="listteacher__title">
               <h2>
               Danh sách giảng viên
               </h2>
            </div>
            <div className="listteacher__content">
                {Listteacher.map((item, id)=> <Teacherreview name = {item.last_name + " " + item.first_name} image ={item.imageurl} id={item.id} key={id}/>)}
            </div>
        </div>
    );
}

export default Listteacher;
