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

const ChatPage = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [opposite, setOpposite] = useState({})
    const [inputValue, setInputValue] = useState('');
    const { id } = useParams();
    const token = useSelector((state) => state.token);

    const getMessages = async () => {
        try {
            const response = await fetch(`http://localhost:8000/message/byId`, {
              method: "POST",
              headers: { "authorization": `Bearer ${token}`},
              body: {
                "sessionId": id,
              }
            });
            const data = await response.json();
            setMessages(data.messages);
            setOpposite(data.otherUser)
            
          } catch (error) {
            console.log(error);
            setMessages(dummyData);
          }
    }

    useEffect(() => {
        getMessages();
        

        // Set up an interval to fetch data every 5 seconds
        const intervalId = setInterval(getMessages, 5000);

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, []);
  

    const handleSendClick = async() => {
        console.log('Sending message', inputValue);
        try {
            const response = await fetch(`http://localhost:8000/message/send`, {
              method: "POST",
              headers: { "authorization": `Bearer ${token}`},
              body: {
                "sessionId": id,
                "content": inputValue
              }
            });
            getMessages()
          } catch (error) {
            console.log("server error, dev mode");
            setMessages([...dummyData, {
                isMyMessage: true,
                messageContent: inputValue,
              }]);
          }
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
                <div style={{ marginLeft: '10px' }}>
                    <Typography.Title level={4}>
                        {`${opposite.first_name} ${opposite.last_name}`}
                    </Typography.Title>
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