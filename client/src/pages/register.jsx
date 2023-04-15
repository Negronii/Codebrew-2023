
import { LockOutlined, UserOutlined,HighlightOutlined,  MailOutlined,TeamOutlined,WomanOutlined,CalendarOutlined,RadarChartOutlined,FontColorsOutlined} from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default () => {
    const navigate = useNavigate();
    const nav2Login = () => {
      //navigate("/")
    }
  
    // const [visible, setVisible] = useState(false);
    // const [firstName, setFirstName] = useState(null);
    // const [secondName, setLastName] = useState(null);
    // const [username, setUserName] = useState(null);
    // const [password, setPassword] = useState(null);
    // const [email, setEmail] = useState(null);
    // const [value, setValue] = useState('');
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const response = await fetch(`http://localhot:8000/register`, {
              method: "POST",
              body: {

                "email": values.username,
                "password": values.password,
                "latitude": navigator.geolocation.getCurrentPosition(showPosition).coords.latitude,
                "longitude":navigator.geolocation.getCurrentPosition(showPosition).coords.longitude,
                "first_name": values.first_name,
                "last_name": values.last_name,
                "email": values.email,
                "password": values.password,
                "gender": values.gender,
                "type": values.userType,
                "language":values.language,
                "latitude": navigator.geolocation.getCurrentPosition(showPosition).coords.latitude,
                "longitude":navigator.geolocation.getCurrentPosition(showPosition).coords.longitude,
                "dob": values.dob,
                "field": ["mental health", "physical health", "social health", "spiritual health"]
              }
            });
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
              <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>

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
            <Input prefix={<WomanOutlined className="site-form-item-icon" />} placeholder="Gender*" list='genderList'/>
            
            <datalist id="genderList">
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
            </datalist>
        </Form.Item> 

        <Form.Item
            name="dob"
            rules={[{ required: true, message: 'Please input your Date of Brith int form (dd/mm/yyyy)!' }]}
        >
             <DatePicker format="YYYY-MM-DD" onChange={onChange} onOk={onOk} />
        </Form.Item> 
        
        <Form.Item
            name="userType"
            rules={[{ required: true, message: 'Please input your User Type!' }]}
        >
            <Input prefix={<TeamOutlined className="site-form-item-icon" />} placeholder="User Type* (client/volunteer)" list='userList' />
            <datalist id="userList">
                <option>Client</option>
                <option>Volunteer</option>
            </datalist>
        </Form.Item> 
        <Form.Item
            name="language"
            rules={[{ required: true, message: 'Please input your Primary Language!' }]}
        >
            <Input prefix={<FontColorsOutlined className="site-form-item-icon" />} placeholder="Primary Language" />
        </Form.Item> 

        <Form.Item
            name="filed"
            rules={[{ required: true, message: 'Please input your Field!' }]}
        >
            <Input prefix={<RadarChartOutlined className="site-form-item-icon" />} placeholder="Filed" list='filedList'/>
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
            </datalist>
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
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginRight: '10%'}} onClick={nav2Login}>
              Submit
            </Button>
            <span> </span>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginLeft: '10%'}}onClick={nav2Login}>
              Cancel
            </Button>
        </Form.Item>
        </Form>
        </div>
        </div>
        </>
    );
  }