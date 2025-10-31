import {
  motion,
  useAnimationFrame,
  useMotionValue,
  type MotionStyle,
} from "framer-motion";
import { type CSSProperties, useEffect, useRef, useState } from "react";

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

const baseLinkStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  textDecoration: "none",
  color: "inherit",
};

const linkStyle: CSSProperties = {
  ...baseLinkStyle,
  backgroundColor: "transparent",
  borderRadius: 0,
  padding: 0,
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

const STAR_WIDTH = 80;
const STAR_HEIGHT = 110;
const STAR_SPEED = 90;

const createVelocity = () => {
  const angle = Math.random() * Math.PI * 2;
  const vx = Math.cos(angle) * STAR_SPEED;
  const vy = Math.sin(angle) * STAR_SPEED;
  return {
    vx: Math.abs(vx) < 15 ? Math.sign(vx || 1) * 30 : vx,
    vy: Math.abs(vy) < 15 ? Math.sign(vy || 1) * 30 : vy,
  };
};

const logoSrc = "/images/exodia_star.svg";

export default function HomeMain() {
  const [hovered, setHovered] = useState(false);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const velocityRef = useRef(createVelocity());
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateBounds = () => {
      const container = containerRef.current;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();
      setBounds({
        width: Math.max(width - STAR_WIDTH, 0),
        height: Math.max(height - STAR_HEIGHT, 0),
      });
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  useEffect(() => {
    if (!bounds.width || !bounds.height) return;
    x.set(bounds.width / 2);
    y.set(bounds.height / 2);
  }, [bounds.height, bounds.width, x, y]);

  useAnimationFrame((_, delta) => {
    if (!bounds.width || !bounds.height) return;

    const deltaSeconds = delta / 1000;
    let nextX = x.get() + velocityRef.current.vx * deltaSeconds;
    let nextY = y.get() + velocityRef.current.vy * deltaSeconds;
    let { vx, vy } = velocityRef.current;

    if (nextX <= 0) {
      nextX = 0;
      vx = Math.abs(vx);
    } else if (nextX >= bounds.width) {
      nextX = bounds.width;
      vx = -Math.abs(vx);
    }

    if (nextY <= 0) {
      nextY = 0;
      vy = Math.abs(vy);
    } else if (nextY >= bounds.height) {
      nextY = bounds.height;
      vy = -Math.abs(vy);
    }

    x.set(nextX);
    y.set(nextY);
    velocityRef.current = { vx, vy };
  });

  const logoImageStyle: CSSProperties = {
    display: "block",
    transition: "filter 160ms ease-in-out",
    filter: hovered
      ? "drop-shadow(0 0 12px var(--kanna-color-alpha, rgba(238, 255, 135, 0.55)))"
      : "none",
  };

  const motionWrapperStyle: MotionStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    display: "inline-flex",
    x,
    y,
  };

  return (
    <div ref={containerRef} style={pageStyle} className="container-fluid p-0">
      <div style={starFieldStyle}>
        <motion.div style={motionWrapperStyle}>
          <a
            href="https://exodia.art"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
          >
            <img
              src={logoSrc}
              alt="Exodia star logo"
              width={60}
              height={60}
              style={logoImageStyle}
            />
          </a>
        </motion.div>
      </div>
      <div style={footerStyle} id="jakubkanna">
        <span>Jakub Kanna</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </div>
  );
}
