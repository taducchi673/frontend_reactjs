import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../App';
import './header.css'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom';
import phenikaaLogo from '../../assets/phenikaaLogo.png'
import {HiOutlineLogout} from 'react-icons/hi'

const Header = () => {
    const {state, dispatch} = useContext(LoginContext);
    const [Username, setUsername] = useState("");
    const [Key, setKey] = useState("");
    const [Login, setLogin] = useState(false);
    const [Avatar, setAvatar] = useState("");
    const [UserID, setUserID] = useState("");

    
    useEffect(() => {
        setUsername(Cookies.get("username"))
        return () => {
            
        };
    }, [Cookies.get("username")]);

    useEffect(() => {
        setUserID(Cookies.get("userid"))
        return () => {
            
        };
    }, [Cookies.get("userid")]);
    
    useEffect(() => {
        setLogin(Cookies.get("login"))
        return () => {
        };
    }, [Cookies.get("login")]);

    useEffect(() => {
        setKey(Cookies.get("key"))
        return () => {
            
        };
    }, [Cookies.key]); 

    useEffect(() => {
        setAvatar(Cookies.get("avatar"))
        return () => {
            
        };
    }, [Cookies.avatar]); 


    return (
        <div className="App__header">
            <header>
                <div className="header__top">
                    <Link exact to="/app" >
                        <div className="header__logo">
                            <img src={phenikaaLogo} alt="" />
                            <p>
                                Phenikaa University
                            </p>
                        </div>
                    </Link>
                
                    
                    <div className="header__login">
                        {Login ? <div>

                            <p><b>User: </b><i>
                            {Username}</i></p>
                            <img src={Avatar} alt="" />
                            <p onClick={async ()=>{
                                setLogin(false);
                                await dispatch({"type": "logout"});
                                
                            }}>
                                Đăng xuất 
                            </p><HiOutlineLogout/>
                        </div> : 
                        <div>
                            <Link to="/account">
                                Đăng Nhập/ Đăng Ký
                            </Link>
                            
                        </div>
                        }
                        
                    </div>
                </div>
                <nav className="header__nav">
                    <ul>
                        <li>
                            <Link to="courses">Khoá học</Link>
                        </li>
                        <li>
                            <Link to="teachers">Giảng viên</Link>
                        </li>
                        
                        <li>
                            <Link to="blogs">Bài Viết</Link>
                        </li>
                        <li>
                            <Link to="contact">Liên hệ</Link>
                        </li>
                        <li>
                            <Link to="aboutus">About us</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Header;
