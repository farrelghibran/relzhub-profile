export async function createContentLocker(destination: string, title: string) {
  const headers = {
    Authorization: `Bearer c1b3fce6d0c8bb4c4beebe98ce6b0d335cc4caad7dd5b9cef23f3ca85c4ea1b5`,
  };
  const data = {
    title: title,
    url: destination,
    tier_id: 3,
    number_of_tasks: 3,
    theme: 5,
  };
  const res = await fetch(
    "https://creators.lootlabs.gg/api/public/content_locker",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) throw new Error("Failed create destination!");
  return res.json();
}
