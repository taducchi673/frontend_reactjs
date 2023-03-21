import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { BaseURLContext } from '../../App';
import Chapter from './chapters/chapter';
import "./courseContent.css"


const CourseContent = ({ course_id }) => {

    const token = Cookies.get("token")
    const [Chapterlist, setChapterlist] = useState([]);
    const BaseURL = useContext(BaseURLContext)

    useEffect(() => {
        fetch(`${BaseURL}api/courses/${course_id}/chapters`,
        {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`
            }
        }).then(data => data.json()).then(data => setChapterlist(data))
        return () => {

        };
    }, [course_id]);

    return (
        <div className='CourseContent'>
            <Accordion defaultActiveKey="0">
                {
                    Chapterlist.map((item, id) => <Chapter item={item} key={id} />)
                }
            </Accordion>
            

        </div>
    );
}

export default CourseContent;
