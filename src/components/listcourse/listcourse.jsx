import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./listcourse.css"
import {IoMdCreate} from 'react-icons/io'
import Coursereview from '../coursereview/coursereview';
import { BaseURLContext } from '../../App';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

const Listcourse = () => {

    const BaseURL = useContext(BaseURLContext)
    const [coursesList, setcoursesList] = useState([]);

    useEffect(() => {
        fetch(`${BaseURL}api/courses/`).then(data => data.json()).then(data => { setcoursesList(data); })
        return () => {

        };
    }, []);

    const [usertype, setUsertype] = useState(Cookies.get("usertype"))

    return (
        <div className='listcoursehomepage'>
           
            <div className="listcourse__content">
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
               
                
                    {coursesList.map((item, id) => <SwiperSlide><Coursereview style={{ margin: "20px" }} image={item.imageurl} name={item.name} id={item.id} teacher={item.teacher} key={id} />     </SwiperSlide>)}
                </Swiper>
            </div>
        </div>
    );
}

export default Listcourse;
