import React from 'react';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import './ScrollButtons.css';

const ScrollButtons = () => {
    const scrollUp = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollDown = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    return (
        <>
            <button className="scroll-button up" onClick={scrollUp}>
                <UpOutlined />
            </button>
            <button className="scroll-button down" onClick={scrollDown}>
                <DownOutlined />
            </button>
        </>
    );
};

export default ScrollButtons;
