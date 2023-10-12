import './App.css';
import {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

function App() {
  const [nameRef,setNameRef] = useState('');
  const [contactRef,setContactRef] = useState('');
  const [addressRef,setAddressRef] = useState('');

  const [formData,setFormData] = useState({
    Name:'',
    Contact:'',
    Address:''
  })

  const onSubmit=()=>{
    console.log(formData)
  }
  // console.log(formData)
  return (
    <div className="App">
      <Box
        component="form"
        sx={{
          display:'flex',
          flexDirection:'column',
          gap:'2rem',
        }
      }
      width={{xs:'100%',sm:'80%',md:'60%'}}
        autoComplete="off"
      >
        <TextField id="outlined-basic" onChange={(e)=>{setFormData({...formData,Name:e.target.value})}} label="Name" variant="outlined"  />
        <TextField id="outlined-basic" onChange={(e)=>{setFormData({...formData,Contact:e.target.value})}} label="Contact" variant="outlined" />
        <TextField id="outlined-basic" onChange={(e)=>{setFormData({...formData,Address:e.target.value})}} label="Address" variant="outlined" />
        <Button varient='contained' onClick={onSubmit()}>Submit</Button>
      </Box>
    </div>
  );
}

export default App;
