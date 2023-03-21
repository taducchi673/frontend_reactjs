import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Testcontent from './testcontent/testcontent';
import Timer from './timer/timer';
import './test.css'
import { BaseURLContext } from '../../../App';
import Cookies from 'js-cookie';
import Testcheckanswer from './testCheckAnswer/testcheckanswer';

const Test = () => {

    const { testId } = useParams();
    const BaseURL = useContext(BaseURLContext);
    const [TestContent, setTestContent] = useState([]);
    const [List, setList] = useState([]);
    const [UserTest, setUserTest] = useState([])
    const token = Cookies.get("token")

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
            setUserTest(data)
        });
    }, [

    ])

    useEffect(() => {
        fetch(`${BaseURL}api/tests/${testId}`).then(
            data => data.json()
        ).then(data => {
            setTestContent(data);
            setList(data.questions);
        });
        return () => {

        };
    }, []);
    return (
        <div className='test'>
            {
                UserTest.length == 1 ? <Testcheckanswer setList={setList} List={List} TestContent={TestContent} /> : <Testcontent UserTest={UserTest} setUserTest={setUserTest} TestContent={TestContent} List={List} />
            }
          
        </div>
    );
}

export default Test;
