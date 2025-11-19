// utils/jwt.ts
export function isTokenNearExpiry(token: string, buffer = 120): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp;
    console.log("exp", exp)
    const now = Math.floor(Date.now() / 1000);
    const timeout = exp - now < buffer;
    console.log("timeout", exp - now)
    return timeout;
  } catch {
    return true;
  }
}
