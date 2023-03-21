import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './listblog.css'
import { IoCreateOutline } from 'react-icons/io5'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { BaseURLContext } from '../../App';
import Blogreview from '../blogs/BlogReview/blogreview';



const Listblog = () => {
    
    const [Bloglist, setBloglist] = useState([]);
    const BaseURL = useContext(BaseURLContext)
    useEffect(() => {
        console.log(BaseURL);
        fetch(`${BaseURL}api/blogs/`).then(data => data.json()).then(data => { setBloglist(data); })
        return () => {

        };
    }, []);
    
    const usertype = Cookies.get("usertype")

    return (
        <div className='listblog_homepage'>
            
            <div className="listblog__content">
                <Swiper
                    spaceBetween={20}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    navigation={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    slidesPerView={4}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {Bloglist.map((item, id) => <SwiperSlide><Blogreview name = {item.name} author={item.author} id={item.id} image={item.imageurl} topic={item.topic} key={id}/>
                        </SwiperSlide>)}
            </Swiper>
            </div>
           
        </div>
    );
}

export default Listblog;
