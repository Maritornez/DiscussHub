import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Card } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined  } from '@ant-design/icons';
const { Meta } = Card;

export default function ThreadListCard({ metaTitle, title, description, threadId, themeName, user, onEditModal, onDelete }) {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/theme/${themeName}/thread/${threadId}`);
    };

    const handleEditClick = (e) => {
        e.stopPropagation(); // Остановить всплытие события, чтобы не сработал handleCardClick
        if (onEditModal) {
            onEditModal(threadId);
        }
    };


    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Остановить всплытие события, чтобы не сработал handleCardClick
        if (onDelete) {
            onDelete(threadId);
        }
    };

    return (
        <div style={{ marginBottom: "1rem" }}>
            <Card 
                hoverable onClick={handleCardClick}
                actions={user && (user.userRole === 'moderator' || user.userRole === 'admin') ? [
                    <EditOutlined key="edit" onClick={handleEditClick}/>,
                    <DeleteOutlined key="delete" onClick={handleDeleteClick}/>

                ] : []}
            >
                <Meta
                    avatar={
                        <Avatar
                            shape="circle"
                            icon={<UserOutlined />} 
                        />
                    }
                    title={
                        <div>
                            <div style={{ fontSize: '0.8em', color: 'gray' }}>{metaTitle}</div>
                            <div>{title}</div>
                        </div>
                    }
                    description={description}
                />
            </Card>
        </div>
    )
}
