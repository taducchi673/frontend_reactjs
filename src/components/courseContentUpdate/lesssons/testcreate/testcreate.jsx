import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react';
import { useRef } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { BaseURLContext } from '../../../../App';
import Questioncreate from './questioncreate/questioncreate';
import './testcreate.css'


const Testcreate = ({ setstate, lesson_id, setAddTest, Trigger, setTrigger }) => {
    const editorRef = useRef()

    const [TimeLimit, setTimeLimit] = useState(0);
    const [Name, setName] = useState("");
    const token = Cookies.get("token");
    const [Finished, setFinished] = useState(false)
    // var finish = false
    const BaseURL = useContext(BaseURLContext);
    const [numberofqt, setnumberofqt] = useState(0);
    const [questionList, setquestionList] = useState([]);

    const question = {
        "question": "",
        "answer1": "",
        "answer2": "",
        "answer3": "",
        "answer4": "",
        "correct_answer": ""
    }

    const handlecreatetest = () => {
        fetch(`${BaseURL}api/lessons/${lesson_id}/tests/`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": `Application/json`
                },
                body: JSON.stringify(
                    {
                        name: Name,
                        time_limit: TimeLimit,
                        questions: questionList
                    }
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
                    <h3>Thêm đề thi</h3>
                    <HiXMark size={25} onClick={
                        () => {
                            setAddTest(false)
                        }} />
                </div>
                <hr />

                {!Finished && <div className='formvideocreate'>

                    <label htmlFor="name">Tên đề thi:</label>
                    <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="time_limit">Thời gian làm đề thi:</label>
                    <input type="number" id="time_limit" onChange={
                        (e) => setTimeLimit(e.target.value)
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
                            questionList.map((itemm, id) => <Questioncreate questionList={questionList} setquestionList={setquestionList} id={id} key={id} />)
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
                            setAddTest(false)
                        }}>
                            Trở về trang chỉnh sửa khóa học?
                        </p>

                    </div>
                }
            </div>
        </div>

    );
}

export default Testcreate;
