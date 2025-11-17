'use client';

import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link'; 
import { usePathname } from 'next/navigation'; 

function AppNavbar() {
  const pathname = usePathname();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand>Project Next.js</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link active={pathname === '/'}>
                <i className="bi bi-house me-2"></i>Home
              </Nav.Link>
            </Link>
            <Link href="/notes" passHref legacyBehavior>
              <Nav.Link active={pathname === '/notes'}>
                <i className="bi bi-journal-text me-2"></i>Catatanku
              </Nav.Link>
            </Link>
            <Link href="/explore" passHref legacyBehavior>
              <Nav.Link active={pathname === '/explore'}>
                <i className="bi bi-search-heart me-2"></i>Explore
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;