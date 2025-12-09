import { useContext, useState } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Helmet } from "react-helmet";
import { Button, Navbar } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import useIsHome from "../../hooks/useIsHome";
import Menu from "../Menu";
import { menuItems } from "../../configs/menu.config";

function Header() {
  const { preferences } = useContext(GeneralContext);
  const isHome = useIsHome();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className={
          isHome ? "fixed-bottom border-0 bg-transparent" : "sticky-bottom"
        }
      >
        <Helmet>
          <title>{preferences?.artists_name}</title>
          <meta name="author" content={preferences?.artists_name} />

          {/* Favicons */}
          <link rel="icon" href={`${base}favicon/favicon.ico`} type="image/x-icon" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${base}favicon/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${base}favicon/favicon-16x16.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${base}favicon/apple-touch-icon.png`}
          />
          <link rel="manifest" href={`${base}favicon/site.webmanifest`} />

          {/* Open Graph */}
          <meta property="og:title" content={preferences?.artists_name} />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content={`${base}favicon/android-chrome-512x512.png`}
          />
          <meta property="og:url" content={window.location.href} />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={preferences?.artists_name} />
          <meta name="twitter:image" content={`${base}favicon/android-chrome-512x512.png`} />
        </Helmet>

        {isHome ? (
          <div className="d-flex justify-content-center align-items-center pb-3">
            <Button
              className="px-4 py-2 text-uppercase"
              variant="outline-light"
              onClick={() => setOpen(true)}
            >
              Menu
            </Button>
          </div>
        ) : (
          <nav className="d-flex justify-content-between border-bottom border-top border-dark p-2 align-items-center bg-kanna">
            <Navbar.Brand className="text-uppercase">
              <Link to={"/"}>JAKUB KANNA</Link>
            </Navbar.Brand>
            <div className="d-flex gap-4">
              <Button
                className="p-0 flex-grow-1 d-flex justify-content-end"
                variant="link"
                onClick={() => setOpen(true)}
              >
                <List className="fs-1" />
              </Button>
            </div>
          </nav>
        )}
      </header>

      {/* Fullscreen Menu */}
      <Menu
        menuItems={[
          { label: "Home", path: "/" },

          ...menuItems,
          // { label: "Shop", path: "https://shop.jakubkanna.com/", blank: true },
        ]}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

export default Header;
  const base = import.meta.env.BASE_URL || "/";
