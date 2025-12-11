export function getCountdownKeys(expiredAt: string | Date) {
  const expired = new Date(expiredAt);

  const now = new Date();
  const diffMs = expired.getTime() - now.getTime();

  if (diffMs <= 0) {
    return "Key Expired!";
  }

  const diffSec = Math.floor(diffMs / 1000);
  const hours = Math.floor(diffSec / 3600);
  const minutes = Math.floor((diffSec % 3600) / 60);
  const seconds = diffSec % 60;

  return `Key will end in ${hours}h ${minutes}m ${seconds}s`;
}
