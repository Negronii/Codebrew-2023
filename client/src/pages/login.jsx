import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const LoginPage = () => {  
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);

        try {
            const response = await fetch(`http://localhot:8000/login`, {
              method: "POST",
              body: {
                "email": values.username,
                "password": values.password,
                "latitude": navigator.geolocation.getCurrentPosition(showPosition).coords.latitude,
                "longitude":navigator.geolocation.getCurrentPosition(showPosition).coords.longitude,
              }
            });
          } catch (error) {
            console.log(error);
          }
    };
    const navigate = useNavigate();
    const nav2Register = () => {
        navigate("/register")
    }
    
    return (

        <div style={{backgroundColor: "#d9d9d9"}}>
            <div
                style={{
                    border: '1px solid #f0f0f0',
                    borderRadius: '10px',
                    margin: '16px 16px',
                    maxWidth: '500px',
                    margin: 'auto',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: "white"
                }}
            >
                <Form
                    form={form}
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }} 
                    style={{ marginLeft: '15%', marginRight: '15%' ,marginTop: '70%'}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button"style={{ marginRight: '10%'}} >
                            Log in
                        </Button>
                        <span> </span>
                        <Button type="primary" htmlType="button" className="login-form-button"style={{ marginRight: '10%'}} onClick={nav2Register}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default LoginPage;
