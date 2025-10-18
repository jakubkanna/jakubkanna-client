import HTMLReactParser from "html-react-parser/lib/index";
import React from "react";

// Function to render multiple items
export const arrayToHtml = (arr: unknown) => {
  const array = Array.isArray(arr) ? arr : [];

  return array.map((item, index) => (
    <div id={`Additional-${index}`} key={index}>
      {item?.html && HTMLReactParser(item.html)}
    </div>
  ));
};

// Function to render a single item by index
export const renderSingleItem = (arr: unknown, index: number) => {
  const array = Array.isArray(arr) ? arr : [];

  // Check if the index is valid
  if (index < 0 || index >= array.length) {
    return <div>Error: Invalid index</div>;
  }

  const item = array[index];

  return (
    <div id={`Additional-${index}`} key={index}>
      {item?.html && HTMLReactParser(item.html)}
    </div>
  );
};

//
import { parse, HTMLElement } from "node-html-parser";

interface TableHtmlRendererProps {
  html: string;
}

export const TableRenderer: React.FC<TableHtmlRendererProps> = ({ html }) => {
  const root = parse(html);

  return (
    <div>
      {root.childNodes.map((node, index) => {
        if (node instanceof HTMLElement && node.tagName === "TABLE") {
          // Table processing
          const rows = Array.from(node.querySelectorAll("tr")) as HTMLElement[];
          const headerCells = Array.from(
            rows[0]?.querySelectorAll("td, th") || []
          ) as HTMLElement[];
          const linkColumnIndex = headerCells.findIndex(
            (cell) => cell.text.trim().toLowerCase() === "link"
          );

          return (
            <table
              key={index}
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
              border={1}
            >
              <tbody>
                {rows.map((row, rowIndex) => {
                  const cells = Array.from(
                    row.querySelectorAll("td, th")
                  ) as HTMLElement[];
                  const linkCell =
                    linkColumnIndex >= 0 ? cells[linkColumnIndex] : null;
                  const rowLink =
                    linkCell?.querySelector("a")?.getAttribute("href") ||
                    linkCell?.text.trim();

                  return (
                    <tr
                      key={rowIndex}
                      style={{ cursor: rowLink ? "pointer" : "default" }}
                      onClick={() => {
                        if (rowLink) window.open(rowLink, "_blank");
                      }}
                      className={rowLink ? "link" : ""}
                    >
                      {cells.map((cell, cellIndex) => {
                        if (cellIndex === linkColumnIndex) return null; // hide Link column

                        const link = cell.querySelector("a");
                        return (
                          <td key={cellIndex}>
                            {link ? (
                              <a
                                href={link.getAttribute("href") || "#"}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {link.text}
                              </a>
                            ) : (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: cell.innerHTML,
                                }}
                              />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        }

        // Render other HTML normally
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: node.toString() }}
            style={{ marginBottom: "8px" }}
          />
        );
      })}
    </div>
  );
};
