import { useContext, useState } from "react";
import { Navbar, Collapse, Button, Row, Col } from "react-bootstrap";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Link } from "react-router-dom";

export default function Footer() {
  const { preferences } = useContext(GeneralContext);
  const artists_name = preferences ? preferences.artists_name : "";

  // State to control the collapse
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Bio", path: "bio" },
    { label: "Projects", path: "projects" },
    { label: "Works", path: "works" },
    { label: "Contact", path: "contact" },
  ];

  return (
    <footer className="container-fluid position-fixed bottom-0 start-0 bg-kanna w-100 border-top border-dark">
      <nav className="d-flex justify-content-between align-items-center">
        <Navbar.Brand className="text-uppercase">
          <Link to={"/"}>{artists_name}</Link>
        </Navbar.Brand>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="CollapseMenu"
          aria-expanded={open}
          className="p-0 flex-grow-1 d-flex justify-content-end"
          variant="link"
        >
          <i className="bi bi-list fs-2 text-dark"></i>
        </Button>
      </nav>

      <Collapse in={open} className="">
        {/* border-top border-dark */}
        <Row id="CollapseMenu">
          {menuItems.map((item, index) => (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="py-5  text-center"
            >
              <Link
                to={item.path}
                onClick={() => setOpen(false)}
                className="fs-3"
              >
                {item.label}
              </Link>
            </Col>
          ))}
        </Row>
      </Collapse>
    </footer>
  );
}
