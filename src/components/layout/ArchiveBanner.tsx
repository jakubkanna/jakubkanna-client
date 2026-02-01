import { Alert } from "react-bootstrap";

export default function ArchiveBanner() {
  return (
    <Alert
      className="m-0 rounded-0 text-center text-dark "
      style={{
        borderBottom: "1px solid #000",
        borderTop: "1px solid #000",
      }}
      dismissible
    >
      This is archived version of{" "}
      <a href="https://jakubkanna.com">jakubkanna.com</a> 2018-2026
    </Alert>
  );
}
