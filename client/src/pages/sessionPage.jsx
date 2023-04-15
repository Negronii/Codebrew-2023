import { List, Button, Tooltip, Card, Typography } from 'antd';
import { UserOutlined, PlusOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

const dummySessions = [
  { id: 1, firstName: 'John', lastName: 'wick', avatarUrl: 'https://via.placeholder.com/50', lastMsg: "Hope you well" },
  { id: 2, firstName: 'Jane', lastName: 'Capin', avatarUrl: 'https://via.placeholder.com/50', lastMsg: "Thank you" },
];

const SessionPage = () => {
  const navigate = useNavigate();
  // const { user} = useSelector((state) => state.user);
  const user = {
    _id: "id",
    firstName: "Jackie",
    lastName: "Brown"
  }
  const token = useSelector((state) => state.token);
  const [ sessions, setSessions ] = useState([]);

  const navToVolunteer = () => {
    navigate("/volunteer");
  }

  const getSessions = async () => {
    try {
      const response = await fetch(`http://localhot:8000/sessions/${user._id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const sessions = await response.json();
      setSessions(sessions);
    } catch (error) {
      console.log("server error, dev mode");
      setSessions(dummySessions);
    }
    
  }

  useEffect(() => {
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
                  <Typography.Title level={4}>{`${user.firstName} ${user.lastName}`}</Typography.Title>
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
            onClick={() => navigate("/chat")}
            style={{ cursor: 'pointer' }}
          >
            <List.Item.Meta
              avatar={<Avatar src={session.friendAvatar} icon={<UserOutlined />} />}
              title={<Typography.Text strong>{`${session.firstName} ${session.lastName}`}</Typography.Text>}
              description={session.lastMsg}
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