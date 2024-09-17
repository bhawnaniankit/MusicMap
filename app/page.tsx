import { getServerSession } from "next-auth";
import Appbar from "./components/Appbar";
import { authOptions } from "./lib/auth-option";
import CreateSpace from "./components/CreateSpace";


export default async function Home() {
  const sessionn = await getServerSession(authOptions);
  return (
    <main>
      <Appbar />
      {sessionn?.user && <div>
        <div>Create Space</div>
        <CreateSpace />
      </div>}
      {!sessionn?.user && <div>Landing page</div>}
    </main>
  );
}
