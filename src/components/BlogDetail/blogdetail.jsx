import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BaseURLContext } from '../../App';
import Sidebar from '../sidebar/sidebar';
import "./blogdetail.css"
// import { BiCommentDetail } from 'react-icons/bi'
// import { AiFillLike, AiFillRead } from 'react-icons/ai'
// import HomepageContent from '../homepage__content/homepage__content';
// import { Button, Rating } from '@mui/material';
// import CommentSection from '../CommentSection/commentSection';
// import Relatedpost from '../relatedpost/relatedpost';
import {RiDeleteBin6Line} from 'react-icons/ri'
import Commentsection from '../commentSection/commentsection';

const Blogdetail = () => {
    const BaseURL = useContext(BaseURLContext)
    const { blogId } = useParams();
    
    // const [Blog, setBlog] = useState({});
    // const [rating, setRating] = useState(0);
    // const [Like, setLike] = useState("false");
    // const [AllLike, setAllLike] = useState(0);
    // const [AllRating, setAllRatings] = useState(0);
    // const [Comments, setComments] = useState([]);
    // const [CommentLength, setCommentLength] = useState(0);
    const [Blog, setBlog] = useState([]);
    // const [BlogCategory, setBlogCategory] = useState(1);
    const userid = Cookies.get("userid");
    const usertype = Cookies.get("usertype");
    const [Delete, setDelete] = useState(false);
    const [Deletesuccess, setDeletesuccess] = useState(false);
    const token = Cookies.get("token")
    const [Author, setAuthor] = useState("");

    useEffect(() => 
    {
        fetch(`${BaseURL}api/blogs/${blogId}/`, {
            method: "GET",
            headers: {
                // Authorization: "Token 7aedf85dedec462cc0cc3470dd78e7e4c7ea41c9"
            }
        })
        .then(data => data.json()).then(data => {
            
                setBlog(data)
            return data;   
        }).then(data => {
            fetch(`${BaseURL}api/users/${data.author}/`, {
                method: "GET",
                
            }).then(data => data.json()).then(data => {
                setAuthor(data.last_name + " " + data.first_name);
            })
        });
        window.scrollTo(0,0)

    }, [blogId])


    const handledelete = () => {
        fetch(`${BaseURL}api/blogs/${blogId}/`, {
            method: "DELETE",
            headers: {
                Authorization:  `Token ${token}`
            }
        })
        .then(data => {
            
                setDeletesuccess(true);
                setDelete(false)
            
        });
        window.scrollTo(0,0)
    }
    return (
        <div className='blogdetail__container'>
            {
                !Deletesuccess ? <div className='blogdetail'>
            
                <div className='blogdetail__title'>
                    <div>
                        <h1>{Blog.name}</h1>
                        <br />
                        {/* <hr /> */}
                        <p><strong>Tác giả: </strong> {Author}</p>
                    </div>
                    {
                        (userid == Blog.author || usertype == 3) && <div>
                        <Link to={`/app/blogs/${blogId}/update/`}>
                            Chỉnh sửa bài viết
                        </Link>
                        <button onClick={() => {
                            setDelete(!Delete)
                        }}>
                            <RiDeleteBin6Line size = {20} /> Xoá bài viết
                        </button>
                    </div>
                    }
                    
    
                </div>
                <br />
                <hr />
                <br /><br />
                <div dangerouslySetInnerHTML={{ __html: Blog.content }} className="blogdetail__content"></div>
                    <Commentsection type={"blogs"} id={blogId} />
            </div> : <div className='created_updated_succesfully'>Đã xoá bài viết thành công!
                     <br />
                <Link to="/app/blogs/">Trở lại danh sách bài viết</Link>

            </div>
            
            }
            <Sidebar />
        {
            Delete && <div className='deletediv'> 
                <div className="delete_content">
                    <p>
                    Bạn có đồng ý xoá bài viết này không?
                    </p>
                    <div>
                    <button onClick={
                        handledelete
                    }>
                      <RiDeleteBin6Line size = {20} />  Đồng ý
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
    );
}

export default Blogdetail;
