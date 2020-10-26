import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

interface IFeedbackProps {
  severity: "success" | "error";
  message: string;
  open: boolean;
  handleClose?: () => void;
}

const Feedback: React.FC<IFeedbackProps> = ({
  message,
  severity,
  open,
  handleClose
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose || undefined}
    >
      <Alert variant="filled" onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Feedback;
