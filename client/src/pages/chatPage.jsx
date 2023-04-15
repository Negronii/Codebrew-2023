import React, { useState } from 'react';
import { Card, List, Avatar, Typography, Input, Button, Row, Col } from 'antd';
import { UserOutlined, SendOutlined, TagOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const messageData = [
  {
    sender: 'other',
    content: 'Hello, how are you?',
  },
  {
    sender: 'user',
    content: 'I\'m doing well, thanks for asking!',
  },
  // More message data...
];

const ChatPage = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
  

    const handleSendClick = () => {
        console.log('Message sent:', inputValue);
        setInputValue('');
        // Add your logic to send the message
    };

    const onBack = () => {
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
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <Button type="text" icon={<LeftOutlined />} onClick={onBack} />
                <Avatar icon={<UserOutlined />} />
                    <div style={{ marginLeft: '10px' }}>
                        <Typography.Title level={4}>Jack Jackson</Typography.Title>
                        {/* <span>
                            <TagOutlined /> Sleeping issue
                        </span> */}
                    </div>
            </div>
            }
            style={{ flex: 'none' }}
        >
            <List
            itemLayout="horizontal"
            dataSource={messageData}
            style={{ flexGrow: 1, overflowY: 'auto' }}
            split={false}
            renderItem={(item) => (
                <List.Item>
                <Row
                    style={{
                    width: '100%',
                    justifyContent:
                        item.sender === 'user' ? 'flex-end' : 'flex-start',
                    }}
                >
                    <Col>
                    <div
                        style={{
                        background:
                            item.sender === 'user'
                            ? '#1890ff'
                            : 'rgba(0, 0, 0, 0.05)',
                        color: item.sender === 'user' ? 'white' : 'black',
                        borderRadius: '15px',
                        padding: '8px 12px',
                        margin: '4px',
                        }}
                    >
                        {item.content}
                    </div>
                    </Col>
                </Row>
                </List.Item>
            )}
            />

            <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '10px',
            }}
            >
            <Input
                placeholder="Type your message here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onPressEnter={handleSendClick}
                style={{ flex: 1 }}
            />
            <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSendClick}
                style={{ marginLeft: '10px' }}
            />
            </div>
        </Card>
        </div>
        </div>
    );
};

export default ChatPage;