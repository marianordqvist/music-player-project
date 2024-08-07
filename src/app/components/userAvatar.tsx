import { auth } from "../../../authconfig";

export default async function userAvatar() {
  const session = await auth();

  if (!session || !session.user) return null;

  const userImage = session.user.image || "";
  const userName = session.user.name || "";

  return (
    <div>
      <>
        <img src={userImage} alt="user avatar" />
        <p>Hello {userName}!</p>
      </>
    </div>
  );
}
