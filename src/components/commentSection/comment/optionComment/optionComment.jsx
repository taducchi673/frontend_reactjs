import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BaseURLContext } from '../../../../App';
import './optionComment.css'


const OptionComment = ({ UpdateComment, setUpdateComment, commentId, setTrigger, Trigger }) => {

    const [state, setstate] = useState(false);
    const BaseURL = useContext(BaseURLContext);
    const token = Cookies.get("token");
    const [Delete, setDelete] = useState(false);
    const [Message, setMessage] = useState({})
    

    const xoabinhluan = () => {
        fetch(`${BaseURL}api/comments/${commentId}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },

        }).then((data) => {
            setDelete(false);
            setTrigger(!Trigger)
        })
    }




    return (
        <div className='optionComment'>
            <HiOutlineEllipsisVertical onClick={() => setstate(!state)} size={25} />
            {
                state && <div className='commentoptiond'>
                    <button onClick={() => {
                        setUpdateComment(true)
                    }}>
                        Chỉnh sửa bình luận
                    </button>
                    <button onClick={() => setDelete(true)
                    } >
                        Xoá Bình Luận
                    </button>

                </div>
            }

            {
                Delete && <div className='deletediv'>

                    <div className='delete_content'>
                        <p>
                            Xác nhận Xóa Bình Luận
                        </p>
                        <div>
                            <button onClick={() => xoabinhluan()}>
                                <RiDeleteBin6Line size={20} /> Xóa
                            </button>
                            <button onClick={() => setDelete(false)}>
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
}

export default OptionComment;