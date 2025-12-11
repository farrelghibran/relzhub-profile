import { Game } from "./game";

export interface Status {
  id: number;
  title: string;
  color: string;
  Game: Game;
}

export interface UpdateStatusInput {
  title?: string;
  color?: string;
}
export interface CreateStatusInput {
  title: string;
  color: string;
}
