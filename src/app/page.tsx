import { redirect } from "next/navigation";
import { auth } from "../../authconfig";
import Login from "./components/Login";

export default async function Home() {
  const session = await auth();

  // if user is already logged in, they should be redirected to dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main>
      <Login />
    </main>
  );
}
