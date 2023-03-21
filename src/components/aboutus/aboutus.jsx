import React from 'react';
import './aboutus.css'

const Aboutus = () => {
    return (
        <div className='aboutus'>
            <h1>TRƯỜNG ĐẠI HỌC PHENIKAA</h1>
            <h2>KHOA CÔNG NGHỆ THÔNG TIN</h2>
            <p>___________________________</p>
            <br />
            <h2>ĐỒ ÁN MÔN HỌC: Kỹ Thuật Phần Mềm</h2>
            <h3>GVHD: T.S. Mai Xuân Tráng</h3>
            <p>___________________________</p>

            <br />
            <div className="aboutus__content">
                <h3>Thành Viên:</h3>
                <ol>
                    <li>Tạ Đức Chí - MSSV: 21012396</li>
                    <li>Nguyễn Mạnh Cường - MSSV: </li>

                </ol>
                <div className="aboutus__content__div">
                    <h3>Nội dung Website</h3>
                    <p>Website MOOC Elearning cung cấp khoá học trực tuyến</p>
                    <h3>Chức năng Website</h3>
                    <ol>
                        <li>
                            <p>Giáo viên: </p>
                            <ul> 
                                <li>Đăng nhập/ Đăng xuất </li>
                                <li>Xem/ Thêm/ sửa/ xoá/ cập nhật khoá học </li>
                                <li>Xem/ Thêm/ sửa/ xoá/ cập nhật video bài giảng </li>
                                <li>Xem/ Thêm/ sửa/ xoá/ cập nhật đề thi  </li>
                                <li>Xem/ Thêm/ sửa/ xoá/ cập nhật bình luận </li>
                                <li>Xem/ Thêm/ sửa/ xoá/ cập nhật bài vi </li>

                            </ul>

                        </li>
                        <li>
                            <p>
                                Học Sinh/ Sinh Viên
                            </p>
                            <ul>
                                <li>Đăng nhập/ Đăng xuất</li>
                                <li> video (Tối đa 10 lần cho một video)</li>
                                <li> đề thi (Tối đa 1 lần cho một đề thi) </li>
                                <li> bài luyện tập (Không giới hạn số lượng) </li>
                            
                            </ul>
                        </li>
                    </ol>
                </div>
            </div>
            
        </div>
    );
}

export default Aboutus;
