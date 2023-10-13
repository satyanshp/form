import "./App.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Success from "./Success";
import AllParticitants from "./AllParticitants";

function App() {
  const initialState = {
    Name: "",
    Contact: "",
    Address: "",
  };
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const paymentVerification = async (
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    userDetails
  ) => {
    try {
      const { data } = await axios.post(
        `https://dandiyaevent.onrender.com/api/v1/paymentverification`,
        {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          userDetails,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data, "runned");
      navigate("/success", { state: { data } });
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async () => {
    if (
      formData.Name === "" ||
      formData.Contact === "" ||
      formData.Address === ""
    ) {
      return;
    } else {
      console.log(formData);
      const {
        data: { order },
      } = await axios.post(
        `https://dandiyaevent.onrender.com/api/v1/create`,
        {
          totalAmount: 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const options = {
        key: "rzp_test_qQGSf2cwBW0c1g",
        amount: order.amount,
        currency: "INR",
        name: "Dandiya",
        description: "Event App",
        order_id: order.id,
        handler: function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          paymentVerification(
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            formData
          );
        },

        theme: {
          color: "#9c003c",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };

  // console.log(formData)

  return (
    <div className="App">
      <Box component={'nav'}
      fontSize={{xs:'1.2rem',md:'2rem'}}
        sx={{
          marginInline: "auto",
          fontWeight: "700",
          textDecoration: "underline",
          marginBottom: "2.5rem",
          textTransform: "uppercase",
          color: "green",
        }}
      >
        Nav Chetan Mahila Samiti organising Dandiya Nights
      </Box>
      <Routes>
        <Route
          path="/"
          element={
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
              width={{ xs: "100%", sm: "80%", md: "60%" }}
              autoComplete="off"
            >
              <h2 style={{ textTransform: "uppercase" }}>Dandiya Night</h2>
              <TextField
                id="outlined-basic"
                onChange={(e) => {
                  setFormData({ ...formData, Name: e.target.value });
                }}
                label="Name"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                onChange={(e) => {
                  setFormData({ ...formData, Contact: e.target.value });
                }}
                label="Contact"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                onChange={(e) => {
                  setFormData({ ...formData, Address: e.target.value });
                }}
                label="Address"
                variant="outlined"
              />
              <Button
                varient="contained"
                onClick={() => {
                  onSubmit();
                }}
                sx={{
                  color: "#FFF",
                  background: "#4AB428",
                  textTransform: "none",
                  "&:hover": {
                    color: "#FFF",
                    background: "#4AB428",
                  },
                }}
              >
                Pay Rs. 100
              </Button>
            </Box>
          }
        />
        <Route path="/success" element={<Success />} />
        <Route path="/data" element={<AllParticitants />} />
      </Routes>
    </div>
  );
}

export default App;
