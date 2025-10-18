import { useContext, useEffect, useRef } from "react";
import { Col, Container } from "react-bootstrap";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Link } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import { motion } from "framer-motion";
import useIsHome from "../../hooks/useIsHome";
import { menuItems } from "../../configs/menu.config";

export default function Footer({
  setFooterHeight,
}: {
  setFooterHeight: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { preferences } = useContext(GeneralContext);
  const artists_name = preferences?.artists_name || "";
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();
  const footerRef = useRef<HTMLDivElement | null>(null);
  const isHome = useIsHome();

  useEffect(() => {
    if (footerRef.current) {
      const height = footerRef.current.clientHeight;
      if (height) setFooterHeight(height);
    }
  }, [setFooterHeight, isMobile]);

  return (
    <>
      {!isHome && (
        <footer ref={footerRef}>
          <motion.div>
            <Container fluid className="bg-kanna py-5">
              <div
                className="d-grid"
                style={{ gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}
              >
                {menuItems.map((item, index) => (
                  <Link
                    to={item.path}
                    key={index}
                    className="text-center text-uppercase"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </Container>

            <Container fluid className="bg-kanna px-0">
              <Col className="p-4 border-dark d-flex justify-content-center border-top">
                <small style={{ fontSize: "0.75rem" }} className="text-center">
                  © {currentYear} {artists_name}
                </small>
              </Col>
            </Container>
          </motion.div>
        </footer>
      )}
    </>
  );
}
