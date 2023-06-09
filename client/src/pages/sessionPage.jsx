import { List, Button, Tooltip, Card, Typography } from 'antd';
import { UserOutlined, PlusOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

const dummySessions = [
  { 
    firstName: 'John',
    lastName: 'wick',
    avatar: 'https://via.placeholder.com/50',
    sessionId: 1,
    lastMessageContent: "Hope you well" ,
  },
  { 
    firstName: 'Jane',
    lastName: 'Capin',
    avatar: 'https://via.placeholder.com/50',
    sessionId: 2,
    lastMessageContent: "Thank you" ,
  },
];

const SessionPage = () => {
  const navigate = useNavigate();
  // const { user} = useSelector((state) => state.user);
  const [ user, setUser ] = useState([]);
  const token = useSelector((state) => state.token);
  const [ sessions, setSessions ] = useState([]);

  const navToVolunteer = () => {
    navigate("/volunteer");
  }

  const getUser = async () => {
    try {
      console.log(token)
      const response = await fetch(`http://localhost:8000/user/myInfo`, {
        method: "POST",
        headers: { "authorization": `Bearer ${token}`},
      });
      const data = await response.json();
      console.log(data.user)
      setUser(data.user);
    } catch (error) {
      console.log("server error, dev mode");
      // setSessions(dummySessions);
    }
  }

  const getSessions = async () => {
    try {
      const response = await fetch(`http://localhost:8000/message/mySessions`, {
        method: "POST",
        headers: { "authorization": `Bearer ${token}`},
      });
      const data = await response.json();
      console.log(data)
      setSessions(data.sessions);
    } catch (error) {
      console.log(error)
      setSessions(dummySessions);
    }
  }

  useEffect(() => {
    getUser();
    getSessions();
  }, []);
  
  return (
    <div style={{backgroundColor: "#d9d9d9"}}>
      <div
        style={{
          border: '1px solid #f0f0f0',
          borderRadius: '10px',
          padding: '16px',
          maxWidth: '500px',
          margin: 'auto',
          height: "100vh",
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Card
          title={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar icon={<UserOutlined />} />
                <div style={{ marginLeft: '10px' }}>
                  <Typography.Title level={4}>{`${user.first_name} ${user.last_name}`}</Typography.Title>
                  <Typography.Text type="secondary">Online</Typography.Text>
                </div>
              </div>
              <Tooltip title="Find volunteer">
                <Button shape="circle" icon={<PlusOutlined />} onClick={navToVolunteer} />
              </Tooltip>
          </div>
          }
        >
      <List
        itemLayout="horizontal"
        dataSource={sessions}
        renderItem={(session) => (
          <List.Item
            onClick={() => navigate(`/chat/${session.sessionId}`)}
            style={{ cursor: 'pointer' }}
          >
            <List.Item.Meta
              avatar={<Avatar src={session.avatar} icon={<UserOutlined />} />}
              title={<Typography.Text strong>{`${session.firstName} ${session.lastName}`}</Typography.Text>}
              description={session.lastMessageContent}
            />
            <MessageOutlined style={{ fontSize: '20px', marginLeft: 'auto' }} />
          </List.Item>
        )}
      />
    </Card>
  </div>
  </div>
  );
};
export default SessionPage;