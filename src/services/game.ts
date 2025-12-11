import { UpdateGameInput, CreateGameInput } from "../types/game";

const BASE_URL = "/api/games";

export async function getAllGames() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch games");
  return res.json();
}

export async function getGameById(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch game");
  return res.json();
}

export async function createGame(payload: CreateGameInput) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create game");
  return res.json();
}

export async function updateGame(id: number, payload: UpdateGameInput) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update game");
  return res.json();
}

export async function deleteGame(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete game");
  return res.json();
}
