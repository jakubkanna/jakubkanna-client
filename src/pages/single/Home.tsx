import { Helmet } from "react-helmet";
import Layout from "../../components/layout/Layout";

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
      <Layout>
        <main>new homepage</main>
      </Layout>{" "}
    </>
  );
}

export default Homepage;
