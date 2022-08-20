import {Cards} from "./cards";

export interface Home {
  error: boolean;
  message: string;
  todoList: Cards[],
  doingList: Cards[],
  doneList: Cards[]
}
