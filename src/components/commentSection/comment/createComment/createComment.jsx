import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { BaseURLContext } from '../../../../App';
import './createComment.css';


const CreateComment = ({ type, id, Trigger, setTrigger }) => {

    // const userid = Cookies.get("userid");
    const [UserAvatar, setUserAvatar] = useState("");
    const [Token, setToken] = useState("");
    const [Login, setLogin] = useState("")
    const BaseURL = useContext(BaseURLContext)
    const [CommentContent, setCommentContent] = useState("");
    const inputRef = useRef()
    useEffect(() => {
        setLogin(Cookies.get("login"));
    }, [])

    useEffect(() => {
        if (Cookies.get("username") !== undefined) {
            setToken(Cookies.get("token"));
            setUserAvatar(Cookies.get("avatar"));

        }
        return () => {

        };
    }, []);

    const handleComment = (event) => {
        fetch(`${BaseURL}api/${type}/${id}/comments/`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${Token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "content": CommentContent
            })
        }).then(data => {
            setTrigger(!Trigger);
            inputRef.current.value = "";
            inputRef.current.focus()
        })
    }

    return (
        <div className='createComment'>
            <div className='userIdentity__Commentcreate'>
                <img src={UserAvatar} alt="" />
            </div>
            <div className='form__Commentcreate'>
                <input type="text" placeholder='Thêm bình luận' ref={inputRef} onChange={(event) => {
                    setCommentContent(event.target.value);
                    console.log(CommentContent)
                }
                } />
                <input type="submit" value="Bình luận"
                    onClick={
                        (event) => {
                            handleComment(event);
                        }
                    }
                />
            </div>
        </div>
    );
}

export default CreateComment;
