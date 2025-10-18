import { useContext, useEffect, useRef, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Link } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import { ScrollContext } from "../../contexts/ScrollContext";
import { motion } from "framer-motion";
import useIsHome from "../../hooks/useIsHome";

export default function Footer({
  setFooterHeight,
}: {
  setFooterHeight: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { preferences } = useContext(GeneralContext);
  const artists_name = preferences ? preferences.artists_name : "";
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();
  const footerRef = useRef<HTMLDivElement | null>(null);
  const isBottom = useContext(ScrollContext);
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isHome = useIsHome();
  const menuItems = [
    { label: "Bio", path: "bio" },
    { label: "Blog", path: "blog" },
    { label: "Artworks", path: "works" },
    { label: "Contact", path: "contact" },
  ];

  useEffect(() => {
    if (footerRef.current) {
      const height = footerRef.current.clientHeight;
      if (height) setFooterHeight(height);
    }
  }, [setFooterHeight, isMobile]);

  useEffect(() => {
    if (isBottom) setOpen(true);
    if (!isBottom) setOpen(false);
  }, [isBottom]);

  return (
    !isHome && (
      <footer ref={footerRef}>
        {/* VISIBLE */}

        <motion.div ref={contentRef}>
          <Container fluid className="bg-kanna py-5">
            {/* Right column: two-column grid of links */}

            <div
              className="d-grid"
              style={{
                gridTemplateColumns: "1fr 1fr",
                gap: "0.5rem",
              }}
            >
              {menuItems.map((item, index) => (
                <Link
                  to={item.path}
                  onClick={() => setOpen(false)}
                  key={index}
                  className="text-center text-uppercase"
                  // target={item.blank ? "_blank" : "_self"}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </Container>

          <Container fluid className="bg-kanna px-0">
            <Col className="p-4 border-dark d-flex justify-content-center border-top ">
              <small style={{ fontSize: "0.75rem" }} className="text-center">
                © {currentYear} {artists_name}
              </small>
            </Col>
          </Container>
        </motion.div>
      </footer>
    )
  );
}
