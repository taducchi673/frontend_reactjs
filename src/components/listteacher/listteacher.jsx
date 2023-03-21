import Cookies from 'js-cookie';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './listteacher.css'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import Teacherreview from '../teacherreview/teacherreview';
import { BaseURLContext } from '../../App';

const Listteacher = () => {

    const BaseURL = useContext(BaseURLContext)
    const [Listteacher, setListteacher] = useState([]);
    


    useEffect(()=> {
        fetch(`${BaseURL}api/usertypes/1/users/`).then(data=>data.json()).then(data => {setListteacher(data);console.log(data)})
    }, [])

    return (
        <div className='listteacher_homepage'>
            
            <div className="listteacher__content">
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
                    {Listteacher.map((item, id) => <SwiperSlide><Teacherreview name={item.last_name + " " + item.first_name} image={item.imageurl} id={item.id} key={id} /></SwiperSlide>)}
                </Swiper>
            </div>
        </div>
    );
}

export default Listteacher;
