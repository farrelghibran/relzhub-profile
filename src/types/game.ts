import { Status } from "./status";

export interface Game {
  id: number;
  title: string;
  content: string;
  image: string;
  statusId: number;
  Status: Status;
}

export interface UpdateGameInput {
  title?: string;
  content?: string;
  image?: string;
  statusId?: number;
}
export interface CreateGameInput {
  title: string;
  content: string;
  image: string;
  statusId: number;
}
