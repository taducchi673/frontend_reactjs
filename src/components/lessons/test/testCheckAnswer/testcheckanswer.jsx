import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseURLContext } from '../../../../App';
import Questioncheckanswer from '../QuestionCheckAnswer/questioncheckanswer';
import "./testcheckanswer.css"

const Testcheckanswer = (
    { List, TestContent, setList }
) => {

    const { testId } = useParams();
    const [UserTest, setUserTest] = useState([])
    const token = Cookies.get("token")
    const BaseURL = useContext(BaseURLContext);
    const [Result, setResult] = useState(0)

    useEffect(() => {
        fetch(`${BaseURL}api/tests/${testId}/submit/`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "Application/json"
            }
        }).then(
            data => data.json()
        ).then(data => {
            setUserTest(data[0].answers);
            return data;
        })




        return () => {

        };
    }, []);

    useEffect(() => {

        let List2 = List;
        for (var i = 0; i < List.length; i++) {
            console.log(List[i]);
            const answer = UserTest.filter(item => item.questionid == List[i].id)[0];
            console.log(answer);

            List2[i] = {
                ...List2[i], ...answer
            };


            if (List2[i].correct_answer === List2[i].answer) {
                setResult(Result => Result + 1);
            }
        }
        setList(List2);
        console.log("list", List)
        return () => {

        };
    }, [UserTest]);

    return (
        <div className='testcheckanswer'>
            <h2>Đề thi: {TestContent.name}</h2>
            <span>Kết quả: {Result}/{List.length}</span> <br />
            <span>Kết quả(thang 10): {(Result) / List.length * 10}</span>
            <br /> <hr />

            {
                List.map((item, id) => <Questioncheckanswer key={id} item={item} />)
            }
        </div>
    );
}

export default Testcheckanswer;
