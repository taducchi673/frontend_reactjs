import { Editor } from '@tinymce/tinymce-react';
import React, { useRef, useState } from 'react';
import "./questionupdate.css"


const Questionupdate = ({ item, questionList, setquestionList, id }) => {

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
                            initialValue={item.question}
                            onChange={(e) => {
                                setQuestion(editorRef.current.getContent());
                                const questionlist = questionList;
                                questionlist[id].question = editorRef.current.getContent()

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
                        <input type="text" id={`${id}answer1`}
                            defaultValue={item.answer1}
                            onChange={
                                (e) => {

                                    const questionlist = questionList;
                                    questionlist[id].answer1 = e.target.value

                                    setquestionList(questionlist)
                                }

                            } />
                        <label htmlFor={`${id}answer2`} >Đáp án số 2</label>

                        <input type="text" id={`${id}answer2`} defaultValue={item.answer2} onChange={
                            (e) => {

                                const questionlist = questionList;
                                questionlist[id].answer2 = e.target.value
                                setquestionList(questionlist)
                            }
                        } />
                        <label htmlFor={`${id}answer3`}>Đáp án số 3</label>

                        <input type="text" id={`${id}answer3`} defaultValue={item.answer3} onChange={
                            (e) => {

                                const questionlist = questionList;
                                questionlist[id].answer3 = e.target.value;

                                setquestionList(questionlist)
                            }
                        } />
                        <label htmlFor={`${id}answer4`}>Đáp án số 4</label>

                        <input type="text" id={`${id}answer4`} defaultValue={item.answer4} onChange={
                            (e) => {

                                const questionlist = questionList;
                                questionlist[id].answer4 = e.target.value
                                setquestionList(questionlist)
                            }
                        } />
                        <label htmlFor={`${id}answer_cor`}>Câu hỏi đúng (Lưu ý phải giống 100% với 1 trong các phương án trên)</label>

                        <input type="text" id={`${id}answer_cor`} defaultValue={item.correct_answer} onChange={
                            (e) => {

                                const questionlist = questionList;
                                questionlist[id].correct_answer = e.target.value
                                setquestionList(questionlist)
                            }
                        } />
                    </div>
                }

            </div>
        </div>

    );
}

export default Questionupdate;
