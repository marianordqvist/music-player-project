import { auth } from "../../../authconfig";

export default async function UserAvatar() {
  const session = await auth();

  if (!session || !session.user)
    return (
      <div className="bg-zinc-200 inline-block w-10 h-10 p-3 rounded-full text-white ">
        A
      </div>
    );

  const userImage = session.user.image || "";

  return (
    <div>
      <>
        <img
          src={userImage}
          alt="user avatar"
          className="inline-block w-10 h-10 rounded-full"
        />
      </>
    </div>
  );
}
