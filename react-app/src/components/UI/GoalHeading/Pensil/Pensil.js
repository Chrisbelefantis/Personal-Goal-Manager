import React from 'react';
import { Icon } from '@iconify/react';
import editOutlined from '@iconify/icons-ant-design/edit-outlined';
import classes from './Pensil.module.css';

const pensil = (props)=>(

    <div className={classes.Pensil} onClick={props.click}>
        <Icon icon={editOutlined} color="#fffd7a" />
   </div>

);



export default pensil;