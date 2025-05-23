import { useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Helmet } from "react-helmet";

function Header() {
  const { preferences } = useContext(GeneralContext);

  return (
    <header>
      <Helmet>
        <title>{preferences?.artists_name}</title>
        <meta name="author" content={preferences?.artists_name} />

        {/* Favicons and Icons for Different Platforms */}
        <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicon/android-chrome-512x512.png"
        />

        {/* Optional: Web App Manifest for Android */}
        <link rel="manifest" href="/favicon/site.webmanifest" />

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content={preferences?.artists_name} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="/favicon/android-chrome-512x512.png"
        />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={preferences?.artists_name} />
        <meta
          name="twitter:image"
          content="/favicon/android-chrome-512x512.png"
        />
      </Helmet>
    </header>
  );
}

export default Header;
