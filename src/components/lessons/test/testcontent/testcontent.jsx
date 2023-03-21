import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineRollback } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { BaseURLContext } from '../../../../App';
import Question from '../Question/question';
import './testcontent.css'


const Testcontent = ({ TestContent, List, UserTest, setUserTest }) => {
    const { course_id, testId } = useParams();

    const answer = {
        "questionid": "",
        "answer": ""
    }

    const [answerList, setAnswerlist] = useState({
        "answers": []
    })

    useEffect(() => {
        for (let i = 0; i < List.length; i++) {
            answerList.answers.push(answer);
        }
        return () => {
            
        };
    }, []);

    const token = Cookies.get("token");
    const BaseURL = useContext(BaseURLContext);

    const handle = () => {

        fetch(`${BaseURL}api/tests/${testId}/submit/`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(
                    answerList
                )
            }).then(
                () => {
                    fetch(`${BaseURL}api/tests/${testId}/submit/`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Token ${token}`,
                            "Content-Type": "Application/json"
                        }
                    }).then(
                        data => data.json()
                    ).then(data => {
                        setUserTest(data)
                    });
                }
            )
    }


    const navigate = useNavigate()
    return (
        <div className='testcontent_container'>
            <div className="home_back">
                <p onClick={() => {
                    navigate("/app/courses/" + course_id)
                }}>
                    <AiOutlineRollback size={25} /> Trở về khóa học
                </p>
                <h2>Đề thi: {TestContent.name}</h2>
            </div>
            <div className='testcontent'>

                {/* Test {TestContent} */}
                {
                    List.map((item, id) => <Question id={id} item={item} key={id} answerList={answerList}>
                    </Question>)
                }

            </div>

            <div>
                <button onClick={handle}>
                    Nộp bài
                </button>
            </div>
        </div>
    );
}

export default Testcontent;
