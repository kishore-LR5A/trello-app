import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function Profile() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" sizes="28"/>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export default Profile;
