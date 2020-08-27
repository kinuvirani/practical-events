import React, { useState } from 'react';
import {
    Button, Form, Input, notification
} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {userSignIn} from '../../actions/authentication';

const LoginForm = (props) => {
    const [apiCall, setAPICall] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        setAPICall(true);
        try {
            props.userSignIn(values).then(() => {
                props.history.push('/');
            });
        } finally {
            setAPICall(false);
        }
    };

    const gotoRegister = () => {
        props.history.push('/signup');
    };

    return (
        <div>
            <h2 style={{textAlign:'center', padding:"60px 284px 0px 300px"}}>Login Form</h2>
            <div style={{margin:"30px 110px 60px 510px"}}>
                <Form form={form} onFinish={handleSubmit} className="form1">
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

                <Form.Item>
                    <div>
                        <Button type="primary" htmlType="submit" loading={apiCall}>
                            Login
                        </Button>
                        <div className="nav-register"><span>Or </span><a onClick={gotoRegister}>register now</a></div>
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
    return bindActionCreators({userSignIn}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
