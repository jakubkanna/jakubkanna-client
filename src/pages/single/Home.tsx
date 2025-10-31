import { Helmet } from "react-helmet";
import HomeMain from "../../components/Homepage/HomeMain_exodia_v1";

function Homepage() {
  return (
    <>
      <Helmet>
        <title>JAKUB KANNA</title>
        <meta
          name="description"
          content="Interdisciplinary artist, born in 1996 in Mrągowo (northeastern Poland). His practice blurs the boundaries between art, sport, and technology."
        />
        <meta name="author" content="JAKUB KANNA" />
      </Helmet>
      <HomeMain />
    </>
  );
}

export default Homepage;
