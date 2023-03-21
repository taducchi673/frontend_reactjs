import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BaseURLContext } from '../../App';
import Commentsection from '../commentSection/commentsection';
import CourseContent from '../courseContent/courseContent';
import Sidebar from '../sidebar/sidebar';
import './coursedetail.css'


const Coursedetail = () => {
    const { courseId } = useParams();
    const BaseURL = useContext(BaseURLContext);
    const [Course, setCourse] = useState({});
    const [Teacher, setTeacher] = useState({});
    const [CheckEnroll, setCheckEnroll] = useState([]);
    const token = Cookies.get("token");
    const usertype = Cookies.get("usertype");
    const userid = Cookies.get("userid")

    useEffect(() => {
        fetch(`${BaseURL}api/courses/${courseId}/check-enrolled/`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then(data => data.json()).then(data => {
                setCheckEnroll(data);

                return data
            })
    }, [courseId])
    
    
    useEffect(() => {
        fetch(`${BaseURL}api/courses/${courseId}`).then(data => data.json()).then(data => {
            setCourse(data);
            return data.teacher
        }).then(data =>
            fetch(`${BaseURL}api/users/${data}`).then(data => data.json()).then(data => setTeacher(data))
        );

        return () => {

        };
    }, [courseId]);


    const enroll = () => {
        fetch(`${BaseURL}api/courses/${courseId}/check-enrolled/`, {
            method: "POST", 
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "Application/json"
            }
        }).then(data => {
            fetch(`${BaseURL}api/courses/${courseId}/check-enrolled/`, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`
                }
            })
                .then(data => data.json()).then(data => {
                    setCheckEnroll(data);

                    return data
                })
        })
    }

    return (
        <div className="coursedetail">
            <div className="coursedetail__notenrolled">
                <div className='coursedetail__content'>

                    <div>
                        <div>
                            <h1>
                                Khoá học: {"      "}  {Course.name}
                            </h1>
                            {CheckEnroll.length === 0 ? <button onClick={
                                enroll
                            }>Đăng ký khóa học</button> : <p>Bạn là học sinh của khóa học này</p>   }
                            {
                                (userid == Teacher.id || usertype == 3) && <div>
                                    <button>
                                        <Link exact to={`/app/courses/${courseId}/update`}>
                                            Chỉnh sửa mô tả
                                        </Link>
                                    </button>
                                    <button>
                                        <Link exact to={`/app/courses/${courseId}/update-content`}>
                                            Chỉnh sửa nội dung
                                        </Link>
                                    </button>
                                </div>
                            }
                        </div>
                        <br />
                        <div className='giangvienInvideo'>
                            Giảng viên:<img src={Teacher.imageurl} alt="" style={{ marginLeft: "10px" }} />
                            <Link exact to={`/app/teachers/${Teacher.id}/`}>
                                <p>{Teacher.last_name} {Teacher.first_name}</p>
                            </Link>
                        </div>
                        <hr />
                    </div>
                    {
                        CheckEnroll.length === 0 && <div>

                            <div dangerouslySetInnerHTML={{ __html: Course.description }} className="blogdetail__content"></div>
                        </div>
                    }
                    
                    <br />
                    {
                        CheckEnroll.length === 1 && <>
                        <br />
                        <h3>NỘI DUNG KHÓA HỌC</h3>
                        <hr />
                            <CourseContent course_id={courseId}></CourseContent>
                        </>

                    }
                    
                    <Commentsection type={'courses'} id={courseId} />

                </div>
                <Sidebar />
            </div>
        </div>

    );
}

export default Coursedetail;
