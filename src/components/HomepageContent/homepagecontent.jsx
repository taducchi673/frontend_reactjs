import React from 'react';
import Listblog from '../listblog/listblog';
import Listcourse from '../listcourse/listcourse';
import Listteacher from '../listteacher/listteacher';
import './homepagecontent.css'
import image from '../../../src/assets/landingpage.jpeg'

const Homepagecontent = () => {
    return (
        <div className='homepage__content'>
                
                <div className="homepage_subcontainer">
                <img src={image} alt="" style={
                    {
                        width: "100%",
                        objectFit: "center"
                       
                    }
                } />
                <br /><br />
                <b>KHÓA HỌC NỔI BẬT</b> <br /> <hr /> <br />
                    <Listcourse style={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    background: "white"
                    }}/> <br /><br />
                <b>BÀI VIẾT NỔI BẬT </b> <br /> <hr /> <br />
                <Listblog style={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    background: "white"
                }} /><br /><br />
                <b>GIẢNG VIÊN NỔI BẬT </b> <br /> <hr /> <br />
                <Listteacher style={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    background: "white"
                }} /><br /><br />
                </div>
            
        </div>
    );
}

export default Homepagecontent;
