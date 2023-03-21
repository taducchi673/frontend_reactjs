import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BaseURLContext, LoginContext } from '../../../App';
import Sidebar from '../../sidebar/sidebar';
import './blogcreate.css';
import { Editor } from '@tinymce/tinymce-react';
import Cookies from 'js-cookie';
import axios from 'axios'

const Blogcreate = () => {

    const editorRef = useRef(null);
    const BaseURL = useContext(BaseURLContext);
    const userid = Cookies.get("userid");
    const [Createdsuccessfully, setCreatedsuccessfully] = useState(false)
    // const [Blog, setBlog] = useState({
    //     "user": userid,
    //     "content": "",
    //     "image": "",
    //     "name": "",
    //     "topic": ""
    // });
    const key = Cookies.get("token");
    // console.log(key)
    
    const form_data = new FormData();
    form_data.append("author", userid)



    const [topicList, settopicList] = useState([])

    useEffect(()=> {
        
        fetch(`${BaseURL}api/topics/`).then(data => data.json()).then(data => {
            settopicList(data); 
          
          
        });
        

    }, [])
    
    const handleUpdate = () => {
        // let form_data = new FormData();
        // form_data = {...Blog}
        
        
        // fetch(`${BaseURL}api/blogs/${blogId}/`, {
            
        //     method : "PUT",
        //     credentials: 'same-origin', // include, *same-origin, omit
        //     headers: {
        //     'Accept': '*/*',
        //     'Content-Type': 'multipart/form-data',
        //     "Authorization": `Token ${key}`,
        //     },
        //     body: form_data
        // }).then(data => data.json()).then(data => console.log(data))
        axios({
            method: "post",
            url: `${BaseURL}api/blogs/`,
            headers: {
                "Authorization": `Token ${key}`
            },
            data: form_data
        }).then(res => {
            setCreatedsuccessfully(true);
        })
    }

    return (
        <div className='blogcreate'>
            
            {
                !Createdsuccessfully ? <div className="blogcreate__content">
                <h3>Tạo bài viết</h3>
                <br />
                <hr />
                <br />
                <br />
                <label htmlFor="blogname">Tiêu đề bài viết: </label>
                <input type="text" defaultValue={""} id="blogname" onChange={
                    (e) => {
                    form_data.append("name", e.target.value)}
                }/>
                <br /><br />
                <label htmlFor="topic">Chủ đề</label>
                <select name="topic" id="topic" onChange={(e) => {
                
                form_data.append("topic", e.target.value)
            }}>
                
                {
                    topicList.map((item, id)=> <option value={item.id} key={id}> {item.topic_name}</option>)
                }
              
                
            </select>   
                <br />
                <br />
                <label htmlFor="image">Ảnh hiển thị</label>
                <input type="file" onChange = {(e) => {
                   
                    form_data.append("image", e.target.files[0])
                }}/>
                <br /><br />
                <hr />
                <label htmlFor="content">NỘI DUNG</label>
                <br />
                <br />
                <Editor
                id="content"
                 onInit={(evt, editor) => editorRef.current = editor}
                apiKey='t4azboswa738q8w6ckh99l8uod9rqtpy8lg0n9bp9q1veazy'
                // onInit={(evt, editor) => editorRef.current = editor}
                initialValue={""}
                onChange={(e) => {
                  
                    form_data.append("content", editorRef.current.getContent())
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
            <br />
            <br />
            
               <div className='submitdiv'>
               <input type="submit" value="Tạo bài viết" onClick={handleUpdate} />
               </div>
            </div> : <div className='created_updated_succesfully'>Đã tạo bài viết thành công!
            <br />
                <Link to="/app/blogs/">Trở lại danh sách bài viết</Link>
            </div>
            }
            <Sidebar />
        </div>
    );
}

export default Blogcreate;
