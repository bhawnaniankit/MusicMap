"use client"
import axios from "axios"
import { useRef } from "react"

const CreateSpace = () => {
  const name = useRef<String>("")
  return (
    <div>
      <input onChange={(e) => { name.current = e.target.value }} placeholder="Enter name for space" />
      <button onClick={async () => {
        await axios.post("/api/spaces/create", {
          name: name.current
        })

        console.log("done added")
      }} >Create</button>
    </div>
  )
}

export default CreateSpace
