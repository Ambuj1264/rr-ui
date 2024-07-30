import React from 'react';
import { Card } from 'react-bootstrap';
import AddButton from '../../../common/addButton/AddButton';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { homePage } from '../../../hooks/query/homePage';
import Loader from '../../../util/loader';

interface ServiceCardProps {
    title: string;
    description: string;
}

const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}

const ServiceCard: React.FC<ServiceCardProps> = () => {
    const { loading, data } = useQuery(homePage)

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/services')
    }
    if (loading) {
        return <Loader />;
    }

    return (
        <Card className="content_serv" data-aos="fade-down">
            {data?.HomePage?.serviceDescription && (
                <Card.Body>
                    <h6 className="sub-title">
                        {truncateText(data?.HomePage?.serviceDescription?.serviceName, 15)}
                    </h6>
                    <h2 className='h2-home'>
                        {truncateText(data?.HomePage?.serviceDescription?.serviceSubheading, 40)}
                    </h2>
                    <p>
                        {truncateText(data?.HomePage?.serviceDescription?.serviceDescription, 40)}
                    </p>

                    <AddButton
                        type="button"
                        onClick={handleClick}
                        className="btn btn_primary btn_services">
                        {truncateText(data?.HomePage?.serviceDescription?.serviceButton, 21)}
                    </AddButton>
                </Card.Body>
            )}
        </Card>
    );
};

export default ServiceCard;
