import React, { useState } from 'react';
import { HiChevronUp } from 'react-icons/hi2';
import Inputcheckbox from '../inputcheckbox/inputcheckbox';
import './filterbytype.css'


const Filterbytype = ({ type, list, display, SubjectFilter, setSubjectFilter }) => {
    const [On, setOn] = useState(true);


    return (
        <div className='filterbytype'>
            <h3 onClick={() => {
                setOn(!On)
            }}>{type}<HiChevronUp></HiChevronUp></h3>


            {
                On && <div>
                    {
                        list.map((item, id) => <Inputcheckbox subject={item.subject_name ? item.subject_name :""}
                        key={id} id={item.id} SubjectFilter={SubjectFilter} setSubjectFilter = {setSubjectFilter}
                        /> )
                    }
                    
                    </ div >
            }
                </div>
    )
}

            export default Filterbytype;
