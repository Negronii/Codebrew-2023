import { List, Button, Tooltip, Card, Typography } from 'antd';
import { UserOutlined, PlusOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useNavigate } from "react-router-dom";

const sessions = [
  { id: 1, firstName: 'John', lastName: 'wick', avatarUrl: 'https://via.placeholder.com/50', lastMsg: "Hope you well" },
  { id: 2, firstName: 'Jane', lastName: 'Capin', avatarUrl: 'https://via.placeholder.com/50', lastMsg: "Thank you" },
];

const userName="jack"
const userStatus="Online"
const data = [
  {
    friendAvatar: 'https://example.com/avatar1.png',
    friendName: 'John Doe',
    lastMessage: 'Hey, how are you?',
  },
  {
    friendAvatar: 'https://example.com/avatar2.png',
    friendName: 'Jane Smith',
    lastMessage: 'Let\'s catch up soon!',
  },
  // More conversation data...
];

const SessionPage = () => {
  const navigate = useNavigate();
  const navToVolunteer = () => {
    navigate("/volunteer")
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
                  <Typography.Title level={4}>{userName}</Typography.Title>
                  <Typography.Text type="secondary">{userStatus}</Typography.Text>
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
        dataSource={data}
        renderItem={(session) => (
          <List.Item
            onClick={() => navigate("/chat")}
            style={{ cursor: 'pointer' }}
          >
            <List.Item.Meta
              avatar={<Avatar src={session.friendAvatar} icon={<UserOutlined />} />}
              title={<Typography.Text strong>{session.friendName}</Typography.Text>}
              description={session.lastMessage}
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