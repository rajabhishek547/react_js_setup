import React from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import snackBarUpdate from '../../actions/snackBarActions'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const useStyles = makeStyles(theme => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function SnackBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { status, message, type } = useSelector((state: any) => state.snackBarReducer);

  const handleClose = () => {
    dispatch(
      snackBarUpdate({
        payload: {
          message: "",
          status: false,
          type: ""
        }
      })
    );
  };
console.log(status, message, type,"status, message, type")
  return (
    <div className={classes.root}>
      <Snackbar open={status} autoHideDuration={6000} onClose={handleClose}>
         <Alert onClose={handleClose}  severity={type || "info"} sx={{ width: '100%' }}>
         {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
