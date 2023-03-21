import React from 'react';
import './inputcheckbox.css'


const Inputcheckbox = ({ teacher_name, id, grade, subject, setgradelist, setsubjectlist, setteacherlist, teacherlist, gradelist, subjectlist }) => {

    const handleChange = (e) => {

        if (teacher_name !== "") {
            if (e.target.checked) {
                if (!teacherlist.includes(id)) {

                    setteacherlist(teacherlist => [...teacherlist, id])

                }
            }
            else {
                if (teacherlist.includes(id)) {

                    setteacherlist(teacherlist => teacherlist.filter((idx) => {
                        return idx !== id
                    }))
                    console.log(teacherlist)

                }
            }
        }
        if (grade !== "") {
            if (e.target.checked) {
                if (!gradelist.includes(id)) {

                    setgradelist(gradelist => [...gradelist, id]);


                }
            }
            else {
                if (gradelist.includes(id)) {


                    setgradelist(gradelist => gradelist.filter((idx) => {
                        return idx !== id
                    }))



                }
            }
        }
        if (subject !== "") {
            if (e.target.checked) {
                if (!subjectlist.includes(id)) {

                    setsubjectlist([...subjectlist, id])


                }
            }
            else {
                if (subjectlist.includes(id)) {


                    setsubjectlist(subjectlist => subjectlist.filter((idx) => {
                        return idx !== id
                    }));




                }
            }
        }
    }

    return (
        <div className='inputcheckbox'>
            <input type="checkbox" name="teacher__filter" id={`teacher_${id}`} onChange={(e) => handleChange(e, id)} />
            <label htmlFor={`teacher_${id}`}>
                {teacher_name}{grade}{subject}
            </label>
            
        </div>
    );
}

export default Inputcheckbox;
