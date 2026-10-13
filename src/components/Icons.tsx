const base = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
export const SearchIcon = () => (<svg {...base}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>);
export const HeartIcon = ({ filled = false }: { filled?: boolean }) => (<svg {...base} fill={filled ? "currentColor" : "none"}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>);
export const BagIcon = () => (<svg {...base}><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>);
export const UserIcon = () => (<svg {...base}><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></svg>);
export const CloseIcon = () => (<svg {...base}><path d="M5 5l14 14M19 5 5 19" /></svg>);
export const ArrowIcon = () => (<svg {...base} width={18} height={18}><path d="M7 17 17 7M8 7h9v9" /></svg>);
export const PlusIcon = () => (<svg {...base} width={18} height={18}><path d="M12 5v14M5 12h14" /></svg>);
