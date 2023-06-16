import { UserCircle2 } from "lucide-react";

function GPT() {
  return (
    <div className="flex items-center justify-center p-2">
      <p className="flex items-center justify-center space-x-2 text-md md:text-lg text-blue-500 p-2 md:p-4 bg-white shadow-xl rounded-lg w-fit">
        <UserCircle2 className="w-[28px] h-[28px] md:w-[38px] md:h-[38px]" />
        <span>Gpt is summarizing your tasks for the day...</span>
      </p>
    </div>
  );
}

export default GPT;
