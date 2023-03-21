import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { BiExit } from 'react-icons/bi';
import { HiOutlineXMark } from 'react-icons/hi2';
import { BaseURLContext } from '../../App';
import Chapter from './chapters/chapter';
import "./courseContentUpdate.css"


const CourseContentUpdate = ({ course_id }) => {

    const token = Cookies.get("token")
    const [Chapterlist, setChapterlist] = useState([]);
    const BaseURL = useContext(BaseURLContext);
    const [AddChapter, setAddChapter] = useState(false);
    const [ChapterName, setChapterName] = useState("");
    const [Trigger, setTrigger] = useState(false);

    const addChapter = () => {
        fetch(`${BaseURL}api/courses/${course_id}/chapters/`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": ChapterName
            })
        }).then(data => fetch(`${BaseURL}api/courses/${course_id}/chapters/`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }).then(data => data.json()).then(data => {
                setChapterlist(data);
                setAddChapter(false)
            }))
    }

    useEffect(() => {
        fetch(`${BaseURL}api/courses/${course_id}/chapters/`).then(data => data.json()).then(data => setChapterlist(data))
        return () => {

        };
    }, [course_id, Trigger]);

    return (
        <div className='CourseContent' >
            <Button variant="primary" size="lg" active onClick={() => {
                setAddChapter(!AddChapter)
            }}>
                Thêm Chương
            </Button>

            {
                AddChapter && <div className='themchuong'  >
                    <div>

                        <HiOutlineXMark onClick={() => setAddChapter(false)} size={30} />

                        <label htmlFor="name" >Tên Chương:</label>
                        <input type="text" id="name" onChange={(e) => {
                            setChapterName(e.target.value)
                        }} />

                        <Button variant="success" onClick={
                            addChapter
                        }>Thêm chương</Button>
                    </div>

                </div>
            }
            {/* <Accordion defaultActiveKey="0"> */}
            {
                Chapterlist.map((item, id) => <Chapter item={item} Trigger={Trigger} setTrigger={setTrigger} key={id} />)
            }
            {/* </Accordion> */}


        </div>
    );
}

export default CourseContentUpdate;
