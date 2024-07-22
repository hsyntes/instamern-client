import Button from "../Button";
import Modal from "./Modal";

const AlertDialog = ({ show, message, handleCloseAlertDialog }) => {
  return (
    <Modal show={show} handleCloseModal={handleCloseAlertDialog}>
      <Modal.Header
        handleCloseModal={handleCloseAlertDialog}
        className={"relative"}
      >
        <h6 className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-lg font-semibold">
          Error
        </h6>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center text-sm text-muted dark:text-muted-dark">
          {message}
        </p>
      </Modal.Body>
      <Modal.Footer className={"flex items-center justify-center"}>
        <Button
          type={"button"}
          variant={"link"}
          onClick={handleCloseAlertDialog}
        >
          Got it
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertDialog;
