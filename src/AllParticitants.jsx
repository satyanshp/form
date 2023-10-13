import React from 'react'

const AllParticitants = () => {
  let [dandiyaParticipants, setDandiyaParticipants] = React.useState(null)

React.useEffect(() => {
  fetch("https://dandiyaevent.onrender.com/api/v1/getallusers")
  .then(response => response.json())

  .then(data => setDandiyaParticipants(data))
  console.log(dandiyaParticipants)
},[])
  return (
    <div>AllParticitants</div>
  )
}

export default AllParticitants