import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseURLContext } from '../../../App';
import "./createcourse.css"


const Createcourse = () => {

    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [teacher, setteacher] = useState(Cookies.get("userid"));
    const [Subject, setSubject] = useState("")
    const [Grade, setGrade] = useState("")
    const [Gradelist, setGradelist] = useState([]);
    const [Subjectlist, setSubjectlist] = useState([]);
    const [Teacherlist, setTeacherlist] = useState([]);
    const BaseURL = useContext(BaseURLContext);
    const usertype = Cookies.get("usertype");
    const userid = Cookies.get("userid");
    const token = Cookies.get("token");
    const editorRef = useRef();
    const form_data = new FormData();
    form_data.append("teacher", userid);
    const [Finish, setFinish] = useState(false)
    // useEffect(() => {
        
    //     return () => {
    //         cleanup
    //     };
    // }, [input]);
    const handleCourseCreate = () => {

        

        axios({
            method: "post",
            url: `${BaseURL}api/courses/`,
            headers: {
                "Authorization": `Token ${token}`
            },
            data: form_data
        }).then(res => {
            // setupdateSucessfully(true);
            // console.log(res);
            setFinish(true)
        })
    }

    useEffect(() => {

        fetch(`${BaseURL}api/usertypes/1/users/`, {
            method: "GET"

        }).then(data => data.json()).then(data => setTeacherlist(data))

        fetch(`${BaseURL}api/grades/`).then(data => data.json()).then(data => setGradelist(data));
        fetch(`${BaseURL}api/subjects/`).then(data => data.json()).then(data => setSubjectlist(data))

        return () => {

        };
    }, []);
    
    return (
        <>
        {
                !Finish ? <div className='createcourse'>
                    <h3>THÊM KHÓA HỌC</h3>
                    <br />
                    <hr />

                    <label htmlFor="name">Tên khóa học</label>
                    <input type="name" name="name" id='name'
                        onChange={
                            (e) => {
                                form_data.append("name", e.target.value);


                            }} />
                    <label htmlFor="">Mô tả khóa học</label>
                    <Editor
                        id="content"
                        onInit={(evt, editor) => editorRef.current = editor}
                        apiKey='t4azboswa738q8w6ckh99l8uod9rqtpy8lg0n9bp9q1veazy'
                        // onInit={(evt, editor) => editorRef.current = editor}
                        // initialValue={Blog.content}
                        onChange={(e) => {

                            form_data.append("description", editorRef.current.getContent());
                            console.log(editorRef.current.getContent())
                        }}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                    <label htmlFor="subject">Môn học</label>
                    <select name="subject" id="subject" onChange={(e) => {

                        form_data.append("subject", e.target.value)

                        console.log(e.target.value)

                    }}>
                        {Subjectlist.map((item, id) => <option value={item.id}>{item.subject_name}</option>)}
                    </select>
                    <label htmlFor="grade">Khối học</label>
                    <select name="grade" id="grade" onChange={
                        (e) => {

                            form_data.append("grade", e.target.value)
                            console.log(e.target.value)
                        }
                    }>
                        {Gradelist.map((item, id) => <option value={item.id}>{item.grade}</option>)}
                    </select>
                    {
                        (usertype == 3) &&
                        <div>
                            <select name="teacher" id="">
                                {
                                    Teacherlist.map((item, id) => <option value={item.id}>{item.last_name} {item.first_name} key={id}</option>)
                                }
                            </select>
                        </div>
                    }
                    <label htmlFor="imagedisplay">Ảnh hiển thị</label>
                    <input type="file" src="" alt="" onChange={(e) => {

                        form_data.append("image", e.target.files[0])
                    }} />
                    <input type="submit" onClick={
                        handleCourseCreate
                    } />
                </div> :
                <div className='finish'>
                    Đã tạo khóa học thành công
                    <Link exact to="/app/courses/">
                    Trở lại danh sách khóa học
                    </Link>
                </div>
        }
        
        </>
    );
}

export default Createcourse;
