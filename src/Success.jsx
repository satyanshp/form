import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button,Box } from "@mui/material";
import html2canvas from 'html2canvas';
import ticket from './ticket.jpg'
import done from './done.png'

const Success = () => {
  const location = useLocation();
  const downloadImage = () => {
    const table = document.getElementById('ticket');

    html2canvas(table).then(function (canvas) {
      const link = document.createElement('a');
      link.download = 'ticket.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }
  return (
    <Box className='success' width={{xs:'80%',md:'50%'}}>
      <img src={done} alt="success" style={{width:'100px'}} />
      <h1 style={{color:'green',marginTop:'0'}}>Booking Success!</h1>
      <Box id='ticket'>
        <h1>
          {location.state}
        </h1>
        <img src={ticket} style={{width:'100%'}} alt="Ticket" />
      </Box>
      <Button
            varient="contained"
            onClick={() => {
              downloadImage()
            }}
            sx={{
              color:'#FFF',
              background:'#4AB428',
              textTransform:'none',
              marginTop:'1rem',
              '&:hover':{
                color:'#FFF',
                background:'#4AB428',
              }
            }}
          >
            Download Ticket
          </Button>
    </Box>
  )
}

export default Success