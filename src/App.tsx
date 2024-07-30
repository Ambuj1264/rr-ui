import { useEffect } from "react";
import './styles/common.css';
import './styles/style-content.css';
import './styles/style-footer.css';
import './styles/responsive.css';
import './styles/style.header.css';
import './styles/style-public.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Router from './router/Router';

function App() {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <>
      <Router />
    </>
  );
}

export default App;
