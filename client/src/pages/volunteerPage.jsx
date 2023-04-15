import React from 'react';
import { Card, List, Avatar, Typography, Button } from 'antd';
import { UserOutlined, CloseOutlined, TagOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

const DummyVolunteer = [
  {
    _id:"6439fea28029df373¢44bcbd", 
    first_name: "John",
    last_name: "Doe",
    avatar: null,
    overlapped_fields_number: 0,
    distance: "Not available"
  },
  {
    _id:"6439fea28029df373¢44bcbd", 
    first_name: "Jane",
    last_name: "Smith",
    avatar: null,
    overlapped_fields_number: 0,
    distance: "Not available"
  },
  // More volunteer data...
];

const VolunteerPage = () => {
    const navigate = useNavigate();
    const [ volunteers, setVolunteers ] = useState([]);
    const token = useSelector((state) => state.token);
    const onClose = () => {
        navigate("/session");
    }

    const getVolunteers = async () => {
        try {
          const response = await fetch(`http://localhost:8000/user/getUserByFieldandDistance`, {
            method: "POST",
            headers: { "authorization": `Bearer ${token}`},
          });
          const data = await response.json();
          setVolunteers(data);
        } catch (error) {
          console.log("server error, dev mode");
          setVolunteers(DummyVolunteer);
        }
      }
    
      useEffect(() => {
        getVolunteers();
      }, []);

    async function createSession(targetUserId) {
        try {
            const response = await fetch(`http://localhost:8000/message/request`, {
              method: "POST",
              headers: { "authorization": `Bearer ${token}`},
              body: { "targetUserId": targetUserId }
            });
            const data = await response.json();
            navigate(`/chat/${data.session}`)
          } catch (error) {
            console.log("server error, dev mode");
            navigate(`/chat/12`)
          }
    }

    return (
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
            <Card
            title={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography.Title level={3}>Find volunteers</Typography.Title>
                <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
                </div>
            }
            style={{ flex: 'none' }}
            >
            <List
                itemLayout="horizontal"
                dataSource={volunteers}
                renderItem={(volunteer) => (
                <List.Item
                    onClick={() => createSession(volunteer._id)}
                    style={{ cursor: 'pointer' }}
                >
                    <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                     title={
                        <Typography.Text strong>
                        {`${volunteer.first_name} ${volunteer.last_name}` }
                        </Typography.Text>
                    }
                    description="Match: 97%"
                    // {
                    //     // volunteer.tags.map((tag) => (
                    //     // <span key={tag}>
                    //     //     <TagOutlined /> {tag}{' '}
                    //     // </span>
                    //     // ))
                        
                    // }
                    />
                </List.Item>
                )}
            />
            </Card>
        </div>
        </div>
    );
}
    

export default VolunteerPage;