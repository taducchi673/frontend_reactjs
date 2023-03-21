import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react';
import { useRef } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { BaseURLContext } from '../../../../App';
import './videolessoncreate.css'


const Videolessoncreate = ({ setstate, lesson_id, setAddVideo, Trigger, setTrigger }) => {
    const editorRef = useRef()
    const [Content, setContent] = useState("");
    const [Lesson, setLesson] = useState(lesson_id);
    const [Name, setName] = useState("");
    const token = Cookies.get("token");
    const [Finished, setFinished] = useState(false)
    // var finish = false
    const BaseURL = useContext(BaseURLContext);
    const form_data = new FormData()
    form_data.append("lesson", lesson_id)
    form_data.append("name", "")
    form_data.append("description", "")
    form_data.append("video", "")
    const handlecreatevideo = () => {
        axios({
            method: "post",
            url: `${BaseURL}api/lessons/${lesson_id}/videolessons/`,
            headers: {
                "Authorization": `Token ${token}`
            },
            data: form_data
        }).then(res => {
            setFinished(true);
            setTrigger(!Trigger);
            setstate(false)
        })

    }


    return (

        <div className="sublesson_create">
            <div className='sublesson_create_content'>
                <div className="sublesson_create_content_top">
                    <h3>Thêm bài giảng Video</h3>
                    <HiXMark size={25} onClick={
                        () => {
                            setAddVideo(false)
                        }} />
                </div>
                <hr />

                {!Finished && <div className='formvideocreate'>

                    <label htmlFor="name">Tên video bài giảng:</label>
                    <input type="text" name="name" id="name" onChange={(e) => form_data.set("name", e.target.value)} />
                    <label htmlFor="video">Video bài giảng:</label>
                    <input type="file" name="video" id="video" onChange={(e) => {
                        form_data.set("video", e.target.files[0])
                    }} />
                    <label htmlFor="">Mô tả:</label>
                    <Editor
                        id="content"
                        onInit={(evt, editor) => editorRef.current = editor}
                        apiKey='t4azboswa738q8w6ckh99l8uod9rqtpy8lg0n9bp9q1veazy'

                        initialValue={""}
                        onChange={(e) => {
                            form_data.set("description", editorRef.current.getContent())
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
                    <input type="submit" value="Tạo" onClick={
                        handlecreatevideo} />
                </div>}
                {
                    Finished && <div>
                        <p>
                            Đã hoàn tất tạo bài giảng video
                        </p>
                        <p onClick={() => {
                            setAddVideo(false)
                        }}>
                            Trở về trang chỉnh sửa khóa học?
                        </p>
                    </div>
                }
            </div>
        </div>

    );
}

export default Videolessoncreate;
