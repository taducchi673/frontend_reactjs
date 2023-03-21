import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseURLContext } from '../../App';
import './coursereview.css'


const Coursereview = ({name, teacher, id, image}) => {

    
    const BaseURL  = useContext(BaseURLContext)
    const token = Cookies.get("token");
    const [Teacher, setTeacher] = useState("");
   

    useEffect(() => 
    {
        
            fetch(`${BaseURL}api/users/${teacher}/`, {
                method: "GET",
                
            }).then(data => data.json()).then(data => {
                setTeacher(data);
            })
        
        

    }, [teacher])

    const [CheckEnroll, setCheckEnroll] = useState([]);
    useEffect(() => {
        fetch(`${BaseURL}api/courses/${id}/check-enrolled/`, {
            method: "GET", 
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        .then(data => data.json()).then(data => {setCheckEnroll(data);
        console.log(data)})
    }, [])
    
    return (
        <Link exact to={`/app/courses/${id}`}>
            <div className='coursereview'>
                <img src={image} alt="" />
                <h3>
                    {name}
                </h3>
                <div>

                    <div className='giangvienInvideo'>
                        <img src={Teacher.imageurl} alt="" />
                        <Link exact to={`/app/teachers/${Teacher.id}/`}>
                            <p>{Teacher.last_name} {Teacher.first_name}</p>
                        </Link>
                    </div>
                    <div>
                       {
                        CheckEnroll.length === 1 ? <button className='vaohocbutton'> 
                       Tiếp tục học
                    </button>
                    : <button className='dangkybutton'>
                            Xem khoá học
                        </button> 
                        
                       }
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Coursereview;
