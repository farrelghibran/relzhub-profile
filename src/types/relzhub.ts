export interface Relzhub {
  id: number;
  loader: string;
  discord_url: string;
  max_steps: number;
}
export interface UpdateRelzhubInput {
  loader?: string;
  discord_url?: string;
  max_steps?: number;
}
