
import { LockOutlined, UserOutlined,HighlightOutlined,  MailOutlined,TeamOutlined,WomanOutlined,CalendarOutlined,RadarChartOutlined,FontColorsOutlined} from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Select} from 'antd';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { DatePicker, Space } from 'antd';
=======
import { useDispatch } from "react-redux";
import { setLogin } from "state";


const { Option } = Select;
>>>>>>> 49c6ba0 (Last before submit)

export default () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const response = await fetch(`http://localhost:8000/auth/register`, {
              method: "POST",
<<<<<<< HEAD
              body: {
                "first_name": values.first_name,
                "last_name": values.last_name,
=======
              headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify({
                "password": values.password,
                // "latitude": navigator.geolocation.getCurrentPosition(showPosition).coords.latitude,
                // "longitude":navigator.geolocation.getCurrentPosition(showPosition).coords.longitude,
                "first_name": values.firstName,
                "last_name": values.lastName,
>>>>>>> 49c6ba0 (Last before submit)
                "email": values.email,
                "password": values.password,
                "gender": values.gender,
                "type": values.userType,
                "language":values.language,
<<<<<<< HEAD
                "latitude": navigator.geolocation.getCurrentPosition((p)=>{return p.coords.latitude}),
                "longitude":navigator.geolocation.getCurrentPosition((p)=>{return p.coords.longitude}),
                "dob": values.dob,
                "field": ["mental health", "physical health", "social health", "spiritual health"]
              }
            });
=======
                "field": values.field,
                // "dob": values.dob,
                // "field": ["mental health", "physical health", "social health", "spiritual health"]
              })
            })
            const data = await response.json();
            dispatch(
                setLogin({
                    token: data.token,
                })
            );
            navigate("/session");
            // const data = response.json();
            // console.log(data.token)
>>>>>>> 49c6ba0 (Last before submit)
          } catch (error) {
            console.log(error);
          }
    };
    return (
      <>
        <div style={{backgroundColor: "#d9d9d9"}}>
        <div
        style={{
            border: '1px solid #f0f0f0',
            borderRadius: '10px',
            padding: '16px',
            maxWidth: '500px',
            margin: 'auto',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
        }}
        >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }} 
          style={{ marginLeft: '15%', marginRight: '15%' ,marginTop: '15%',marginBottom: '10%' }}
          onFinish={onFinish} 
        >
              {/* <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item> */}

        <Form.Item
            name="firstName"
            rules={[{ required: true, message: 'Please input your First Name!' }]}
        >
            <Input prefix={<HighlightOutlined className="site-form-item-icon" />} placeholder="First Name*" />
        </Form.Item>

        <Form.Item
            name="lastName"
            rules={[{ required: true, message: 'Please input your Second Name!' }]}
        >
            <Input name="lastName" prefix={<HighlightOutlined className="site-form-item-icon" />} placeholder="Last Name*" />
        </Form.Item> 

        <Form.Item
            name="gender"
            rules={[{ required: true, message: 'Please input your Gender!' }]}
        >
            {/* <Input prefix={<WomanOutlined className="site-form-item-icon" />} placeholder="Gender*" list='genderList'/> */}
            <Select
                // prefix={<WomanOutlined className="site-form-item-icon" />}
                placeholder="Gender*"
                // onChange={onGenderChange}
                allowClear
                >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="non-binary">Non-binary</Option>
                <Option value="prefer not to say">Prefer not to say</Option>
            </Select>
            {/* <datalist id="genderList">
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
            </datalist> */}
        </Form.Item> 
{/* 
        <Form.Item
            name="dob"
            rules={[{ required: true, message: 'Please input your Date of Brith int form (dd/mm/yyyy)!' }]}
        >
<<<<<<< HEAD
             {/* <DatePicker format="YYYY-MM-DD"  /> */}
             <Input name="lastName" prefix={<CalendarOutlined className="site-form-item-icon" />} placeholder="Date of Brith (dd/mm/yyyy)" />
        </Form.Item> 
=======
             {/* <DatePicker format="YYYY-MM-DD" onChange={onChange} onOk={onOk} /> */}
        {/* </Form.Item>  */}
>>>>>>> 49c6ba0 (Last before submit)
        
        <Form.Item
            name="userType"
            rules={[{ required: true, message: 'Please input your User Type!' }]}
        >
            {/* <Input prefix={<TeamOutlined className="site-form-item-icon" />} placeholder="User Type* (client/volunteer)" list='userList' />
            <datalist id="userList">
                <option>Client</option>
                <option>Volunteer</option>
            </datalist> */}
            <Select
                // prefix={<WomanOutlined className="site-form-item-icon" />}
                placeholder="User Type*"
                // onChange={onGenderChange}
                allowClear
                >
                <Option value="client">Client</Option>
                <Option value="volunteer">Volunteer</Option>
            </Select>
        </Form.Item> 
        <Form.Item
            name="language"
            rules={[{ required: true, message: 'Please input your Primary Language!' }]}
        >
            <Input prefix={<FontColorsOutlined className="site-form-item-icon" />} placeholder="Primary Language" />
        </Form.Item> 

        <Form.Item
            name="field"
            rules={[{ required: true, message: 'Please input your Field!' }]}
        >
            {/* <Input prefix={<RadarChartOutlined className="site-form-item-icon" />} placeholder="Filed" list='filedList'/>
            <datalist id="filedList">
                <option>mental health</option>
                <option>physical health</option>
                <option>social health</option>
                <option>spiritual health</option>
                <option>sleeping issue</option>
                <option>eating issue</option>
                <option>relationship issue</option>
                <option>family issue</option>
                <option>work issue</option>
                <option>school issue</option>
                <option>other</option>
            </datalist> */}

            <Select
                // prefix={<WomanOutlined className="site-form-item-icon" />}
                placeholder="Field"
                // onChange={onGenderChange}
                allowClear
                >
                <Option value="mental health">mental health</Option>
                <Option value="social health">social health</Option>
            </Select>
        </Form.Item> 



        <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
        >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email*" />
        </Form.Item> 
      
        <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
        >
            <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password*"
            />
        </Form.Item>

        <Form.Item
            name="password_check"
            rules={[{ required: true, message: 'Please input same Password!' }]}
        >
            <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
            />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginRight: '10%'}} >
              Submit
            </Button>
            <span> </span>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginLeft: '10%'}}>
              Cancel
            </Button>
        </Form.Item>
        </Form>
        </div>
        </div>
        </>
    );
  }