import React, { useState } from 'react';
import {
    Button, Form, Input, notification
} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {userSignup} from '../../actions/authentication';
import './index.css';

const RegistrationForm = (props) => {
    const [apiCall, setAPICall] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        const {password, confirm_password} = values;
        if (password !== confirm_password) {
            return notification.error({ message: 'Password does not match' });
        }
        delete values.confirm_password;
        setAPICall(true);
        try {
            props.userSignup(values).then(() => {
                gotoLogin();
            });
        } finally {
            setAPICall(false);
        }
    };

    const gotoLogin = () => {
        props.history.push('/signin');
    };

    return (
        <div>
            <h2 style={{textAlign:'center', padding:"60px 284px 0px 300px"}}>Registration Form</h2>
            <div style={{margin:"30px 110px 60px 510px"}}>
            <Form form={form} onFinish={handleSubmit} className="form1">
                <Form.Item
                    name="firstname"
                    rules={[{ required: true, message: "please enter a firstname"}]}
                >
                    <Input placeholder="Enter a firstname" />
                </Form.Item>
                <Form.Item
                    name="lastname"
                    rules={[{ required: true, message: "please enter a lastname" }]}
                >
                    <Input placeholder="Enter a lastname" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[{ required: true, message:"please enter an email", type: 'email' }]}
                >
                    <Input placeholder="Enter an email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "please enter a password", min: 6 }]}
                >
                    <Input.Password maxLength={10} placeholder="Enter a password" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                </Form.Item>
                <Form.Item
                    name="confirm_password"
                    rules={[{ required: true, message: "please confirm a password",  min: 6 }]}
                >
                    <Input.Password placeholder="Confirm a password" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                </Form.Item>

                <Form.Item>
                    <div>
                        <Button type="primary" htmlType="submit" loading={apiCall}>
                            Register
                        </Button>
                        <div className="nav-register"><span>Or </span><a onClick={gotoLogin}>login now</a></div>
                    </div>
                </Form.Item>
            </Form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return ({
        users: state.user
    })
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({userSignup}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationForm));
