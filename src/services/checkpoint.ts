import {
  CreateCheckpointInput,
  UpdateCheckpointInput,
} from "../types/checkpoint";

const BASE_URL = "/api/checkpoints";

export async function getAllCheckpoints() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch checkpoints");
  return res.json();
}

export async function getCheckpointById(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Checkpoint not found");
  return res.json();
}

export async function getCheckpointByRandom(random: string) {
  const res = await fetch(`${BASE_URL}/random/${random}`);
  if (!res.ok) throw new Error("Checkpoint not found");
  return res.json();
}

export async function createCheckpoint(payload: CreateCheckpointInput) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create checkpoint");
  return res.json();
}

export async function updateCheckpoint(
  id: number,
  payload: UpdateCheckpointInput
) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update checkpoint");
  return res.json();
}

export async function deleteCheckpoint(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete checkpoint");
  return res.json();
}

export async function toggleCheckpointActive(id: number, active: boolean) {
  const res = await fetch(`${BASE_URL}/${id}/active`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ active }),
  });
  if (!res.ok) throw new Error("Failed to toggle checkpoint");
  return res.json();
}
