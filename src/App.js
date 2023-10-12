import './App.css';
import {useRef} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

function App() {
  const nameRef = useRef();
  const contactRef = useRef();
  const addressRef = useRef();

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
        <TextField id="outlined-basic" ref={nameRef} label="Name" variant="outlined" />
        <TextField id="outlined-basic" ref={contactRef} label="Contact" variant="outlined" />
        <TextField id="outlined-basic" ref={addressRef} label="Address" variant="outlined" />
        <Button varient='contained'></Button>
      </Box>
    </div>
  );
}

export default App;
