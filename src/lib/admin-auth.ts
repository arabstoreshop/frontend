const KEY = "naseem-admin-ok";
const HASH =
  process.env.NEXT_PUBLIC_ADMIN_PASS_HASH ||
  "3b1cb34d5e991609e4d2daff239e5d5a80d63e5a3e629e4102e6d637f2969d9a";

export async function hashPassword(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function isAdminUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(KEY) === "1";
}

export async function unlockAdmin(password: string): Promise<boolean> {
  const ok = (await hashPassword(password)) === HASH;
  if (ok) sessionStorage.setItem(KEY, "1");
  return ok;
}

export function lockAdmin(): void {
  sessionStorage.removeItem(KEY);
  sessionStorage.removeItem("naseem-admin-key");
}
