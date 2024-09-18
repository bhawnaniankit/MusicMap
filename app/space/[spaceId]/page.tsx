import AddStream from "@/app/components/AddStream";
import { cookies } from 'next/headers'
const Space = async ({ params }: { params: { spaceId: string } }) => {
  let res, data;
  const cookieStore = cookies()
  let sessionTokenCookie = cookieStore.get('next-auth.session-token')
  let sessionToken = sessionTokenCookie?.value;
  try {
    res = await fetch(`http://localhost:3000/api/streams?spaceId=${params.spaceId}`, {
      method: "GET", headers: {
        "Content-Type": "application/json",
        "Cookie": `next-auth.session-token=${sessionToken};path=/;expires=Session`
      },
      cache: 'no-store',
    });
    data = await res.json();
    console.log(data)
  }
  catch (e) {
    console.log(e);
  }

  return (<>
    <div>{params.spaceId}</div>
    <AddStream params={params} />
    <div>{JSON.stringify(data)}</div>
  </>
  )
}

export default Space
