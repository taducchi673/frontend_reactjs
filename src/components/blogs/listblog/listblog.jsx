import Cookies from 'js-cookie';
import React from 'react';
import { Link } from 'react-router-dom';
import Blogreview from '../BlogReview/blogreview';
import './listblog.css'
import { IoCreateOutline } from 'react-icons/io5'

const Listblog = ({Bloglist}) => {
    

    
    const usertype = Cookies.get("usertype")

    return (
        <div className='listblog'>
            <div className="listblog_tocreate">
                <h2>Danh sách Blog</h2>
                {(usertype == 1 || usertype == 3) ?
                    
                    <button>
                        <Link to="/app/blogs/create/" style={{color: "white", fontWeight: "normal"}}>
                            <IoCreateOutline /> Tạo blog
                        </Link>
                    </button>
             : ""}
            
            </div>
            <div className="listblog__content">
                 {Bloglist.map((item, id) => <Blogreview name = {item.name} author={item.author} id={item.id} image={item.imageurl} topic={item.topic} key={id}/> )}
            </div>
           
        </div>
    );
}

export default Listblog;
