import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react';
import { BsQuestionSquare } from 'react-icons/bs'
import { HiDotsVertical } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { BaseURLContext } from '../../../../App';
import Testupdate from '../testupdate/testupdate';


const Testreview = ({ item, course, Trigger, setTrigger }) => {

    const [state, setstate] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [Update, setUpdate] = useState(false);
    const token = Cookies.get("token");
    const BaseURL = useContext(BaseURLContext);


    const xoavideolesson = () => {
        fetch(`${BaseURL}api/tests/${item.id}/`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${token}`
            }
        }).then(data => {
            setDelete(false);
            setstate(false);
            setTrigger(!Trigger);
            setstate(false)
        })

    }

    return (
        <div className='videolessonreview'>
            <Link exact to={`/courses/${course}/tests/${item.id}`}>
                <BsQuestionSquare size={20} style={{
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
                            Chỉnh sửa đề thi
                        </button>

                        <button onClick={
                            () => {
                                setDelete(!Delete)
                            }
                        }>
                            Xóa đề thi
                        </button>

                    </div>
                }
                {
                    Update && <Testupdate lesson_id={item.id} setUpdate={setUpdate} setstate={setstate} Trigger={Trigger} setTrigger={setTrigger} />
                }
                {
                    Delete && <div className='deletediv'>
                        <div className="delete_content">
                            <p>
                                Bạn có đồng ý xóa đề thi này không?
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

export default Testreview;
