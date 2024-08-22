export const getToDoData = (
  toDo: [
    string,
    {
      text: string;
      isDone: boolean;
      createAt: Date;
    }
  ]
) => {
  const key = toDo[0];
  const { text, isDone, createAt } = toDo[1];

  return { key, text, isDone, createAt };
};
