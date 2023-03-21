import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { BaseURLContext } from '../../../../App';
import './videolessonupdate.css'


const Videolessonupdate = ({ setstate, vd_id, setAddVideo, Trigger, setTrigger, setUpdate }) => {
    const editorRef = useRef()
    const [Content, setContent] = useState("");
    const [Lesson, setLesson] = useState(vd_id);
    const [Name, setName] = useState("");
    const token = Cookies.get("token");
    const [Finished, setFinished] = useState(false)
    // var finish = false
    const BaseURL = useContext(BaseURLContext);
    const form_data = new FormData()
    const [Videolesson, setVideolesson] = useState({});
    const handlecreatevideo = () => {
        axios({
            method: "patch",
            url: `${BaseURL}api/video-lessons/${vd_id}/`,
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

    useEffect(() => {
        fetch(`${BaseURL}api/video-lessons/${vd_id}/`).then(data => data.json()).then(data => setVideolesson(data))
    }, [])


    return (

        <div className="sublesson_create">
            <div className='sublesson_create_content'>
                <div className="sublesson_create_content_top">
                    <h3>Chỉnh sửa bài giảng video</h3>
                    <HiXMark size={25} onClick={
                        () => {
                            setUpdate(false)
                        }} />
                </div>
                <hr />

                {!Finished && <div className='formvideocreate'>

                    <label htmlFor="name">Chỉnh sửa tên video bài giảng:</label>
                    <input type="text" name="name" id="name" onChange={(e) => form_data.set("name", e.target.value)} defaultValue={Videolesson.name} />
                    <label htmlFor="video">Chỉnh sửa video bài giảng:</label>
                    <input type="file" name="video" id="video" onChange={(e) => {
                        form_data.set("video", e.target.files[0])
                    }} />
                    <label htmlFor="">Chỉnh sửa mô tả video:</label>
                    <Editor
                        id="content"
                        onInit={(evt, editor) => editorRef.current = editor}
                        apiKey='t4azboswa738q8w6ckh99l8uod9rqtpy8lg0n9bp9q1veazy'

                        initialValue={Videolesson.description}
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
                    <input type="submit" value="Hoàn tất chỉnh sửa" onClick={
                        handlecreatevideo} />
                </div>}
                {
                    Finished && <div>
                        <p>
                            Đã hoàn tất chỉnh sửa video bài giảng
                        </p>
                        <p onClick={() => {
                            setUpdate(false)
                        }}>
                            Trở về trang chỉnh sửa khóa học?
                        </p>
                    </div>
                }
            </div>
        </div>

    );
}

export default Videolessonupdate;
