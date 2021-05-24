import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';

import addRowIcon from '../../styles/images/addRowIcon.jpg';
import AddNewRow from './addNewRow';
import ResponsiveTable from './responsiveTabel';

const TableContainer = () => {
    const [ isVisible , setIsVisible ] = useState(false);

    return (
      <div className="innerContainer">
          <div className="topCandiesEditableTable">
                <Tooltip placement="top" title="Add candy">
                    <img src={addRowIcon} style={{width:'30px'}} onClick={()=>setIsVisible(true)}></img>
                </Tooltip>
          </div>
          <ResponsiveTable/>
          <AddNewRow isVisible={isVisible} setIsVisible={setIsVisible}/>
      </div>
    );
};

export default TableContainer;