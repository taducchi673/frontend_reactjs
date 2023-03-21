import React, { useContext, useEffect, useState } from 'react';
import { BaseURLContext } from '../../../App';
import Filterbytype from './filterbytype/filterbytype';
import Inputcheckbox from './inputcheckbox/inputcheckbox';
import "./filter.css"
import {BiFilterAlt} from 'react-icons/bi'


const Filter = () => {

    const BaseURL = useContext(BaseURLContext);
    
    const [Subjectlist, setSubjectlist] = useState([]);
    const [SubjectFilter, setSubjectFilter] = useState([]);

    useEffect(() => {
        fetch(`${BaseURL}api/subjects/`).then(data => data.json()).then(data => setSubjectlist(data))

        return () => {
            
        };
    }, []);

    let querystring = ""
    useEffect(() => {
        if (SubjectFilter.length !== 0) {
            querystring = `?subject_id=${SubjectFilter.toString()}`;
        }
        console.log(querystring)
    }, [SubjectFilter])

    const handleFilter = () => {
        fetch(`${BaseURL}api/subjects/${querystring}`).then(data => data.json()).then(data => setSubjectlist(data))

        return () => {

        };
    }

    return (
        <div className='filter'>
            <div className="filter__top">
                <BiFilterAlt size={25} /> Filter
            </div>
            <div className="filter__form">
                <Filterbytype type="Môn học"  list={Subjectlist} display={`subject`} SubjectFilter={SubjectFilter}
                setSubjectFilter = {setSubjectFilter}
                />
                
            </div>
            <button onClick={
                handleFilter
            }>Filter</button>
        </div>
    );
}

export default Filter;
