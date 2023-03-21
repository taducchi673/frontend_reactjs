import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { BaseURLContext } from '../../../App';
import Commentsection from '../../commentSection/commentsection';
import CourseContent from '../../courseContent/courseContent';
import { AiOutlineRollback, AiOutlineMenu } from "react-icons/ai"

import "./notebooklesson.css"

const Notebooklesson = () => {
    const {course_id, notebooklessonId} = useParams();

    const token = Cookies.get("token");
    const BaseURL = useContext(BaseURLContext);
    const [Notebook, setNotebook] = useState({})
    const [OpenRightDiv, setOpenRightDiv] = useState(true)
    const [Comment, setComment] = useState(false);


    useEffect(() => {
        fetch(`${BaseURL}api/notebook-lessons/${notebooklessonId}/`).then(data => data.json()).then(data => setNotebook(data), {
            methods: "GET",
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    }, [notebooklessonId])

    const navigate = useNavigate();

    return (
        <div className='notebooklesson videoLesson'>

            <div className="videodiv">
                <div className="home_back">
                    <p onClick={() => {
                        navigate("/app/courses/" + course_id)
                    }}>
                        <AiOutlineRollback size={25} /> Trở về khóa học
                    </p>
                    <p onClick={() => {
                        setOpenRightDiv(!OpenRightDiv)
                    }}>
                        <AiOutlineMenu size={25} />
                    </p>
                </div>
                <div className="notebooklessonContent" dangerouslySetInnerHTML={{ __html: Notebook.content }} ></div>

           </div>
            <div className={OpenRightDiv ? 'videomenu' : "videomenu-disabled"}>
                <div>
                    <div onClick={() => {
                        setComment(true)
                    }} className={Comment ? "comment-active" : ""}>
                        Bình luận
                    </div>
                    <div onClick={() => {
                        setComment(false)
                    }} className={!Comment ? "comment-active" : ""}>
                        Nội dung khóa học
                    </div>
                </div>
                {
                    Comment ? <Commentsection type="notebook-lessons" id={notebooklessonId} /> : <div><h3>NỘI DUNG KHÓA HỌC</h3>

                        <hr />
                        <br />
                        <CourseContent course_id={course_id} />
                    </div>
                }
            </div>
        </div>
    );
}

export default Notebooklesson;
