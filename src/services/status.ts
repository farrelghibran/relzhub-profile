import { CreateStatusInput, UpdateStatusInput } from "../types/status";

const BASE_URL = "/api/status";

export async function getAllStatus() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch status");
  return res.json();
}

export async function getStatusById(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch status");
  return res.json();
}

export async function createStatus(payload: CreateStatusInput) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create status");
  return res.json();
}

export async function updateStatus(id: number, payload: UpdateStatusInput) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
}

export async function deleteStatus(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete status");
  return res.json();
}
