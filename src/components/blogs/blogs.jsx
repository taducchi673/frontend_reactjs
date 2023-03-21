import React, { useState, useEffect, useContext } from 'react';
import { BaseURLContext } from '../../App';
import Filter from './filter/filter';
import Filterbytype from './filter/filterbytype/filterbytype';
import Listblog from './listblog/listblog';
import './blogs.css'


const Blogs = () => {

    const [Bloglist, setBloglist] = useState([]);
    const BaseURL = useContext(BaseURLContext)
    useEffect(() => {
        console.log(BaseURL);
        fetch(`${BaseURL}api/blogs/`).then(data => data.json()).then(data =>{ setBloglist(data); console.log(data)})
        return () => {
            
        };
    }, []);
    
    return (
        <div className='blogs'>
            <Filter setBloglist={setBloglist} />
            <Listblog Bloglist = {Bloglist}/>
        </div>
    );
}

export default Blogs;
