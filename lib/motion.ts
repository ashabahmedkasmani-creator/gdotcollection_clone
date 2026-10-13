// Shared timing so every section moves with the same rhythm.
export const EASE = [0.22, 1, 0.36, 1] as const; // soft out: reveals, hovers
export const WIPE = [0.76, 0, 0.24, 1] as const; // in-out: clip-path wipes
export const fullRes = (u: string) => u.replace(/-\d+x\d+(\.\w+)$/, "$1");
export const catLabel = (cats: string[]) => (cats.includes("unstitched") ? "Unstitched" : "Stitched");
