export interface Checkpoint {
  id: number;
  title: string;
  value: number;
  random: string;
  active: boolean;
  destination?: string;
}
export interface UpdateCheckpointInput {
  title?: string;
  value?: number;
  random?: string;
  active?: boolean;
  destination?: string;
}
export type CreateCheckpointInput = Omit<Checkpoint, "id">;
