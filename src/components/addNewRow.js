import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form , Button, Input, Modal } from 'antd';
import { CheckOutlined, LockOutlined } from '@ant-design/icons';

import { addNewRow } from '../redux/actions';

const AddNewRow = ({ isVisible , setIsVisible }) => {
    const dispatch = useDispatch();
    const [ clearForm , setClearForm ] = useState(false);
    const visibleFalse = () => setIsVisible(false);

    const addRowHandler = (data) => {
        dispatch(addNewRow(data));
        visibleFalse();
        setClearForm(v=>!v);
    }

    return (
        <div className="newCandyContainer">
            <Modal visible={isVisible} title="הוסף שורה" onCancel={visibleFalse} footer={[
                <Button form="newCandyForm" key="submit" type="primary" htmlType="submit"> הוסף </Button>,
                <Button key="back" onClick={visibleFalse}> לחזרה </Button>,]}
            >

                <Form key={clearForm} dir="rtl" id="newCandyForm" onFinish={addRowHandler} name="basic">
                    <Form.Item name="key" rules={[{ required: true, message: '!בבקשה הכנס מספר ת.ז', 
                                min: 9 , max: 9 , message: 'תעודת הזהות חייבת להכיל 9 ספרות', },]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="number" placeholder="מספר ת.ז"/>
                    </Form.Item>
                    <Form.Item name="employeeName" rules={[{ required: true, message: '!בבשקה הכנס שם עובד',},]}>
                        <Input prefix={<CheckOutlined className="site-form-item-icon" />} placeholder="שם עובד" />
                    </Form.Item>
                    <Form.Item name="exceptionalHours" rules={[{ required: true, message: '!בבקשה הכנס מספר שעות חריגות',},]}>
                        <Input prefix={<CheckOutlined />} data-address={true} type="number" placeholder="שעות חריגות"/>
                    </Form.Item>
                    <Form.Item name="manualHours" rules={[{ required: true, message: '!בבקשה הכנס שעות ידניות',},]}>
                        <Input prefix={<CheckOutlined />} data-address={true} type="number" placeholder="שעות ידניות"/>
                    </Form.Item>
                    <Form.Item name="hours" rules={[{ required: true, message: '!בבקשה הכנס שעות',},]}>
                        <Input prefix={<CheckOutlined />} data-address={true} type="number" placeholder="שעות"/>
                    </Form.Item>
                    <Form.Item name="totalHours" rules={[{ required: true, message: '!בבקשה הכנס סה"כ שעות',},]}>
                        <Input prefix={<CheckOutlined />} data-address={true} type="number" placeholder="סך הכל שעות"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddNewRow;