"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const CreateSpace = () => {
  const name = useRef<String>("")
  const router = useRouter()
  return (
    <div>
      <input onChange={(e) => { name.current = e.target.value }} placeholder="Enter name for space" />
      <button onClick={async () => {
        try {
          const res = await axios.post("/api/spaces/create", {
            name: name.current
          })
          console.log(res.data)
          router.push(`/space/${res.data.id}`)
        }
        catch (e) {
          console.log(e);
        }
      }} >Create</button>
    </div>
  )
}

export default CreateSpace
