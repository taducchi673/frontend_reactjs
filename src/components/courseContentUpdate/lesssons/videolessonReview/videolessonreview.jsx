import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react';
import { BsCameraVideo } from 'react-icons/bs'
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { BaseURLContext } from '../../../../App';
import Videolessonupdate from '../videolessonupdate/videolessonupdate';
import './videolessonreview.css'

const Videolessonreview = ({ item, course, Trigger, setTrigger}) => {

    const [state, setstate] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [Update, setUpdate] = useState(false);
    const token = Cookies.get("token");
    const BaseURL = useContext(BaseURLContext)
    const xoavideolesson = () => {
        fetch(`${BaseURL}api/video-lessons/${item.id}/`, {
            method: "DELETE",
            headers: {
                "Authorization" : `Token ${token}`
            }
        }).then(data => {
            setDelete(false);
            setTrigger(!Trigger)
        })
        
    }

    return (
        <div className='videolessonreview' >
            <Link exact to={`/courses/${course}/videolessons/${item.id}`} >
            
                <BsCameraVideo size={20} style={{
                    marginRight: "10px"
                }} /> {item.name}
            </Link>
            <div className='videolesson__optionupdate'>
                
                <HiOutlineDotsVertical size={25} onClick={() => {
                    setstate(!state);

                }} />
                {
                    state && <div className='commentoptiond'>
                        <button onClick={
                            () => {
                               setUpdate(!Update)
                            }
                        }>
                            Chỉnh sửa video bài giảng
                        </button>
                        
                        <button onClick={
                            () => {
                               setDelete(!Delete)
                            }
                        }>
                           Xóa video bài giảng
                        </button>
                       
                    </div>
                }
            </div>
                {
                    Update && <Videolessonupdate Trigger={Trigger} setTrigger={setTrigger} setstate={setstate} setUpdate={setUpdate} vd_id={item.id}/>
                }
                {
                Delete && <div className='deletediv'>
                    <div className="delete_content">
                        <p>
                            Bạn có đồng ý xoá chương này không?
                        </p>
                        <div>
                            <button onClick={
                                xoavideolesson
                            }>
                                <RiDeleteBin6Line size={20} />  Đồng ý
                            </button>
                            <button onClick={
                                () => setDelete(false)
                            }>
                                Huỷ bỏ
                            </button>
                        </div>
                    </div>

                </div>                }
        </div>
    );
}

export default Videolessonreview;
