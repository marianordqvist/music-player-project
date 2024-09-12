import { signIn, auth } from "../../../authconfig";
import { redirect } from "next/navigation";

export default async function login() {
  // if user is already logged in, they should be redirected to dashboard
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("spotify", { redirectTo: "/dashboard" });
        }}
      >
        <button
          className="bg-orange-300 text-sm text-nowrap xl:px-5 text-black font-bold p-2 w-full xl:text-base xl:py-3 rounded-xl"
          type="submit"
        >
          Spotify sign in
        </button>
      </form>
    </>
  );
}
