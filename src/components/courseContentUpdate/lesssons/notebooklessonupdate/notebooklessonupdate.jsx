import { Editor } from '@tinymce/tinymce-react';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { BaseURLContext } from '../../../../App';

const Notebooklessonupdate = ({ setUpdate, setstate, nb_id, Trigger, setTrigger }) => {
    const editorRef = useRef()
    const [Content, setContent] = useState("");
    
    const [Name, setName] = useState("");
    const token = Cookies.get("token");
    const [Finished, setFinished] = useState(false)
    // var finish = false
    const BaseURL = useContext(BaseURLContext)
    const [Notebook, setNotebook] = useState({});


    const handlecreatenotebook = () => {
        fetch(`${BaseURL}api/notebook-lessons/${nb_id}/`, {
            method: "PATCH",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": Name,
                "content": Content,
            })
        }).then(Data => {
            setFinished(true);
            setTrigger(!Trigger);
            setstate(false);
        })
    }

    useEffect(() => {
        fetch(`${BaseURL}api/notebook-lessons/${nb_id}/`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },

        }).then(data => data.json()).then(data => {
            setNotebook(data);
            setName(data.name);
            setContent(data.content)
            console.log(data)
        })
    }, [])

    return (

        <div className="sublesson_create">
            <div className='sublesson_create_content'>
                <div className="sublesson_create_content_top">
                    <h3>Chỉnh sửa Notebook</h3>
                    <HiXMark size={25} onClick={
                        () => {
                            setUpdate(false)
                        }} />
                </div>
                <hr />

                {!Finished && <div className='formvideocreate'>

                    <label htmlFor="name">Tên bài học notebook:</label>
                    <input type="text" name="name" id="name"
                        defaultValue={Notebook.name}
                        onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="">Nội dung:</label>
                    <Editor
                        id="content"
                        onInit={(evt, editor) => editorRef.current = editor}
                        apiKey='t4azboswa738q8w6ckh99l8uod9rqtpy8lg0n9bp9q1veazy'

                        initialValue={Notebook.content}
                        onChange={(e) => {
                            setContent(editorRef.current.getContent())
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
                        handlecreatenotebook} />
                </div>}
                {
                    Finished && <div className='successdiv'>
                        <p>
                            Đã hoàn tất tạo notebook lesson
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

export default Notebooklessonupdate;
