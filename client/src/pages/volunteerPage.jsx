import React from 'react';
import { Card, List, Avatar, Typography, Button } from 'antd';
import { UserOutlined, CloseOutlined, TagOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const volunteerData = [
  {
    volunteerAvatar: 'https://example.com/avatar1.png',
    volunteerName: 'John Doe',
    tags: ['Tag1', 'Tag2'],
  },
  {
    volunteerAvatar: 'https://example.com/avatar2.png',
    volunteerName: 'Jane Smith',
    tags: ['Tag3', 'Tag4'],
  },
  // More volunteer data...
];

const VolunteerPage = () => {
    const navigate = useNavigate();
    const onClose = () => {
        navigate("/session");
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
                dataSource={volunteerData}
                renderItem={(item) => (
                <List.Item
                    onClick={() => navigate("/chat")}
                    style={{ cursor: 'pointer' }}
                >
                    <List.Item.Meta
                    avatar={<Avatar src={item.volunteerAvatar} icon={<UserOutlined />} />}
                    title={
                        <Typography.Text strong>
                        {item.volunteerName}
                        </Typography.Text>
                    }
                    description={
                        item.tags.map((tag) => (
                        <span key={tag}>
                            <TagOutlined /> {tag}{' '}
                        </span>
                        ))
                    }
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