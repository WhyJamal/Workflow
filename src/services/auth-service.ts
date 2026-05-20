import { SignUpInput } from "@/lib/auth/schemas";

export async function registerUser(data: SignUpInput) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  return { res, json };
}