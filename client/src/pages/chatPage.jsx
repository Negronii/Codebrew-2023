import React, { useEffect, useState } from 'react';
import { Card, List, Avatar, Typography, Input, Button, Row, Col } from 'antd';
import { UserOutlined, SendOutlined, TagOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const dummyData = [
  {
    isMyMessage: false,
    messageContent: 'Hello, how are you?',
  },
  {
    isMyMessage: true,
    messageContent: 'I\'m doing well, thanks for asking!',
  },
  // More message data...
];

const ChatPage = (sessionId) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([ ]);
    const [inputValue, setInputValue] = useState('');
    const { id } = useParams();
    const token = useSelector((state) => state.token);

    const getMessages = async () => {
        try {
            const response = await fetch(`http://localhot:8000/message`, {
              method: "POST",
              headers: { "authorization": `Bearer ${token}`},
              body: {
                "sessionId": id,
              }
            });
            const messages = await response.json();
            setMessages(messages);
          } catch (error) {
            console.log("server error, dev mode");
            setMessages(dummyData);
          }
    }

    useEffect(() => {
        getMessages();
      }, []);
  

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
            dataSource={messages}
            style={{ flexGrow: 1, overflowY: 'auto' }}
            split={false}
            renderItem={(message) => (
                <List.Item>
                <Row
                    style={{
                    width: '100%',
                    justifyContent:
                        message.isMyMessage ? 'flex-end' : 'flex-start',
                    }}
                >
                    <Col>
                    <div
                        style={{
                        background:
                            message.isMyMessage
                            ? '#1890ff'
                            : 'rgba(0, 0, 0, 0.05)',
                        color: message.isMyMessage ? 'white' : 'black',
                        borderRadius: '15px',
                        padding: '8px 12px',
                        margin: '4px',
                        }}
                    >
                        {message.messageContent}
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