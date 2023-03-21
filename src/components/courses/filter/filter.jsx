import React, { useContext, useEffect, useState } from 'react';
import { BaseURLContext } from '../../../App';
import Filterbytype from './filterbytype/filterbytype';
import Inputcheckbox from './inputcheckbox/inputcheckbox';
import "./filter.css"
import {BiFilterAlt} from 'react-icons/bi'


const Filter = ({setcoursesList}) => {

    const BaseURL = useContext(BaseURLContext);
    const [teacherlist, setteacherlist] = useState([]);
    const [Gradelist, setGradelist] = useState([]);
    const [Subjectlist, setSubjectlist] = useState([]);
    const [Queryset, setQueryset] = useState("");
    const [teacherlistfilter, setteacherlistfilter] = useState([]);
    const [Gradelistfilter, setGradelistfilter] = useState([]);
    const [Subjectlistfilter, setSubjectlistfilter] = useState([]);


    useEffect( () => {
        var querystring = "";
        if (teacherlistfilter.length !== 0) {
            if (querystring === "") {
                console.log(teacherlist, "teacherlist");
                querystring =`?teacher_id=${teacherlistfilter.toString()}`;
                console.log(querystring);

            }
            else {
                console.log(teacherlistfilter, "teacherlist");

                querystring+=`&teacher_id=${teacherlistfilter.toString()}`         
                console.log(querystring);
            }
        }
        if (Gradelistfilter.length !== 0) {
            if (querystring === "") {
                console.log(Gradelistfilter, "grade")
                querystring = `?grade_id=${Gradelistfilter.toString()}`;
                console.log(querystring)

            }
            else {
                console.log(Gradelistfilter, "grade")

                querystring += `&grade_id=${Gradelistfilter.toString()}`;
                console.log(querystring)
            }

        } 
        if (Subjectlistfilter.length !== 0) {
            if (querystring === "") {
                console.log("subjectlist", Subjectlistfilter)
                    querystring = `?subject_id=${Subjectlistfilter.toString()}` ;
                     console.log(querystring);
                }
                   
            else {
                console.log("subjectlist", Subjectlistfilter)
                querystring += `&subject_id=${Subjectlistfilter.toString()}` }
                console.log(querystring);

                
            }
        
        setQueryset(querystring); 
        
       
    }, [teacherlistfilter, Subjectlistfilter, Gradelistfilter])

    const handleFilter =  () => {
        console.log(Queryset)
        fetch(`${BaseURL}api/courses/${Queryset}`).then(data => data.json()).then(data => {setcoursesList(data); console.log(data)})
    }

    useEffect(() => {
        
        fetch(`${BaseURL}api/usertypes/1/users/`, {
            method :"GET"

        }).then(data => data.json()).then(data => setteacherlist(data))

        fetch(`${BaseURL}api/grades/`).then(data => data.json()).then(data => setGradelist(data));
        fetch(`${BaseURL}api/subjects/`).then(data => data.json()).then(data => setSubjectlist(data))

        return () => {
            
        };
    }, []);

    return (
        <div className='filter'>
            <div className="filter__top">
                <BiFilterAlt size={25} /> Filter
            </div>
            <div className="filter__form">
                <Filterbytype type="Môn học" list={Subjectlist} display={`subject`} setSubjectlistfilter={setSubjectlistfilter} setGradelistfilter={setGradelistfilter}  setteacherlistfilter = {setteacherlistfilter}/>
                <Filterbytype type="Khối học" list={Gradelist} display={`grade`} setSubjectlistfilter={setSubjectlistfilter} setGradelistfilter={setGradelistfilter}  setteacherlistfilter = {setteacherlistfilter}/>
                <Filterbytype type="Giáo viên" list={teacherlist} display="teacher_name" setSubjectlistfilter={setSubjectlistfilter} setGradelistfilter={setGradelistfilter}  setteacherlistfilter = {setteacherlistfilter}/>
            </div>
            <button onClick={
                () => {
                    handleFilter()
                }
            }>Filter</button>
        </div>
    );
}

export default Filter;
