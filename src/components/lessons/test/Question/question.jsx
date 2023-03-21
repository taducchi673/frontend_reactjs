import React from 'react';
import './question.css'


const Question = ({ item, key, id, answerList }) => {
    return (
        <div className='question_test'>
            <p>Câu hỏi: </p>
            <p dangerouslySetInnerHTML={{ __html: item.question }} ></p>
            <div>
                <input type="radio" id={`${item.id}/as1`} name={item.id} value={item.answer1}

                    onChange={
                        (e) => {
                            if (e.target.checked) {
                                answerList.answers[id] = {
                                    "questionid": item.id,
                                    "answer": e.target.value
                                }

                            }
                        }
                    }

                />
                <label htmlFor={`${item.id}/as1`}>
                    {item.answer1}
                </label>
            </div>
            <div>
                <input type="radio" id={`${item.id}/as2`} name={item.id} value={item.answer2}

                    onChange={
                        (e) => {
                            if (e.target.checked) {
                                answerList.answers[id] = {
                                    "questionid": item.id,
                                    "answer": e.target.value
                                }
                            }
                        }
                    } />
                <label htmlFor={`${item.id}/as2`}>
                    {item.answer2}
                </label>
            </div>
            <div>
                <input type="radio" id={`${item.id}/as3`} name={item.id} value={item.answer3}
                    onChange={
                        (e) => {
                            if (e.target.checked) {
                                answerList.answers[id] = {
                                    "questionid": item.id,
                                    "answer": e.target.value
                                }
                            }
                        }
                    } />
                <label htmlFor={`${item.id}/as3`}>
                    {item.answer3}
                </label>
            </div>
            <div>
                <input type="radio" id={`${item.id}/as4`} name={item.id} value={item.answer4} onChange={
                    (e) => {
                        if (e.target.checked) {
                            answerList.answers[id] = {
                                "questionid": item.id,
                                "answer": e.target.value
                            }
                        }
                    }
                }
                />
                <label htmlFor={`${item.id}/as4`}>
                    {item.answer4}
                </label>
            </div>
            <br />
            <hr />
        </div>
    );
}

export default Question;
