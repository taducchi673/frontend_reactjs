import React, { useContext, useEffect, useState } from 'react';
import { BaseURLContext } from '../../../App';
import Filterbytype from './filterbytype/filterbytype';
import Inputcheckbox from './inputcheckbox/inputcheckbox';
import "./filter.css"
import { BiFilterAlt } from 'react-icons/bi'


const Filter = ({ setBloglist }) => {

    const BaseURL = useContext(BaseURLContext);
    const [TopicList, setTopicList] = useState([]);
    const [Topicfilter, setTopicfilter] = useState([]);
    let querystring = ""

    useEffect(() => {
        
        if (Topicfilter.length !== 0) {
            
                querystring = `?topic_id=${Topicfilter.toString()}`;
               

        }
        console.log(querystring)
    }, [Topicfilter])

    const handleFilter = () => {
        fetch(`${BaseURL}api/blogs/${querystring}`).then(data => data.json()).then(data => setBloglist(data))
    }


    useEffect(() => {

        fetch(`${BaseURL}api/topics/`, {
            method: "GET"

        }).then(data => data.json()).then(data => setTopicList(data))



        return () => {

        };
    }, []);

    return (
        <div className='filter'>
            <div className="filter__top">
                <BiFilterAlt size={25} /> Filter
            </div>
            <div className="filter__form">

                <Filterbytype type="Chủ đề" list={TopicList} display="teacher_name" Topicfiler={Filter} setTopicfilter={setTopicfilter} />


            </div>
            <button onClick={handleFilter} >Filter</button>
        </div>
    );
}

export default Filter;
