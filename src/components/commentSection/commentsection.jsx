import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { BaseURLContext } from '../../App';
import Comment from './comment/comment';
import CreateComment from './comment/createComment/createComment';
import './commentsection.css'


const Commentsection = ({ type, id }) => {

    const [Comments, setComments] = useState([]);
    const BaseURL = useContext(BaseURLContext);
    const [Trigger, setTrigger] = useState(false);

    useEffect(() => {
        fetch(`${BaseURL}api/${type}/${id}/comments/`).then(data => data.json()).then(data => { setComments(data.reverse()); console.log(data) })
        return () => {

        };
    }, [type, id, Trigger]);

    return (
        <div className='commentSection'>

            <h3>Bình luận</h3> <hr /> <br />
            <CreateComment type={type} id={id} setTrigger={setTrigger} Trigger={Trigger} />
            {
                Comments.map((item, id) => <Comment item={item} id={item.id} key={id} Trigger={Trigger} setTrigger={setTrigger} />)
            }
        </div>
    );
}

export default Commentsection;
