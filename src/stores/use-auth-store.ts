import { create } from "zustand";

type AuthUIState = {
  lastAuthMethod: "google" | "credentials" | null;
  setLastAuthMethod: (method: "google" | "credentials") => void;
  rememberEmail: string;
  setRememberEmail: (email: string) => void;
  clearAuthDraft: () => void;
};

export const useAuthStore = create<AuthUIState>((set) => ({
  lastAuthMethod: null,
  rememberEmail: "",
  setLastAuthMethod: (method) => set({ lastAuthMethod: method }),
  setRememberEmail: (email) => set({ rememberEmail: email }),
  clearAuthDraft: () => set({ lastAuthMethod: null, rememberEmail: "" }),
}));
