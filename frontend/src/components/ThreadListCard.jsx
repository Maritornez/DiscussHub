import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Card, Image, Tooltip } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import RatingService from '../api/RatingService';
const { Meta } = Card;

export default function ThreadListCard({ metaTitle, title, description, threadId, themeName, image, user, onEditModal, onDelete, updateAllThreads }) {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    useEffect(() => {
        const fetchRatings = async () => {
            const likesCount = await RatingService.getPositivesCountByThreadId(threadId);
            setLikes(likesCount);
            const dislikesCount = await RatingService.getNegativesCountByThreadId(threadId);
            setDislikes(dislikesCount);
        };

        fetchRatings();
    }, [threadId])
    
    const handleLikeClick = (e) => {
        e.stopPropagation(); // Остановить всплытие события, чтобы не сработал handleCardClick
        if (user && user.isAuthenticated) {
            RatingService.addRating(threadId, user.id, true)
            updateAllThreads()
        } else {
            alert("Вы должны войти в систему, чтобы ставить лайки.");
        }
    }

    const handleDislikeClick = (e) => {
        e.stopPropagation(); // Остановить всплытие события, чтобы не сработал handleCardClick
        if (user && user.isAuthenticated) {
            RatingService.addRating(threadId, user.id, false)
            updateAllThreads()
        } else {
            alert("Вы должны войти в систему, чтобы ставить дизлайки.");
        }
    }

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


    let actionsArray = [
            <span><LikeOutlined key='like' onClick={handleLikeClick}/> {likes}</span>,
            <span><DislikeOutlined key='dislike' onClick={handleDislikeClick}/> {dislikes}</span>
    ];
        
    if (user && (user.userRole === 'moderator' || user.userRole === 'admin')) {
        actionsArray.push(
            <EditOutlined key="edit" onClick={handleEditClick}/>,
            <DeleteOutlined key="delete" onClick={handleDeleteClick}/>
        );
    }

    return (
        <div style={{ marginBottom: "1rem" }}>
            <Card 
                hoverable onClick={handleCardClick}
                actions={actionsArray}
                style={{background: "#f2f2f2"}}
            >
                <Meta
                    title={
                        <div>
                            <div style={{ fontSize: '0.8em', color: 'gray' }}>{metaTitle}</div>
                            <div>{title}</div>
                        </div>
                    }
                    description={
                        <div style={{ display: 'flex', justifyContent: 'left', margin: '0px' }}>
                            <div> {image && <Image src={image} alt={`Image`} width={400}/>} </div>
                            <div style={{ margin: '0 20px', whiteSpace: 'pre-wrap' }}>{description}</div>
                        </div>
                    }
                />
            </Card>
        </div>
    )
}
