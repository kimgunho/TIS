export interface ToDosDef {
  [key: string]: {
    text: string;
    isDone: boolean;
    createAt: Date;
  };
}
