import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import Modal from "../Modal";
import InputAdornment from "@mui/material/InputAdornment";
import AddNurse from "../../hooks/AddNurse";

export default function ModalAddNurse(props) {
  const { open, onClose, refresh, setRefresh } = props;
  const { resultAddNurse, sendDataToServer, submitted } = AddNurse();

  const initState = {
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    phoneNumber: "",
    address: "",
    dob: "",
    gender: "",
  };

  const initMessage = {
    status: true,
    message: "",
  };

  const initFormErr = {
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    phoneNumber: "",
    address: "",
    dob: "",
    gender: "",
  };

  const [valueForm, setvalueForm] = useState(initState);
  const [submittedForm, setSubmittedForm] = useState(submitted);
  const [message, setMessage] = useState(initMessage);
  const [formErr, setformErr] = useState(initFormErr);

  const regexName = /^[A-Za-z ]*$/;
  const regexemail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  const regexmotDePasse = /^[A-Za-z0-9]*$/;
  const regexPhone = /^[0-9]{8,12}$/;
  const regexAddress = /^[a-zA-Z0-9\s,'-]*$/;

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "nom") {
      if (regexName.test(value)) {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({ ...formErr, [name]: "Name cannot contain numbers" });
      }
    }

    if (name === "email") {
      if (regexemail.test(value)) {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({ ...formErr, [name]: "Invalid email" });
      }
    }

    if (name === "motDePasse") {
      if (regexmotDePasse.test(value)) {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({ ...formErr, [name]: "Invalid motDePasse" });
      }
    }

    if (name === "phoneNumber") {
      if (regexPhone.test(value)) {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({
          ...formErr,
          [name]: "Phone number must be filled in 11 -12 digits",
        });
      }
    }

    if (name === "address") {
      if (regexAddress.test(value)) {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({ ...formErr, [name]: "Invalid Address" });
      }
    }

    setvalueForm({
      ...valueForm,
      [name]: value,
    });
  };

  const onChangeDate = (newValue) => {
    setvalueForm({
      ...valueForm,
      dob: newValue,
    });
  };

  const onClick = (e) => {
    e.preventDefault();
    if (
      formErr.nom === "" &&
      formErr.email === "" &&
      formErr.motDePasse === "" &&
      formErr.phoneNumber === "" &&
      formErr.address === "" &&
      valueForm.dob !== "" &&
      valueForm.gender !== ""
    ) {
      console.log(valueForm);

      sendDataToServer(valueForm);
      setRefresh(false);
      setSubmittedForm(true);
    }
  };

  useEffect(() => {
    if (submitted === true) {
      onClose();
      setSubmittedForm(false);
      setRefresh(true);
    } /* else {
      setMessage({
        status: false,
        message: resultAddNurse.meta.messages,
      });
    } */
  }, [submitted, submittedForm, refresh, resultAddNurse]);

  return (
    <Modal title="Add Nurse" open={open} onClose={onClose}>
      <form onSubmit={onClick}>
        <div className="my-4">
          <TextField
            {...(formErr.nom !== ""
              ? { error: true, helperText: formErr.nom }
              : null)}
            fullWidth
            required
            id="outlined-basic"
            label="nom"
            name="nom"
            value={valueForm.nom}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>

        <div className="my-4">
          <TextField
            {...(formErr.prenom !== ""
              ? { error: true, helperText: formErr.prenom }
              : null)}
            fullWidth
            required
            id="outlined-basic"
            label="prenom"
            name="prenom"
            value={valueForm.prenom}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>

        <div className="my-4">
          <TextField
            {...(formErr.email !== ""
              ? { error: true, helperText: formErr.email }
              : null)}
            fullWidth
            required
            id="outlined-basic"
            label="Email"
            name="email"
            value={valueForm.email}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="my-4">
          <TextField
            {...(formErr.motDePasse !== ""
              ? { error: true, helperText: formErr.motDePasse }
              : null)}
            fullWidth
            required
            id="outlined-basic"
            label="motDePasse"
            name="motDePasse"
            value={valueForm.motDePasse}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="my-4">
          <TextField
            {...(formErr.phoneNumber !== ""
              ? { error: true, helperText: formErr.phoneNumber }
              : null)}
            fullWidth
            required
            id="outlined-basic"
            label="Phone"
            name="phoneNumber"
            value={valueForm.phoneNumber}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+212</InputAdornment>
              ),
            }}
          />
        </div>
        <div className="my-4">
          <TextField
            {...(formErr.address !== ""
              ? { error: true, helperText: formErr.address }
              : null)}
            fullWidth
            required
            multiline
            rows={2}
            id="outlined-basic"
            label="Address"
            name="address"
            value={valueForm.address}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="my-4">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack>
              <DesktopDatePicker
                label="Date of Birth"
                inputFormat="dd/MM/yyyy"
                name="dob"
                value={valueForm.dob}
                onChange={onChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <div className="my-4">
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
              <FormControlLabel
                onChange={onChange}
                name="gender"
                value="male"
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                onChange={onChange}
                value="female"
                name="gender"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
        </div>
        {/* <div>
          {message.status === false ? (
            <div className="text-red-500 text-sm my-2">{message.message}</div>
          ) : null}
        </div> */}
        <div className="flex flex-col justify-center gap-2 mx-4  md:justify-end md:flex-row">
          <button onSubmit={onClick} className="btn-main btn-primary">
            Submit
          </button>
          <button className="btn-main btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
