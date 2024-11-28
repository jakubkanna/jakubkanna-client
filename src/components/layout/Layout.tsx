import { ReactNode, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Helmet } from "react-helmet";

import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import AnimatedTitle from "../AnimatedTitle";
import { containerTransDuration } from "../../utils/framerMotionVariants";
import { motion } from "framer-motion";

export default function Layout({
  children,
  title,
  description,
  footer,
  header,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
  profile?: ProfileSchema;
  footer?: ReactNode;
  header?: ReactNode;
}) {
  const { preferences } = useContext(GeneralContext);

  const metadata = {
    title: title || preferences?.artists_name || "Untitled",
    description: description,
    name: preferences?.artists_name,
  };

  return (
    <>
      {/* Toggling the content */}
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="author" content={metadata.name} />
      </Helmet>
      {/* Header */}
      {title && (
        <Row
          id="SinglePageHeader"
          className="border-dark border-bottom py-4 bg-light z-1"
        >
          {header || (
            <h1 className="display-1 fw-normal mb-0">
              <AnimatedTitle title={title} />
            </h1>
          )}
        </Row>
      )}

      <motion.div
        initial={{ y: "-100dvh" }} // How to enter
        animate={{ y: 0 }} // Where to start
        exit={{ y: "100dvh" }} // How to exit
        transition={{ duration: containerTransDuration }}
        className="row flex-grow-1"
        onAnimationEndCapture={() => console.log("Animation ended")}
      >
        <Col xs={12}>
          <Row id="SinglePageContent" className="h-100">
            {children}
          </Row>
        </Col>

        {/* Footer */}
        {footer && (
          <Col xs={12} id="SinglePageFooter">
            <Row>{footer}</Row>
          </Col>
        )}
      </motion.div>
    </>
  );
}