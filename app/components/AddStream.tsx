"use client"
import React, { useState } from 'react'

const AddStream = ({ params }: { params: { spaceId: string } }) => {
  const [url, setUrl] = useState("")
  return (
    <>
      <input onChange={(e) => { setUrl(e.target.value) }} placeholder="Enter the url to add" />
      <button onClick={async () => {
        const res = await fetch("/api/streams", {
          body: JSON.stringify({
            spaceId: params.spaceId,
            url: url
          }),
          method: "POST"
        })

        const data = await res.json();
        console.log(data)
      }}>Add stream</button>

    </>
  )
}

export default AddStream
