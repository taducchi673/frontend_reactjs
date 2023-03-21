import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { AiOutlineMenu } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BaseURLContext } from '../../../App';
import Lessons from '../lesssons/lessonupdate';
// import Lessons from '../lesssons/lessons';
import './chapter.css'

const Chapter = ({ item, Trigger, setTrigger }) => {

    const [Themsuaxoa, setThemsuaxoa] = useState(false)
    const [Lessonlist, setLessonlist] = useState([]);
    const BaseURL = useContext(BaseURLContext);
    const token = Cookies.get("token");
    const [LessonName, setLessonName] = useState("")
    const [Delete, setDelete] = useState(false);
    const [Trigger2, setTrigger2] = useState(false)

    const [state, setstate] = useState(false);
    const handleXoaChapter = () => {
        fetch(`${BaseURL}api/chapters/${item.id}/`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        }).then(Data => {

            setDelete(false);
            return Data;
        }).then(data => {
            setTrigger(!Trigger)
        })
    }
    const handleCreateLesson = () => {
        fetch(`${BaseURL}api/chapters/${item.id}/lessons/`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": LessonName
            })
        }).then(data => 
            fetch(`${BaseURL}api/chapters/${item.id}/lessons/`).then(data => data.json()).then(data => {
                setLessonlist(data);
                setThemsuaxoa(false);
                setstate(false)
            })
        )
    }


    useEffect(() => {
        fetch(`${BaseURL}api/chapters/${item.id}/lessons/`).then(data => data.json()).then(data => { setLessonlist(data); console.log(data) });

    }, [BaseURL, Trigger2])

    return (


        // <Accordion.Item className='chapter' eventKey={item.id}>
        <div className='chapter'>
            <div className='chapter_header'>
                <h2 style={{
                    textTransform: "uppercase"
                }}>
                    {item.name}
                </h2>
               
                <button className='themsuaxoa' onClick={() => {
                    setstate(!state)
                }} >
                    <AiOutlineMenu size={25} />
                    
                
                </button>
                {
                    state && <div className='commentoptiond'>
                        <button onClick={
                            () => {
                                setThemsuaxoa(!Themsuaxoa)
                            }
                        }>
                            Thêm bài học
                        </button>
                        <button onClick={() => setDelete(true)}>
                            Xóa chương
                        </button>
                    </div>
                }

            </div>
            <div>
                {
                    Themsuaxoa &&
                    <div>
                        <label htmlFor="lessonname">Tên bài học: </label>
                        <input type="text" onChange={
                            (e) => {
                                setLessonName(e.target.value);
                                console.log(e.target.value)
                            }
                        } id="lessonname"/>
                        <input type="submit" value="Thêm" onClick={() => handleCreateLesson()} />
                    </div>
                }
                {
                    Lessonlist.map((item2, id) => <Lessons setouterstate={setstate} TriggerOuter={Trigger2} setTriggerOuter = {setTrigger2} key={id} item={item2} course={item.course} />)
                }
            </div>
            {
                Delete && <div className='deletediv'>
                    <div className="delete_content">
                        <p>
                            Bạn có đồng ý xoá chương này không?
                        </p>
                        <div>
                            <button onClick={
                                handleXoaChapter
                            }>
                                <RiDeleteBin6Line size={20} />  Đồng ý
                            </button>
                            <button onClick={
                                () => setDelete(false)
                            }>
                                Huỷ bỏ
                            </button>
                        </div>
                    </div>

                </div>
            }


        </div>
        // </Accordion.Item>

    );
}

export default Chapter;

