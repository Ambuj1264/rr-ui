import { Container, Navbar, NavbarBrand } from 'react-bootstrap';
import NavLogo from './NavLogo';

export default function Header() {
  return (
    <Navbar expand="lg" className='nav-header' fixed="top" id="header">
      <Container>
        <NavbarBrand>
          <NavLogo />
        </NavbarBrand>
      </Container>
    </Navbar>
  );
}
