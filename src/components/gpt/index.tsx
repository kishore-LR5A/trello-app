"use client";
import { fetchSuggestion } from "@/lib/gpt";
import { useBoardStore } from "@/store/board-store";
import { UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

function GPT() {
  const [board] = useBoardStore((state) => [state.board]);
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const getSuggestion = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };
    getSuggestion();
  }, [board]);

  return (
    <div className="flex items-center justify-center p-2 md:p-4">
      <p className="flex items-center justify-center space-x-2 text-md md:text-lg text-blue-500 p-2 md:p-4 bg-white shadow-xl rounded-lg w-fit">
        <UserCircle2
          className={`w-[28px] h-[28px] md:w-[38px] md:h-[38px] ${
            loading && "animate-spin"
          }`}
        />
        {suggestion && !loading ? (
          suggestion
        ) : (
          <span>Gpt is summarizing your tasks for the day...</span>
        )}
      </p>
    </div>
  );
}

export default GPT;
