import React, {useEffect} from 'react';
import {Button, Layout, Table, Breadcrumb, Input, DatePicker, Form} from 'antd';
import './index.css';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {getEventList} from '../../actions/event';

const { Header, Content, Footer } = Layout;
const { Search } = Input;
const {RangePicker } = DatePicker;

const Dashboard = (props) => {

    useEffect(() => {
        props.getEventList(props.token);
    }, [props.token]);

    const handleLogout = () => {
      localStorage.clear();
      window.location.pathname='/signin';
    };

    const handleSearch = (value) => {
        props.getEventList(props.token, {name: value });
    };

    const dateChange = (value, dateString) => {
        props.getEventList(props.token, {
            start_date: dateString[0],
            end_date:dateString[1],
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Event Date',
            dataIndex: 'event_date',
        },
        {
            title: 'Event Organizer',
            dataIndex: 'user',
        },
    ];

    return(
        <Layout className="layout">
            <Header style={{color:'#fff', fontSize:'20px'}}>
                Event List
                <Button type="primary" style={{position:'absolute',right:'10px', margin:'15px 0'}} onClick={handleLogout} htmlType="submit">
                    Logout
                </Button>
            </Header>
            <Breadcrumb className="breadcrumbs" style={{ margin: "16px 0" }}>
                <div style={{ height: '30px', display: 'flex', right: '20' }}>
                    <Search style={{ width: '20%', marginRight: '10px' }} placeholder="search event by name" onSearch={handleSearch} enterButton />
                    <Form.Item label="Date">
                        <RangePicker
                            onChange={dateChange}
                        />
                    </Form.Item>
                </div>
            </Breadcrumb>
            <Content>
                <Table columns={columns} dataSource={props?.list || []} />;
            </Content>
            <Footer style={{ textAlign: 'center' }}>LoginWind @2020</Footer>
        </Layout>
    )
};

const mapStateToProps = (state) => {
    return ({
        list: state.event.list,
        token: state.user.token,

    })
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getEventList}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
