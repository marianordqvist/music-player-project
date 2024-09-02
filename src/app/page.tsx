import Login from "./components/Login";
import BackgroundAnimation from "./components/BackgroundAnimation";
// import Image from "next/image";
// import image from "../../public/songs-dark-big.png";

export default async function Home() {
  return (
    <main className="max-w-[1400px] m-auto h-screen mt-0 shadow-lg bg-neutral-900 flex items-center justify-center">
      <div className="wrapper p-5 z-20 bg-zinc-950 flex flex-col gap-2 shadow-lg justify-between rounded-3xl ">
        <div className="flex flex-col gap-2">
          <div className="middle-part flex flex-row">
            <div className="left flex flex-col mx-10">
              <h1 className="title text-2xl text-zinc-200 font-semibold mb-2">
                Tune in
              </h1>
              <h2 className="subtitle text-zinc-200 max-w-1/2 text-md">
                Login with your spotify accound and find new interesting music
              </h2>
              <Login />
            </div>

            {/* <Image
              src={image}
              alt="image of cards with different songs"
              className="opacity-50 w-2/4 h-full"
            /> */}
          </div>
        </div>
      </div>

      <div className="background-wrapper">
        <BackgroundAnimation />
      </div>
    </main>
  );
}
