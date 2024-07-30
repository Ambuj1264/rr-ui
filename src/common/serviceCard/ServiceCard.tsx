import React from 'react';
import { Card } from 'react-bootstrap';

interface ServiceCardProps {
    imgSrc: string;
    title: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ imgSrc, title }) => {
    return (
        <Card>
            <Card.Body>
                <img src={imgSrc} alt="img" />
                <div className="caption">
                    <span>{title}</span>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ServiceCard;
