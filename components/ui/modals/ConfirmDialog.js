import Button from "../Button";
import Modal from "./Modal";

const ConfirmDialog = ({
  show,
  message,
  handleCloseConfirmDialog,
  handleAcceptConfirm,
}) => {
  return (
    <Modal
      show={show}
      handleCloseModal={handleCloseConfirmDialog}
      className={"lg:!w-1/4"}
    >
      <Modal.Header
        handleCloseModal={handleCloseConfirmDialog}
        className={"relative"}
      >
        <h6 className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-lg font-semibold">
          Confirm
        </h6>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center text-sm text-muted dark:text-muted-dark">
          {message}
        </p>
      </Modal.Body>
      <Modal.Footer className={"flex items-center justify-end gap-3"}>
        <Button
          type={"button"}
          variant={"link"}
          onClick={handleCloseConfirmDialog}
        >
          <span>NO</span>
        </Button>
        <Button
          type={"button"}
          variant={"link"}
          onClick={function () {
            handleAcceptConfirm();
            handleCloseConfirmDialog();
          }}
        >
          <span className="text-danger hover:text-danger-darker transition-all">
            YES
          </span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;
