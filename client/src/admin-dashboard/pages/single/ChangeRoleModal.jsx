import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { ROLES_ARRAY } from "../../../services/consts";
import { API_URL, doApiMethod } from "../../../services/apiService";
import { toast } from "react-toastify";

export default function ChangeRoleModal(props) {
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState(props.role);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    props.changeRole(event);
    setRole(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="secondary" className="p-2" onClick={handleClickOpen}>
        Change role
      </Button>
      <Dialog fullWidth={true} maxWidth={"xs"} roel={role} open={open} onClose={handleClose}>
        <DialogTitle>Choose user role</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 200 }}>
              <InputLabel htmlFor="max-width">Role</InputLabel>
              <Select
                autoFocus
                value={role}
                onChange={handleMaxWidthChange}
                label="maxWidth"
                inputProps={{
                  name: "max-width",
                  id: "max-width",
                }}
              >
                {ROLES_ARRAY.map((item, idx) => {
                  return (
                    <MenuItem key={idx} value={item}>
                      {item.replaceAll("_", " ")}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
