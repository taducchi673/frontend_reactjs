import React, { useState } from 'react';
import { useEffect } from 'react';
import { HiChevronUp } from 'react-icons/hi2';
import Inputcheckbox from '../inputcheckbox/inputcheckbox';
import './filterbytype.css'


const Filterbytype = ({type, list, display, setGradelistfilter, setSubjectlistfilter, setteacherlistfilter }) => {
    const [On, setOn] = useState(true);
    // const const
    const [Teacherlist, setteacherlist] = useState([])
    const  [Gradelist, setgradelist] = useState([])
    const  [Subjectlist, setsubjectlist] = useState([])

    var teacherlist = [];
    var gradelist = [];
    var subjectlist = [];

    useEffect(() => {
        setteacherlistfilter(Teacherlist)
    }, [Teacherlist])
    useEffect(() => {
        setGradelistfilter(Gradelist)
    }, [Gradelist])
    useEffect(() => {
        setSubjectlistfilter(Subjectlist)
    }, [Subjectlist])

    return (
        <div className='filterbytype'>
            <h3 onClick={() => {
                setOn(!On)
            }}>{type}<HiChevronUp></HiChevronUp></h3>
                
           
                 {On && <div> {list.map((item, id) => <Inputcheckbox teacher_name={item.first_name ? item.last_name + " " + item.first_name : ""} 
                 grade = {item.grade ? item.grade : ""}
                 subject = {item.subject_name ? item.subject_name : ""}
                 key={id} id={item.id} 
                  teacherlist = {Teacherlist}
                  gradelist = {Gradelist}
                  subjectlist = {Subjectlist}
                 setsubjectlist={setsubjectlist} setgradelist={setgradelist}  setteacherlist = {setteacherlist}
                 />)}  </div>}
           
            
        </div>
    );
}

export default Filterbytype;
