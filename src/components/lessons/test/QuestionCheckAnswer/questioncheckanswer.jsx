import React, { useState } from 'react';
import Commentsection from '../../../commentSection/commentsection';
import "./questioncheckanswer.css"

const Questioncheckanswer = ({ item }) => {

    const [state, setstate] = useState(false);


    return (
        <div className='questioncheckanswer'>
            <span>Câu hỏi: </span><p dangerouslySetInnerHTML={{ __html: item.question }} ></p>
            <p style={
                {
                    color: (item.answer == item.answer1) ? (item.correct_answer == item.answer1 ? "blue" : "red") : "black",
                    fontWeight: (item.answer == item.answer1) ? (item.correct_answer == item.answer1 ? "bold" : "") : "",
                }
            }
            >
                A:   {item.answer1}
            </p>
            <p style={
                {
                    color: (item.answer == item.answer2) ? (item.correct_answer == item.answer2 ? "blue" : "red") : "black",
                    fontWeight: (item.answer == item.answer2) ? (item.correct_answer == item.answer2 ? "bold" : "") : "",
                }
            }>
                B:  {item.answer2}
            </p>
            <p style={
                {
                    color: (item.answer == item.answer3) ? (item.correct_answer == item.answer3 ? "blue" : "red") : "black",
                    fontWeight: (item.answer == item.answer3) ? (item.correct_answer == item.answer3 ? "bold" : "") : "",
                }
            }>
                C:  {item.answer3}
            </p>
            <p style={
                {
                    color: (item.answer == item.answer4) ? (item.correct_answer == item.answer4 ? "blue" : "red") : "black",
                    fontWeight: (item.answer == item.answer4) ? (item.correct_answer == item.answer4 ? "bold" : "") : "",
                }
            }>
                D:  {item.answer4}
            </p>

            <p style={
                {
                    backgroundImage: (item.correct_answer == item.answer) ? "linear-gradient(90deg, #408E91, white)" : "linear-gradient(90deg,#EA5455, white)",
                    padding: "10px 0",
                    fontWeight: "bold",
                    color: "white"
                }
            
            }>
                <span>
                   | Đáp án đúng: {"   "}
                </span>
                {item.correct_answer}
            </p>
            <div className={"question_bluan"} onClick={
            () => {
                setstate(!state)
            }
            }>Bình luận</div>
            {
                state && <Commentsection type={"questions"} id={item.id} />
            }
            <br />
            <hr />
            <br />
        </div>
    );
}

export default Questioncheckanswer;
