import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { BaseURLContext } from '../../../../App';
import Questionupdate from '../testcreate/questionupdate/questionupdate';
import './testupdate.css'


const Testupdate = ({ setstate, lesson_id, setUpdate, Trigger, setTrigger }) => {
    const editorRef = useRef()

    const [TimeLimit, setTimeLimit] = useState(0);
    const [Name, setName] = useState("");
    const token = Cookies.get("token");
    const [Finished, setFinished] = useState(false)
    // var finish = false
    const BaseURL = useContext(BaseURLContext);
    const [numberofqt, setnumberofqt] = useState(0);
    const [questionList, setquestionList] = useState([]);
    const [Test, setTest] = useState({});

    const question = {
        "question": "",
        "answer1": "",
        "answer2": "",
        "answer3": "",
        "answer4": "",
        "correct_answer": ""
    }

    const [Data, setData] = useState({ "questions": questionList });

    useEffect(() => {
        fetch(`${BaseURL}api/tests/${lesson_id}/`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": `Application/json`
            }
        }).then(data => data.json().then(data => {
            console.log(data.questions);
            setquestionList(data.questions);
            setTest(data);
            console.log(data)
        }))
        return () => {

        };
    }, []);


    useEffect(() => {
        setData({...Data, ...{ "questions": questionList }})
    }, [questionList])

    const handlecreatetest = () => {
        fetch(`${BaseURL}api/tests/${lesson_id}/`,
            {
                method: "PATCH",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": `Application/json`
                },
                body: JSON.stringify(
                    Data
                )
            }).then(data => {
                setTrigger(!Trigger);
                setFinished(true)
            })
    }

    return (

        <div className="sublesson_create">
            <div className='sublesson_create_content'>
                <div className="sublesson_create_content_top">
                    <h3>Chỉnh sửa đề thi</h3>
                    <HiXMark size={25} onClick={
                        () => {
                            setUpdate(false)
                        }} />
                </div>
                <hr />

                {!Finished && <div className='formvideocreate'>

                    <label htmlFor="name">Tên đề thi:</label>
                    <input type="text" name="name" id="name" defaultValue={Test.name} onChange={(e) => {
                        setName(e.target.value);
                        setData(Data => ({ ...Data, ...{ "name": e.target.value } }))
                    }
                    } />
                    <label htmlFor="time_limit">Thời gian làm đề thi:</label>
                    <input type="number" id="time_limit" defaultValue={Test.time_limit} onChange={
                        (e) => {
                            setTimeLimit(e.target.value);
                            setData(Data => ({ ...Data, ...{ "time_limit": e.target.value } }))
                        }

                    } />
                    <label htmlFor="questions_list">Danh sách đề thi</label>
                    <div id='questions_list'>
                        <div>
                            <p>
                                Đề thi cần có tối thiểu 1 câu hỏi!
                            </p>
                            <button onClick={(questionList) => setquestionList(questionList => [...questionList, question])}>
                                Thêm câu hỏi
                            </button>
                        </div>

                    </div>
                    <div>
                        {
                            questionList.map((itemm, id) => <Questionupdate questionList={questionList} setquestionList={setquestionList} id={id} key={id} item={itemm} />)
                        }
                    </div>
                    <input type="submit" value="Tạo" onClick={
                        () => handlecreatetest()
                    } />
                </div>}
                {
                    Finished && <div>
                        <p>
                            Đã hoàn tất tạo bà i giảng video
                        </p>
                        <p onClick={() => {
                            setUpdate(false)
                        }}>
                            Trở về trang chỉnh sửa khóa học?
                        </p>

                    </div>
                }
            </div>
        </div>

    );
}

export default Testupdate;
