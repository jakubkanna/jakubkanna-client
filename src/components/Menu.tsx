import { Modal } from "react-bootstrap";

interface MenuItem {
  [x: string]: unknown;
  label: string;
  path: string;
}

interface MenuProps {
  menuItems: MenuItem[];
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function Menu({ menuItems, open, setOpen }: MenuProps) {
  return (
    <Modal
      show={open}
      onHide={() => setOpen(false)}
      fullscreen
      centered
      animation={false}
      dialogClassName="d-flex justify-content-center align-items-center"
      contentClassName="bg-kanna text-black d-flex flex-column justify-content-center align-items-center"
    >
      <Modal.Header
        closeButton
        className="w-100 border-bottom border-dark justify-content-end"
      />

      <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
        {menuItems.map((item: MenuItem, idx: number) => (
          <a
            key={idx}
            href={item.path}
            className="fs-2 mb-3 text-black "
            onClick={() => setOpen(false)}
            target={item.blank ? "_blank" : "_self"}
          >
            {item.label}
          </a>
        ))}
      </Modal.Body>
    </Modal>
  );
}
