import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import Header from '../components/Header/Header'
import OurServices from '../components/ourServices/OurServices'
import NotFound from '../components/notFound/NotFound'
import ReservationComponent from '../components/reservationComponent/ReservationComponent'
import Footer from '../components/Footer/Footer'
import ServicesSelection from '../components/birthdayComponent/ServicesSelection'
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<OurServices />} />
          <Route path='/services/:id' element={<ServicesSelection />} />
          <Route path='/reservation/:id' element={<ReservationComponent />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default Router