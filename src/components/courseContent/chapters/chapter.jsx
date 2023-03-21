import React, { useContext, useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { BaseURLContext } from '../../../App';
import Lessons from '../lesssons/lessons';
import './chapter.css'

const Chapter = ({ item }) => {

    
    const [Lessonlist, setLessonlist] = useState([]);
    const BaseURL = useContext(BaseURLContext);

    useEffect(() => {
        fetch(`${BaseURL}api/chapters/${item.id}/lessons/`).then(data => data.json()).then(data => {setLessonlist(data) ;console.log(data)});
        
    }, [BaseURL])

    return (


        <Accordion.Item className='chapter' eventKey={item.id}>
            <Accordion.Header><h2 style={{
                textTransform: "uppercase"
            }}>
                    {item.name}</h2></Accordion.Header>
            <Accordion.Body>
                {
                    Lessonlist.map((item2, id) => <Lessons key={id} item={item2} course={item.course}/>)
                }
            </Accordion.Body>
        </Accordion.Item>

    );
}

export default Chapter;

