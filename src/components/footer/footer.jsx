import React from 'react';
import './footer.css'


const Footer = () => {
    return (
        <div className='footer'>
            <h3>Đồ Án Kỹ Thuật Phần Mềm - Phenikaa
                <br /> <br />
                <hr />
            </h3>
            <br />
            
            <div className='footer__content'>
                <div className="footer__webdescription">
                    <h4>Mô tả</h4>
                    Website Đồ Án Môn Học: Kỹ Thuật Phần Mềm.
                    Website sử dụng Backend Framework: DJango và FrontEnd Framework: ReactJS
                </div>
                <div className="footer__thanhvien">
                    <h4>Thành viên</h4>
                    <ol>
                        <li>
                            Tạ Đức Chí - 21012396
                        </li>
                        <li>
                            Nguyễn Mạnh Cường - 
                        </li>
                    </ol>
                </div>
                <div className="footer__design">
                    <h4>Design</h4>
                    <ol>
                        <li>
                            Tạ Đức Chí - 21012396
                        </li>
                        <li>
                            Nguyễn Mạnh Cường
                        </li>
                    </ol>
                </div>
                <div className="footer__backend">
                    <h4>Backend Django</h4>
                    <ol>
                        <li>
                            Tạ Đức Chí - 21012396
                        </li>
                    </ol>
                </div>
                <div className="footer__frontend">
                    <h4>Front ReactJS</h4>
                    <ol>
                        <li>
                            Tạ Đức Chí - 21012396
                        </li>
                    </ol>
                </div>
            </div>
            <hr />
            <div className='footer__copyright'>
            <p>
                Đại Học Phenikaa - Khoa Công nghệ Thông tin -  Copyright by @ChiTaDuc
            </p>
            </div>
        </div>
    );
}

export default Footer;
