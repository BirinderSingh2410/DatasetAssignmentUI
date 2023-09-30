import React, { useEffect, useState } from "react";
import "./DataPage.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardContents from "../CardContents/CardContents";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import { Box, CardActionArea } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Loader from "../Loader/Loader";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SearchIcon from "@mui/icons-material/Search";

function DataPage() {
  const [drawer, setDrawer] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [loader, setLoader] = useState(false);
  const [info, setInfo] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errormessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const BASE_URL = "http://localhost:8000/dataset/";

  useEffect(() => {
    setLoader(true);
    axios
      .get(BASE_URL + "getdata")
      .then((res) => {
        if (res.data.success) {
          setDataset(res.data.data);
          setLoader(false);
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setLoader(false);
        setErrorAlert(true);
      });
  }, []);

  const searchText = (data) => {
    setLoader(true);
    axios
      .post(BASE_URL + "searchdata", { text: data.text })
      .then((res) => {
        if (res.data.data.length > 0) {
          setDataset(res.data.data);
        } else {
          setInfo(true);
        }
        setLoader(false);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setLoader(false);
        setErrorAlert(true);
      });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseInfo = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setInfo(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorAlert(false);
  };

  return (
    <div>
      <Snackbar open={info} autoHideDuration={5000} onClose={handleCloseInfo}>
        <Alert severity="info">
          Try to search again or change the search text!
        </Alert>
      </Snackbar>

      <Snackbar open={errorAlert} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity="error">{errormessage}</Alert>
      </Snackbar>

      <form className="search-form" onSubmit={handleSubmit(searchText)}>
        <TextField
          label="Search anything from the projects"
          variant="filled"
          {...register("text", { required: true })}
          className="search-input"
        />
        <Button
          disabled={!isValid}
          style={{ height: "100%", alignItems: "center", marginLeft: "10px" }}
          variant="contained"
          startIcon={<SearchIcon />}
          type="submit"
        ></Button>
      </form>

      {loader ? (
        <Loader />
      ) : (
        <Box
          sx={{
            flexWrap: "wrap",
            display: "flex",
            marginTop: "10px",
            justifyContent: "space-evenly",
          }}
        >
          <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <div className="drawer-title">
                <h1>{selectedData["Title"]}</h1>
              </div>
              <div className="close-btn">
                <IconButton onClick={() => setDrawer(false)}>
                  <ClearIcon />
                </IconButton>
              </div>
            </Box>
            <div className="hori-line"></div>
            <CardContents key={1} mainData={selectedData} isdrawer={true} />
          </Drawer>
          {dataset.map((data, index) => (
            <Paper
              elevation={5}
              sx={{ height: "fit-content", margin: "20px", width: "350px" }}
              key={index}
            >
              <Card sx={{ width: "100%" }}>
                <CardActionArea
                  onClick={() => {
                    setDrawer(true);
                    setSelectedData(data);
                  }}
                >
                  <CardContent>
                    <CardContents mainData={data} />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Paper>
          ))}
        </Box>
      )}
    </div>
  );
}

export default DataPage;
