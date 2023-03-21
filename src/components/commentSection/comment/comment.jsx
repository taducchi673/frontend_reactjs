import Cookies from 'js-cookie';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import { BaseURLContext } from '../../../App';
import './comment.css'
import OptionComment from './optionComment/optionComment';
import UpdateCommentDiv from './updateComment/updateComment';
import UpdateComment from './updateComment/updateComment'

const Comment = ({item, id, setTrigger, Trigger}) => {

    const [SubComment, setSubComment] = useState([]);
    const BaseURL = useContext(BaseURLContext);
    const [User, setUser] = useState({});
    const [Update, setUpdate] = useState(false)
    const [UserType, setUserType] = useState(""); 
    const [UserId, setUserId] = useState("")
    const [UpdateComment, setUpdateComment] = useState(false);
    const usertype = Cookies.get("usertype");
    const userid = Cookies.get("userid")

    // useEffect(() => {
    //     fetch(`${BaseURL}api/comments/${id}/comments/`).then(data=>setSubComment(data.json()));
    //     setUserType(Cookies.get("usertype"));
    //     setUserId(Cookies.get("userid"))
    //     return () => {
            
    //     };
    // }, [id]);

    useEffect(() => {
        fetch(`${BaseURL}api/users/${item.user}`).then(data => data.json()).then(data => setUser(data))
        return () => {
            
        };
    }, []);

    return (
        <>
            {
                !Update ? <div className='comment'>
                    {
                        UpdateComment ? <UpdateCommentDiv id={id} setUpdateComment={setUpdateComment} 
                        setTrigger={setTrigger} Trigger={Trigger}
                        /> : <div> 
                            <div className='comment_user_profile'>
                                <img src={User.imageurl} alt="" />
                            </div>
                            <div className="comment__content">
                                <div className="comment__user">

                                    <p>
                                        {User.last_name} {User.first_name}  <span className="comment_createdat">
                                            {item.created_date.slice(0, 10)}
                                        </span>
                                    </p>
                                    {
                                        (usertype == 3 || userid == item.user) && <OptionComment UpdateComment={UpdateComment} setUpdateComment={setUpdateComment} commentId={id} Trigger={Trigger} setTrigger={setTrigger} />
                                    }

                                </div>

                                <div>
                                    <p>
                                        {item.content}
                                    </p>
                                </div>

                            </div>
                        </div>
                    }
                    
                </div>
                    : 
                    <div>
                        <UpdateComment />
                    </div>
        }</>
    );
}

export default Comment;
