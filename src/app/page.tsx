import Login from "./components/Login";
import BackgroundAnimation from "./components/BackgroundAnimation";
import ImagesLoop from "./components/ImagesLoop";
import DefaultButton from "./components/DefaultButton";
import { Borel } from "next/font/google";
import Link from "next/link";

const borel = Borel({
  weight: "400",
  subsets: ["math"],
  variable: "--font-borel",
});

export default async function Home() {
  return (
    <main className="max-w-[1400px] mx-auto mt-0 bg-zinc-950 flex md:mt-20 justify-center">
      <div className="wrapper p-2 z-20 xl:5/6 xl:w-4/6 sm:w-5/6 w-full m-5 bg-zinc-900 flex flex-col gap-2 justify-between rounded-3xl ">
        <div className="middle-part flex md:flex-row flex-col justify-between">
          <div className="left flex flex-col mx-5 w-full pr-10 sm:w-1/2">
            <div className="upper-text">
              <h1
                className={`title ${borel.variable} mt-6 font-sans italic text-[3.5rem] lg:text-[6rem] xl:text-[6rem] pt-5 text-zinc-200 font-semibold mb-2`}
              >
                tune.in
              </h1>

              <h2 className="subtitle text-zinc-200 w-full text-lg">
                Tune in to enjoy a vide variety of new and exciting music -
              </h2>
              <h2 className="mb-10 text-lg">Not at all tailored to your taste!</h2>
            </div>
            <div className="buttons pb-5 flex flex-col sm:flex-row w-full gap-3">
              <Login />
              <Link href="./blog">
                <DefaultButton
                  icon={"Read our blog"}
                  bgColor="bg-purple-300"
                  description="text-black text-sm text-nowrap font-bold xl:text-base xl:px-5 p-4 xl:font-md w-full xl:py-3 rounded-xl"
                />
              </Link>
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
