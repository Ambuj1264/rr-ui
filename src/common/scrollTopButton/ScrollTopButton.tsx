import React from 'react';

const ScrollTopButton: React.FC = () => {
    const handleScrollTopClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="scrollTop" onClick={handleScrollTopClick}>
            <i className="bi bi-chevron-up"></i>
        </div>
    );
};

export default ScrollTopButton;
