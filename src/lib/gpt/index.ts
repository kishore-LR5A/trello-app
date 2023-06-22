export const fetchSuggestion = async (board: Board) => {
  const todos = formatTodosForGPT(board);
  console.log("formatted todos >> ", todos);
  try {
    const response = await fetch("/api/generateSummary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todos }),
    });
    console.log("response >> ", response);
    const data = await response.json();
    console.log("data >> ", data);
    const { content } = data;
    console.log("content >> ", content);
    return content;
  } catch (error) {
    console.log(error);
  }
  return "";
};

const formatTodosForGPT = (board: Board) => {
  const todos = Array.from(board.columns.entries());

  const flatArray = todos.reduce((map, [key, value]) => {
    map[key] = value.todos;
    return map;
  }, {} as { [key in TypedColumn]: Todo[] });

  // reduce to key:value(length)
  const formattedCounted = Object.entries(flatArray).reduce(
    (map, [key, value]) => {
      map[key as TypedColumn] = value.length;
      return map;
    },
    {} as { [key in TypedColumn]: number }
  );
  return formattedCounted;
};
