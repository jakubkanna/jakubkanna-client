import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import Layout from "../../components/layout/Layout";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetch";
import useIsMobile from "../../hooks/useIsMobile";
import { Paypal } from "react-bootstrap-icons";
import { useEffect } from "react";

export default function Contact() {
  const { data } = useFetchData<ProfileSchema>("profile/1");
  const isMobile = useIsMobile();

  useEffect(() => {
    // Load Bootstrap Icons CSS dynamically
    const link = document.createElement("link");
    link.href =
      "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  if (!data) return null;

  const { contact } = data;

  return (
    <Layout title="Contact">
      <Col xs={12}>
        <Container
          className={
            isMobile
              ? "h-100 d-flex flex-column py-2 px-0"
              : "border-start border-end border-dark h-100 d-flex flex-column py-2"
          }
        >
          {contact?.map((c, i) => (
            <Row key={i} className={i !== 0 ? "border-top border-dark " : ""}>
              <Col className="py-2">
                <Row>
                  <Col className="fs-3">{c.name}</Col>
                </Row>
                <Row>
                  <Col>{c.email}</Col>
                </Row>
                <Row>
                  <Col className="d-flex flex-wrap gap-2">
                    {c.socialmedia?.map((sm, j) => (
                      <Link
                        key={j}
                        to={sm.profileUrl || "#"}
                        target="_blank"
                        className="d-inline-flex align-items-center text-decoration-none text-dark"
                        style={{
                          gap: "0.25rem",
                          width: "auto",
                        }}
                      >
                        <i className={`bi bi-${sm.platform?.toLowerCase()}`} />
                        <span>{sm.username}</span>
                      </Link>
                    ))}
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}

          <Row className="mt-auto border-top border-dark small">
            <Col className="d-flex align-items-center pt-1">
              {" "}
              <a
                href="https://www.paypal.com/paypalme/jakubkanna"
                target="_blank"
                className="ms-auto d-flex gap-1 align-items-center"
              >
                <Paypal />
                Donate
              </a>
            </Col>
          </Row>
        </Container>
      </Col>
    </Layout>
  );
}
