import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import Modal from "./Modal";

const AlertDialog = ({ show, message, handleAlertDialog }) => {
  if (!show) return;

  return (
    <Modal show={show} handleModal={handleAlertDialog}>
      <Modal.Header className={"relative flex items-center justify-center"}>
        <h6 className="text-lg font-semibold">Error</h6>
        <FontAwesomeIcon
          icon={faTimes}
          size="lg"
          className="absolute top-1/2 right-0 -translate-y-1/2 text-muted dark:text-muted-dark hover:text-dark hover:dark:text-white cursor-pointer"
          onClick={handleAlertDialog}
        />
      </Modal.Header>
      <Modal.Body>
        <p className="text-center text-sm text-muted dark:text-muted-dark">
          {message}
        </p>
      </Modal.Body>
      <Modal.Footer className={"flex items-center justify-center"}>
        <Button type={"button"} variant={"link"} onClick={handleAlertDialog}>
          Got it
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertDialog;
