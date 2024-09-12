import Login from "./components/Login";
import BackgroundAnimation from "./components/BackgroundAnimation";
import ImagesLoop from "./components/ImagesLoop";
import DefaultButton from "./components/DefaultButton";
import { Borel } from "next/font/google";

const borel = Borel({
  weight: "400",
  subsets: ["math"],
  variable: "--font-borel",
});

export default async function Home() {
  return (
    <main className="max-w-[1400px] mx-auto h-screen mt-0 bg-zinc-950 flex items-center justify-center">
      <div className="wrapper p-2 z-20 xl:5/6 xl:w-4/6 sm:w-5/6 w-full m-5 bg-zinc-900 flex flex-col gap-2 justify-between rounded-3xl ">
        <div className="middle-part flex sm:flex-row flex-col justify-between">
          <div className="left flex flex-col mx-5 w-full pr-10 sm:w-1/2 lg:w-1/3 justify-between ">
            <div className="upper-text">
              <h1
                className={`title ${borel.variable} mt-6 font-sans italic text-[3.5rem] xl:text-[5rem] text-zinc-200 font-semibold mb-2`}
              >
                tune.in
              </h1>

              <h2 className="subtitle text-zinc-200 w-full text-md">
                Tune in to enjoy a vide variety of new and exciting music -
              </h2>
              <h2 className="mb-20">Not at all tailored to your taste!</h2>
            </div>
            <div className="buttons pb-5 flex flex-col sm:flex-row w-full gap-3">
              <Login />
              <DefaultButton
                icon={"Blog"}
                bgColor="bg-purple-300"
                description="text-black text-sm text-nowrap font-bold xl:text-base xl:px-5 p-2 xl:font-md xl:w-3/5 xl:py-3 rounded-xl"
                href="/blog"
              />
            </div>
          </div>
          <ImagesLoop />
        </div>
      </div>

      <div className="background-wrapper">
        <BackgroundAnimation />
      </div>
    </main>
  );
}
