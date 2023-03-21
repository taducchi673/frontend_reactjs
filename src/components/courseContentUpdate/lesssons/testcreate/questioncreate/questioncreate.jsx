import { Editor } from '@tinymce/tinymce-react';
import React, { useRef, useState } from 'react';
import "./question.css"


const Questioncreate = ({ questionList, setquestionList, id }) => {

    const [state, setstate] = useState(false);
    const editorRef = useRef();
    const [Question, setQuestion] = useState("");
    const [answer1, setanswer1] = useState("");
    const [answer2, setanswer2] = useState("");
    const [answer3, setanswer3] = useState("");
    const [answer4, setanswer4] = useState("");
    const [correct_answer, setcorrect_answer] = useState("");


    return (

        <div className='questionCreate'>
            <div className='questionCreate__content'>
                <div onClick={() => {
                    setstate(!state)
                }}>
                    <p >Câu hỏi số {id + 1}</p>
                    <div>

                        <div onClick={
                            () => {
                                console.log(id);
                                setquestionList(questionList => questionList.filter((item, index) => index != id));
                                console.log(questionList)
                            }

                        }>
                            Xóa câu hỏi
                        </div>

                    </div>
                </div>
                {
                    state && <div>
                        <Editor
                            id="content"
                            onInit={(evt, editor) => editorRef.current = editor}
                            apiKey='t4azboswa738q8w6ckh99l8uod9rqtpy8lg0n9bp9q1veazy'
                            // onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={""}
                            onChange={(e) => {
                                setQuestion(editorRef.current.getContent());
                                const questionlist = questionList;
                                questionlist[id] = {
                                    question: Question,
                                    answer1: answer1,
                                    answer2: answer2,
                                    answer3: answer3,
                                    answer4: answer4,
                                    correct_answer: correct_answer
                                }

                                setquestionList(questionlist)

                            }}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                        <label htmlFor={`${id}answer1`}>Đáp án số 1</label>
                        <input type="text" id={`${id}answer1`} onChange={
                            (e) => {
                                setanswer1(e.target.value);
                                const questionlist = questionList;
                                questionlist[id] = {
                                    question: Question,
                                    answer1: answer1,
                                    answer2: answer2,
                                    answer3: answer3,
                                    answer4: answer4,
                                    correct_answer: correct_answer
                                }

                                setquestionList(questionlist)
                            }

                        } />
                        <label htmlFor={`${id}answer2`} >Đáp án số 2</label>

                        <input type="text" id={`${id}answer2`} onChange={
                            (e) => {
                                setanswer2(e.target.value);
                                const questionlist = questionList;
                                questionlist[id] = {
                                    question: Question,
                                    answer1: answer1,
                                    answer2: answer2,
                                    answer3: answer3,
                                    answer4: answer4,
                                    correct_answer: correct_answer
                                }
                                setquestionList(questionlist)
                            }
                        } />
                        <label htmlFor={`${id}answer3`}>Đáp án số 3</label>

                        <input type="text" id={`${id}answer3`} onChange={
                            (e) => {
                                setanswer3(e.target.value);
                                const questionlist = questionList;
                                questionlist[id] = {
                                    question: Question,
                                    answer1: answer1,
                                    answer2: answer2,
                                    answer3: answer3,
                                    answer4: answer4,
                                    correct_answer: correct_answer
                                }

                                setquestionList(questionlist)
                            }
                        } />
                        <label htmlFor={`${id}answer4`}>Đáp án số 4</label>

                        <input type="text" id={`${id}answer4`} onChange={
                            (e) => {
                                setanswer4(e.target.value);
                                const questionlist = questionList;
                                questionlist[id] = {
                                    question: Question,
                                    answer1: answer1,
                                    answer2: answer2,
                                    answer3: answer3,
                                    answer4: answer4,
                                    correct_answer: correct_answer
                                }
                                setquestionList(questionlist)
                            }
                        } />
                        <label htmlFor={`${id}answer_cor`}>Câu hỏi đúng (Lưu ý phải giống 100% với 1 trong các phương án trên)</label>

                        <input type="text" id={`${id}answer_cor`} onChange={
                            (e) => {
                                setcorrect_answer(e.target.value);
                                console.log(correct_answer)
                                const questionlist = questionList;
                                questionlist[id] = {
                                    question: Question,
                                    answer1: answer1,
                                    answer2: answer2,
                                    answer3: answer3,
                                    answer4: answer4,
                                    correct_answer: correct_answer
                                }
                                setquestionList(questionlist)
                            }
                        } />
                    </div>
                }

            </div>
        </div>

    );
}

export default Questioncreate;
