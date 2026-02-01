import { useCallback, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import { TableRenderer } from "../hooks/useArrayRender";
import Image from "./media/Image";
import useIsMobile from "../hooks/useIsMobile";
import { createRoot } from "react-dom/client";
import { Link, Link45deg } from "react-bootstrap-icons";

export default function BioTables({ profile }: { profile: ProfileSchema }) {
  const [publicId, setPublicId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const table = profile.additional
    ? (profile.additional[1].html as string)
    : "";

  const onMouseEnter = (_index: number, row: Element) => {
    const publicIdCell = row.querySelector("td:nth-child(4)"); // Target the 4th column for publicId
    if (!publicIdCell) return;

    const rawText = publicIdCell.textContent?.trim();
    const ariaValue =
      publicIdCell
        .querySelector("[aria-label]")
        ?.getAttribute("aria-label")
        ?.trim() || "";
    const newPublicId = rawText || ariaValue;

    if (newPublicId && newPublicId !== "image_publicid") {
      setPublicId(newPublicId);
    }
  };

  const onMouseLeave = () => {}; // No action needed, keep image visible until next hover

  useEffect(() => {
    const rows = containerRef.current?.querySelectorAll("table tr");
    if (!rows?.length) return;

    const handlers: Array<{
      row: Element;
      enter: () => void;
      leave: () => void;
    }> = [];

    rows.forEach((row, index) => {
      if (index === 0) return;
      const enter = () => onMouseEnter(index, row);
      const leave = () => onMouseLeave();
      row.addEventListener("mouseenter", enter);
      row.addEventListener("mouseleave", leave);
      handlers.push({ row, enter, leave });
    });

    return () => {
      handlers.forEach(({ row, enter, leave }) => {
        row.removeEventListener("mouseenter", enter);
        row.removeEventListener("mouseleave", leave);
      });
    };
  }, [table]);

  const renderIcon = (value: string) => {
    const isExternal = value.startsWith("http");
    return isExternal ? (
      <Link45deg className="fs-2 p-1 pb-2" />
    ) : (
      <Link className="fs-2 p-1  pb-2" />
    );
  };

  const processTable = useCallback(() => {
    const tables = containerRef.current?.querySelectorAll("table");

    tables?.forEach((table) => {
      const rows = table.querySelectorAll("tr");
      rows?.forEach((row, index) => {
        // Skip the header row (index 0)
        if (index === 0) return;

        const linkCell = row.querySelector("td:nth-child(5)");
        const linkValue = linkCell?.textContent?.trim();
        if (linkValue) {
          const isExternal = linkValue.startsWith("http");
          const icon = renderIcon(linkValue);
          linkCell!.innerHTML = "";
          const root = createRoot(linkCell!);
          root.render(
            <a href={linkValue} target={isExternal ? "_blank" : "_self"}>
              {icon}
            </a>
          );
        }
      });
    });
  }, []);

  useEffect(() => {
    processTable();
  }, [processTable, profile]);

  return (
    <Col className="border-dark border-top" ref={containerRef}>
      <Container fluid id="Tables">
        <Row>
          <Col className="p-0" md={6}>
            <div className={`border-start border-dark mw-100 overflow-auto `}>
              <TableRenderer html={table} />
            </div>
          </Col>
          {!isMobile && (
            <Col
              md={6}
              className="border-dark border-start border-end px-0 position-relative d-flex flex-column justify-content-center"
            >
              {publicId ? (
                <div
                  className="ratio ratio-4x3"
                  style={{
                    position: "sticky",
                    bottom: "1rem",
                    marginTop: "1rem",
                    top: "1rem",
                  }}
                >
                  <Image
                    imageref={{ public_id: publicId }}
                    className="object-fit-cover w-100 h-100 border-bottom border-top border-dark"
                  />
                </div>
              ) : (
                <p className="text-center font-monospace">
                  {
                    "<= Drag your mouse over one of the links to display an image."
                  }
                </p>
              )}
            </Col>
          )}
        </Row>
      </Container>
    </Col>
  );
}
