import Login from "./components/Login";
import BackgroundAnimation from "./components/BackgroundAnimation";

export default async function Home() {
  return (
    <main className="max-w-[1400px] m-auto h-screen mt-0 shadow-lg bg-neutral-900 flex items-center justify-center">
      <div className="wrapper p-10 bg-zinc-950 flex flex-col gap-2 shadow-lg justify-between rounded-3xl w-2/5 h-1/2">
        <div className="flex flex-col gap-2">
          <h1 className="title text-2xl text-zinc-200 font-semibold">Tune in</h1>
          <h2 className="subtitle text-zinc-200 max-w-1/2 text-md">
            Login with your spotify accound and find new interesting music
          </h2>
        </div>
        <Login />
      </div>
      <div className="background-wrapper">
        <BackgroundAnimation />
      </div>
    </main>
  );
}
