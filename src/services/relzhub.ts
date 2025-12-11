import { UpdateRelzhubInput } from "../types/relzhub";

const BASE_URL = "/api/relzhub";

export async function getAllRelzhubData() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch relzhub data");
  return res.json();
}

export async function updateRelzhubData(
  id: number,
  payload: UpdateRelzhubInput
) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
}
