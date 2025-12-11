import { UpdateKeyInput, CreateKeyInput } from "../types/key";

const BASE_URL = "/api/keys";

export async function getAllKeys({
  page = "1",
  search = "",
}: {
  page?: string;
  search?: string;
}) {
  const params = new URLSearchParams({
    page,
    search,
  });
  const res = await fetch(`${BASE_URL}?${params.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch keys");
  return res.json();
}

export async function getKeyById(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch key");
  return res.json();
}

export async function getKeyByValue(value: string) {
  const res = await fetch(`${BASE_URL}/value/${value}`);
  if (!res.ok) throw new Error("Failed to fetch key");
  return res.json();
}

export async function createKey(payload: CreateKeyInput) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create key");
  return res.json();
}

export async function updateKey(id: number, payload: UpdateKeyInput) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update key");
  return res.json();
}

export async function deleteKey(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete key");
  return res.json();
}
