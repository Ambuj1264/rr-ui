import React from 'react';
import Bannar from '../../common/bannar/Bannar';
import BookingForm from './BookingForm';
import { Container } from 'react-bootstrap';


const ReservationComponent: React.FC = () => {
  return (
    <>
      <Bannar pageTitle={'Reservation'} breadcrumbItems={['Reservation']} />
      <div className='birthday_party'>
        <Container>
          <BookingForm/>
        </Container>
      </div>
    </>
  )
}

export default ReservationComponent;