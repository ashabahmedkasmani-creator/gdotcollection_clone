import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink: "#17120f", cream: "#faf3ea", plum: "#5b2a4a", rose: "#d9578a" },
    fontFamily: { display: ["Georgia", "'Times New Roman'", "serif"] } } }, plugins: [] } satisfies Config;
