import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/config";

export default function Logo({ chip = false, className = "" }: { chip?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label={`${BRAND.name} home`} className={`inline-flex items-center ${chip ? "rounded-full bg-white px-4 py-1.5" : ""} ${className}`}>
      <Image src={BRAND.logo} alt={BRAND.name} width={120} height={40} priority className="h-8 w-auto sm:h-9" />
    </Link>
  );
}
