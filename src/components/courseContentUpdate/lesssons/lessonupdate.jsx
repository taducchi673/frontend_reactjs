import React, { useContext, useEffect, useState } from 'react';
import { BaseURLContext } from '../../../App';
import Notebooklessonreview from './notebooklessonReview/notebooklessonreview';
import Testreview from './testReview/testreview';
import Videolessonreview from './videolessonReview/videolessonreview';
import './lessonupdate.css'
import { AiOutlineMenu } from 'react-icons/ai';
import Videolessoncreate from './videolessoncreate/videolessoncreate';
import Notebooklessoncreate from './notebooklessoncreate/notebooklessoncreate';
import Testcreate from './testcreate/testcreate';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Cookies from 'js-cookie';


const Lessons = ({ setouterstate, item, course, TriggerOuter, setTriggerOuter }) => {


    const [VideoLessonlists, setVideoLessonlists] = useState([]);
    const [NotebookLessonlists, setNotebookLessonlists] = useState([]);
    const [Testlist, setTestlist] = useState([]);
    const BaseURL = useContext(BaseURLContext);
    const [state, setstate] = useState(false);
    const [AddVideo, setAddVideo] = useState(false);
    const [AddNotebook, setAddNotebook] = useState(false);
    const [AddTest, setAddTest] = useState(false);
    const [Trigger, setTrigger] = useState(false)
    const [Delete, setDelete] = useState(false);
    const token = Cookies.get("token")

    useEffect(() => {
        fetch(`${BaseURL}api/lessons/${item.id}/tests/`, {
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
    }, [BaseURL, Trigger])


    const xoalesson = () => {
        fetch(`${BaseURL}api/lessons/${item.id}/`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${token}`
            }
        }).then(data => {
            setDelete(false);
            setouterstate(false);
            setTriggerOuter(!TriggerOuter);
           
        })

    }

    return (
        <div className='lesson'>
            <div className='lessonupdate__header'>
                <div className="lessonupdate_header_first">
                    <h4 >{item.name}</h4>

                    <div className='lessonupdate__header_child'>
                        <button className='' onClick={() => {
                            setstate(!state)
                        }} >
                            Chỉnh sửa bài học này?
                        </button>
                        {
                            state && <div className='commentoptiond'>
                                <button onClick={
                                    () => {
                                        setAddVideo(!AddVideo);
                                        setAddNotebook(false);
                                        setAddTest(false)
                                    }
                                }>
                                    Thêm bài giảng video
                                </button>
                                <button onClick={
                                    () => {
                                        setAddVideo(false);
                                        setAddNotebook(!AddNotebook);
                                        setAddTest(false)
                                    }
                                }>
                                    Thêm bài giảng notebook
                                </button>
                                <button onClick={
                                    () => {
                                        setAddVideo(false);
                                        setAddNotebook(false);
                                        setAddTest(!AddTest)
                                    }
                                }>
                                    Thêm bài kiểm tra
                                </button>
                                <button onClick={
                                    () => {
                                        setAddVideo(false);
                                        setAddNotebook(false);
                                        setAddTest(false);
                                        setDelete(!Delete)
                                    }
                                }>
                                    Xóa bài học
                                </button>
                            </div>
                        }
                    </div>
                </div>
                <hr />
                {
                    VideoLessonlists.map((item2, id) => <Videolessonreview Trigger={Trigger} setTrigger={setTrigger} item={item2} key={id} course={course} />)
                }
                {
                    NotebookLessonlists.map((item2, id) => <Notebooklessonreview Trigger={Trigger} setTrigger={setTrigger} item={item2} key={id} course={course} />)
                }
                {
                    Testlist.map((item2, id) => <Testreview Trigger={Trigger} setTrigger={setTrigger} item={item2} key={id} course={course} />)
                }
            </div>
            {
                AddVideo && <Videolessoncreate setstate={setstate} Trigger = {Trigger} setTrigger = {setTrigger} setAddVideo={setAddVideo} lesson_id={item.id} />
            }
            {
                AddNotebook && <Notebooklessoncreate setstate={setstate} Trigger={Trigger} setTrigger={setTrigger} setAddNotebook={setAddNotebook} lesson_id={item.id} />
            }
            {
                AddTest && <Testcreate setstate={setstate} Trigger={Trigger} setTrigger={setTrigger} setAddTest={setAddTest} lesson_id={item.id}  />
            }

            {
                Delete && <div className='deletediv'>
                    <div className="delete_content">
                        <p>
                            Bạn có đồng ý xoá bài học này không?
                        </p>
                        <div>
                            <button onClick={
                                xoalesson
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

                </div>}
        </div>
    );
}

export default Lessons;
