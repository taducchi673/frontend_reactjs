import React from 'react';
import Filter from './filter/filter';
import Listteacher from './listteacher/listteacher';
import './teachers.css'


const Teachers = () => {
    return (
        <div className='teachers'>
            {/* <Filter /> */}
            
            <Listteacher></Listteacher>
            
        </div>
    );
}

export default Teachers;
