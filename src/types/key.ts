export interface Key {
  id: number;
  value: string;
  expired_at?: string;
  created_at?: string;
}
export interface UpdateKeyInput {
  value?: string;
  expired_at?: string;
}
export type CreateKeyInput = Omit<Key, "id">;
