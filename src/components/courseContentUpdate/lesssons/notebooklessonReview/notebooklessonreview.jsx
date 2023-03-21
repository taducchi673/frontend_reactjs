import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react';
import { GiNotebook } from 'react-icons/gi'
import { HiDotsVertical } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { BaseURLContext } from '../../../../App';
import Notebooklessonupdate from '../notebooklessonupdate/notebooklessonupdate';


const Notebooklessonreview = ({item, course, Trigger, setTrigger}) => {


    const [state, setstate] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [Update, setUpdate] = useState(false);
    const token = Cookies.get("token");
    const BaseURL = useContext(BaseURLContext)


    const xoavideolesson = () => {
        fetch(`${BaseURL}api/notebook-lessons/${item.id}/`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${token}`
            }
        }).then(data => {
            setDelete(false);
            setstate(false);
            setTrigger(!Trigger)
        })

    }

    return (
        <div className='videolessonreview'>
            <Link exact to={`/courses/${course}/notebooklessons/${item.id}`}>
                <GiNotebook size={20} style={{
                    marginRight: "10px"
                }} /> {item.name}
            </Link>
            <div className='videolesson__optionupdate'>
                <HiDotsVertical size={25} onClick={() => {
                    setstate(!state);

                }} />
                    
                
                {
                    state && <div className='commentoptiond'>
                        <button onClick={
                            () => {
                                setUpdate(!Update)
                            }
                        }>
                            Chỉnh sửa notebook
                        </button>
                       
                        <button onClick={
                            () => {
                                setDelete(!Delete)
                            }
                        }>
                            Xóa bài giảng notebook này
                        </button>

                    </div>
                }
                {
                    Update && <Notebooklessonupdate setUpdate={setUpdate} setstate={setstate} nb_id= {item.id} Trigger = {Trigger} setTrigger={setTrigger}  />
                }
                {
                    Delete && <div className='deletediv'>
                        <div className="delete_content">
                            <p>
                                Bạn có đồng ý xoá bài giảng notebook này không?
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

                    </div>}
            </div>
        </div>
    );
}

export default Notebooklessonreview;
