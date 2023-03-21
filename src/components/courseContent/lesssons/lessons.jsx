import React, { useContext, useEffect, useState } from 'react';
import { BaseURLContext } from '../../../App';
import Notebooklessonreview from './notebooklessonReview/notebooklessonreview';
import Testreview from './testReview/testreview';
import Videolessonreview from './videolessonReview/videolessonreview';
import './lessons.css'
import Cookies from 'js-cookie';

const Lessons = ({ item, course }) => {


    const [VideoLessonlists, setVideoLessonlists] = useState([]);
    const [NotebookLessonlists, setNotebookLessonlists] = useState([]);
    const [Testlist, setTestlist] = useState([]);
    const token = Cookies.get("token");

    const BaseURL = useContext(BaseURLContext);


    useEffect(() => {
        fetch(`${BaseURL}api/lessons/${item.id}/tests/`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }).then(data => data.json()).then(data => { setTestlist(data); console.log(data) });
        fetch(`${BaseURL}api/lessons/${item.id}/videolessons/`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }).then(data => data.json()).then(data => setVideoLessonlists(data));
        fetch(`${BaseURL}api/lessons/${item.id}/notebooklessons/`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }).then(data => data.json()).then(data => setNotebookLessonlists(data));
    }, [BaseURL])



    return (
        <div className='lesson' >
            <h4>
                {item.name}
            </h4>

            {
                VideoLessonlists.map((item2, id) => <Videolessonreview item={item2} key={id} course={course} />)
            }
            {
                NotebookLessonlists.map((item2, id) => <Notebooklessonreview item={item2} key={id} course={course} />)
            }
            {
                Testlist.map((item2, id) => <Testreview item={item} key={id} course={course} />)
            }
        </div>
    );
}

export default Lessons;
