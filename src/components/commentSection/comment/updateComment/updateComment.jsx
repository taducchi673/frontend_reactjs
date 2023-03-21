import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { BaseURLContext } from '../../../../App';
import './updateComment.css'

  
const UpdateCommentDiv = ({ id, setUpdateComment, Trigger, setTrigger }) => {

    const [UserAvatar, setUserAvatar] = useState("");
    const [Token, setToken] = useState("");
    const [Login, setLogin] = useState("")
    const BaseURL = useContext(BaseURLContext)
    const [CommentContent, setCommentContent] = useState("");
    const [Comment, setComment] = useState({});

    useEffect(() => {
        setLogin(Cookies.get("login"));
        
    }, [])

    useEffect(() => {
        if (Cookies.get("username") !== undefined) {
            setToken(Cookies.get("token"));
            setUserAvatar(Cookies.get("avatar"));
            console.log(UserAvatar)

        }
        return () => {

        };
    }, []);

    useEffect(() => {
        fetch(`${BaseURL}api/comments/${id}/`).then(data => data.json()).then(data => {
            setComment(data);
            console.log(data)
        })
    }, [id])

    const handleUpdateComment = (event) => {
        fetch(`${BaseURL}api/comments/${id}/`, {
            method: "PATCH",
            headers: {
                "Authorization": `Token ${Token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "content": CommentContent
            })
        }).then(data => {
            setUpdateComment(false);
            setTrigger(!Trigger)
        })
    }


    return (
        <div className='updateComment'>
            <div className='userIdentity__Commentupdate'>
                <img src={UserAvatar} alt="" />
            </div>
            <div className='form__Commentupdate'>
                <input defaultValue={Comment.content} type="text" placeholder='Chỉnh sửa bình luận' onChange={(event) => {
                    setCommentContent(event.target.value);
                                    }
                } />
                <input type="submit" value="Hoàn tất"
                    onClick={
                        (event) => {
                            handleUpdateComment(event);
                        }
                    }
                />
            </div>
        </div>
    );
}

export default UpdateCommentDiv;
