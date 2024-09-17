"use client"
import { signIn, signOut, useSession } from "next-auth/react"

const Appbar = () => {
  const session = useSession();

  return (
    <div>
      <div className="flex justify-between">
        <div>
          MusicMap
        </div>
        <div>
          {session.data?.user && <button className="m-2 p-2 bg-blue-400" onClick={() => { signOut() }}>SignOut</button>}
          {!session.data?.user && <button className="m-2 p-2 bg-blue-400" onClick={() => { signIn() }}>SignIn</button>}
        </div>
      </div>
    </div>
  )
}

export default Appbar
