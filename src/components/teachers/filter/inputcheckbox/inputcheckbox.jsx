import React from 'react';
import './inputcheckbox.css'


const Inputcheckbox = ({ id, subject, SubjectFilter, setSubjectFilter }) => {

    const handleChange = (e, id) => {
        if (subject !== "") {
            if (e.target.checked) {
                if (!SubjectFilter.includes(id)) {
                    setSubjectFilter((arr) => [...arr, id]);
                    console.log(SubjectFilter)
                }
            }
            else {
                if (SubjectFilter.includes(id)) {
                    setSubjectFilter((arr) => arr.filter((idx) => {
                        return idx !== id
                    }));
                    console.log(SubjectFilter)
                }
            }
        }

    }

    return (
        <div className='inputcheckbox'>
            <input type="checkbox" name="teacher__filter" id={`teacher_${id}`} onChange = {(e) => {
                handleChange(e, id)
            }} />
            <label htmlFor={`teacher_${id}`}>
                {subject}
            </label>
        </div>
    );
}

export default Inputcheckbox;
