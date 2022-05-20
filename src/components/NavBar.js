import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBar = ({user, handleLogout}) => {
    const padding = {
        padding: 5
      }

    return (<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="#" as="span">
                <Link style={padding} to="/">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">Users</Link>
            </Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link href="#" as="span">
                {user
                ? <div style={padding}>
                    <span>Signed in as {user.name} &nbsp; &nbsp;</span>
                    <Button variant="light" onClick={handleLogout}>
                        Logout
                    </Button>
                    </div>
                : <Link style={padding} to="/login">Login</Link>
                }
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    )}

export default NavBar