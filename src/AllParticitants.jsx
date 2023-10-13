import { Box } from '@mui/material'
import React from 'react'

const AllParticitants = () => {
  let [dandiyaParticipants, setDandiyaParticipants] = React.useState(null)

React.useEffect(() => {
  fetch("https://dandiyaevent.onrender.com/api/v1/getallusers")
  .then(response => response.json())

  .then(data => setDandiyaParticipants(data.users))
  console.log(dandiyaParticipants)
},[])
  return (
    <Box style={{display:'flex',flexDirection:'column',gap:'0.5rem'}} width={{xs:'100%',md:'90%'}}>
      <Box className='table' style={{display:'flex',justifyContent:'space-between',textAlign:'left',fontWeight:'600'}}  width={{xs:'100%',md:'90%'}}>
        <p>Name</p>
        <p>Contact</p>
        <p>Address</p>
        <Box width={{xs:'30%',md:'20%'}}>_id</Box>
      </Box>
      {(dandiyaParticipants!==null||undefined)&&
        dandiyaParticipants.map((item,index)=>(
          <Box className='table' style={{display:'flex',justifyContent:'space-between',textAlign:'left'}} width={{xs:'100%',md:'90%'}}>
            <p>{item.Name}</p>
            <p>{item.Contact}</p>
            <p>{item.Address}</p>
            <Box width={{xs:'30%',md:'20%'}}>{item._id}</Box>
          </Box>
        ))
      }
    </Box>
  )
}

export default AllParticitants