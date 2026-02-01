import { type CSSProperties, useState } from "react";
import { Link } from "react-router-dom";

const pageStyle: CSSProperties = {
  height: "100%",
  padding: 0,
  margin: "0.25rem",
  width: "auto",
  backgroundColor: "black",
  color: "whitesmoke",
  fontFamily: "Arial, Helvetica, sans-serif",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  borderRadius: "0.5rem",
  overflow: "hidden",
};

const starFieldStyle: CSSProperties = {
  flexGrow: 1,
  position: "relative",
  height: "100%",
  overflow: "hidden",
};

const footerStyle: CSSProperties = {
  padding: "10px",
  display: "flex",
  justifyContent: "flex-end",
  gap: "6px",
  fontSize: "0.5rem",
  color: "grey",
  textTransform: "uppercase",
};

const navWrapperStyle: CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.75rem",
  textAlign: "center",
  zIndex: 1,
};

const navLinkStyle: CSSProperties = {
  color: "inherit",
  textDecoration: "none",
  fontSize: "1.25rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

export default function HomeMain() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const getNavLinkStyle = (key: string): CSSProperties => ({
    ...navLinkStyle,
    fontWeight: 222,
    color: hoveredLink === key ? "black" : navLinkStyle.color,
  });

  return (
    <div style={pageStyle} className="container-fluid p-0">
      <div style={starFieldStyle}>
        <div style={navWrapperStyle}>
          <Link
            to="/"
            style={getNavLinkStyle("home")}
            onMouseEnter={() => setHoveredLink("home")}
            onMouseLeave={() => setHoveredLink(null)}
            onFocus={() => setHoveredLink("home")}
            onBlur={() => setHoveredLink(null)}
          >
            Home
          </Link>
          <Link
            to="/bio"
            style={getNavLinkStyle("bio")}
            onMouseEnter={() => setHoveredLink("bio")}
            onMouseLeave={() => setHoveredLink(null)}
            onFocus={() => setHoveredLink("bio")}
            onBlur={() => setHoveredLink(null)}
          >
            Bio
          </Link>
          <Link
            to="/blog"
            style={getNavLinkStyle("blog")}
            onMouseEnter={() => setHoveredLink("blog")}
            onMouseLeave={() => setHoveredLink(null)}
            onFocus={() => setHoveredLink("blog")}
            onBlur={() => setHoveredLink(null)}
          >
            Blog
          </Link>
          <Link
            to="/works"
            style={getNavLinkStyle("works")}
            onMouseEnter={() => setHoveredLink("works")}
            onMouseLeave={() => setHoveredLink(null)}
            onFocus={() => setHoveredLink("works")}
            onBlur={() => setHoveredLink(null)}
          >
            Artworks
          </Link>
          <Link
            to="/contact"
            style={getNavLinkStyle("contact")}
            onMouseEnter={() => setHoveredLink("contact")}
            onMouseLeave={() => setHoveredLink(null)}
            onFocus={() => setHoveredLink("contact")}
            onBlur={() => setHoveredLink(null)}
          >
            Contact
          </Link>
        </div>
      </div>
      <div style={footerStyle} id="jakubkanna">
        <span>Jakub Kanna</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </div>
  );
}
