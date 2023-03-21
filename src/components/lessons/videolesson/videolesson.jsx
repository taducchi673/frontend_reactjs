import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { Link, redirect, useNavigate, useParams } from 'react-router-dom';
import { BaseURLContext } from '../../../App';
import CourseContent from '../../courseContent/courseContent';
import "./videolesson.css"
import Commentsection from '../../commentSection/commentsection';
import phenikaaLogo from "../../../assets/phenikaaLogo.png"
import { AiOutlineRollback, AiOutlineMenu } from "react-icons/ai"



const Videolesson = () => {

    const { course_id, videolessonId } = useParams();
    const token = Cookies.get("token");
    const BaseURL = useContext(BaseURLContext);
    const [Video, setVideo] = useState({})
    const [Comment, setComment] = useState(false);
    const [OpenRightDiv, setOpenRightDiv] = useState(true)
    const [Teacher, setTeacher] = useState({})

    useEffect(() => {
        fetch(`${BaseURL}api/video-lessons/${videolessonId}/`).then(data => data.json()).then(data => setVideo(data), {
            methods: "GET",
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    }, [videolessonId])

    useEffect(() => {
        fetch(`${BaseURL}api/courses/${course_id}/`).then(data => data.json()).then(data => data.teacher).then(data => 
            fetch(`${BaseURL}api/users/${data}`).then(data=>data.json()).then(data => setTeacher(data))
        )
    }, [course_id]);

    const navigate = useNavigate();

    return (
        <div className='videoLesson'>

            <div className={OpenRightDiv ? 'videodiv w70' : "video w100"} >
                <div className="home_back">
                    <p onClick={() => {
                        navigate("/app/courses/" + course_id)
                    }}>
                        <AiOutlineRollback size={25} /> Trở về khóa học
                    </p>
                    <p onClick={() => {
                        setOpenRightDiv(!OpenRightDiv)
                    }}>
                        <AiOutlineMenu size={25}/>
                    </p>
                </div>
                <video src={Video.videourl} className='video' controls>

                </video>
                <div className='video_title'>

                    <p> Bài giảng: {Video.name}</p>
                    <hr />
                    <div className='giangvienInvideo'>
                        <img src={Teacher.imageurl} alt="" />
                        <Link exact to={`/app/teachers/${Teacher.id}/`}>
                            <p>{Teacher.last_name} {Teacher.first_name}</p>
                        </Link>
                    </div>
                    <hr />
                    <h3>MÔ TẢ VIDEO BÀI GIẢNG: </h3>
                    <div className="video_description" dangerouslySetInnerHTML={{ __html: Video.description }} ></div>
                </div>
                
                
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
                    Comment ? <Commentsection type="video-lessons" id={videolessonId} />: <div><h3>NỘI DUNG KHÓA HỌC</h3>
                   
                    <hr />
                    <br />
                        <CourseContent course_id={course_id} />
                        </div>
                }
            </div>
        </div>
    );
}

export default Videolesson;
