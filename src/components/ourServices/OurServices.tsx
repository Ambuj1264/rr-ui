import React from 'react'
import ServiceSection from './ServiceSection';
import Bannar from '../../common/bannar/Bannar';

const OurServices: React.FC = () => {
    
    return (
        <div>
            <Bannar pageTitle={'Services'} breadcrumbItems={[""]}/>
            <ServiceSection />
        </div>
    )
}

export default OurServices;