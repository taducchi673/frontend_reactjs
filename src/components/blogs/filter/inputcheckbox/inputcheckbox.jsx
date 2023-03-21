import React from 'react';
import './inputcheckbox.css'


const Inputcheckbox = ({teacher_name, id, topic, setSubTopicFilter, SubTopicFilter}) => {


    const handleChange = (e, id) => {
        if (topic !== "") {
            if (e.target.checked) {
                if (!SubTopicFilter.includes(id)) {
                    setSubTopicFilter((arr) => [...arr, id]);
                    console.log(SubTopicFilter)
                }
            }
            else {
                if (SubTopicFilter.includes(id)) {      
                    setSubTopicFilter((arr) => arr.filter((idx) => {
                        return idx !== id
                    }));
                    console.log(SubTopicFilter)
                }
            }
        }
       
    }

    return (
        <div className='inputcheckbox'>
            <input type="checkbox" name="teacher__filter" id={`teacher_${id}`} onChange={e => {handleChange(e, id)}}/>
            <label htmlFor={`teacher_${id}`}>
                {topic}
            </label>
        </div>
    );
}

export default Inputcheckbox;
