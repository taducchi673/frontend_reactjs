import React, { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import './blogreview.css'
import {HiArrowSmRight} from 'react-icons/hi'
import { BaseURLContext } from '../../../App';

const Blogreview = ({name, image, author, id, topic}) => {

    const BaseURL = useContext(BaseURLContext)
    const [Author, setAuthor] = useState("");
    const [Topic, setTopic] = useState("");

    useEffect(() => 
    {
        
            fetch(`${BaseURL}api/users/${author}/`, {
                method: "GET",
                
            }).then(data => data.json()).then(data => {
                setAuthor(data.last_name + " " + data.first_name);
            })
        ;
        fetch(`${BaseURL}api/topics/${topic}/`, {
            method: "GET",
            
        }).then(data => data.json()).then(data => {
            setTopic(data.topic_name);
        })
    ;
        

    }, [author, topic])

    return (
        <Link className='blogreview' to={`/app/blogs/${id}`}>
            
            <img src={image} alt="" />
            <h2>{name}</h2>
            <p>
                <span>
                Tác giả:</span> {Author}
            </p>
            <p>
                <span>
                Chủ đề:
                </span> {Topic}</p>
        </Link>
    );
}

export default Blogreview;
