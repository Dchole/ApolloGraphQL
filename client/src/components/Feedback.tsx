import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

interface IFeedbackProps {
  severity: "success" | "error";
  message: string;
  open: boolean;
  handleClose: () => void;
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
      onClose={handleClose}
      autoHideDuration={2500}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={severity}
        onClose={handleClose}
        style={{ textAlign: "center" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Feedback;
