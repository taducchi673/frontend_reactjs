import React, { useEffect, useState } from 'react';
import { HiChevronUp } from 'react-icons/hi2';
import Inputcheckbox from '../inputcheckbox/inputcheckbox';
import './filterbytype.css'


const Filterbytype = ({type, list, display, Topicfilter, setTopicfilter }) => {
    const [On, setOn] = useState(true);
    const [SubTopicFilter, setSubTopicFilter] = useState([])
    var topicList = []

    useEffect((

    ) => { setTopicfilter(SubTopicFilter) }, [SubTopicFilter])

    useEffect(() => {topicList = SubTopicFilter}, [])

    return (
        <div className='filterbytype'>
            <h3 onClick={() => {
                setOn(!On)
            }}>{type}<HiChevronUp></HiChevronUp></h3>
                
           
            {On && <div> {list.map((item, id) => <Inputcheckbox topicList={topicList} SubTopicFilter = {SubTopicFilter} setSubTopicFilter={setSubTopicFilter}
                 topic = {item.topic_name ? item.topic_name : ""}
                 key={id} id={item.id}/>)}  </div>}
           
            
        </div>
    );
}

export default Filterbytype;
