import './App.css';
import {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';

function App() {
  const [nameRef,setNameRef] = useState('');
  const [contactRef,setContactRef] = useState('');
  const [addressRef,setAddressRef] = useState('');

  const [formData,setFormData] = useState({
    Name:'',
    Contact:'',
    Address:''
  })

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
       console.log(data);
     } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async () => {
    
    console.log(formData)
    const {
      data: { order},
    } = await axios.post(
      `http://localhost:8000/api/v1/create`,
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
        key: "rzp_test_ctqZo5qbJkPhmO",
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
      <Routes>
        <Route path="/" element={
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
          <h2 style={{textTransform:'uppercase'}}>Dandiya Night</h2>
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
              color:'#FFF',
              background:'#4AB428',
              textTransform:'none',
              '&:hover':{
                color:'#FFF',
                background:'#4AB428',
              }
            }}
          >
            Pay Rs. 100
          </Button>
        </Box>
        }/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/data" element={<AllParticitants/>}/>
      </Routes>
    </div>
  );
}

export default App;
