import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// @ts-ignore
export default function SidebarLink({ href, children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  const { setOpenMobile } = useSidebar();

  useEffect(() => {
    if (isNavigating && pathname === href) {
      setOpenMobile(false);
      setIsNavigating(false);
    }
  }, [pathname, href, isNavigating, setOpenMobile]);

  const handleClick = () => {
    setIsNavigating(true);
    router.push(href);
  };

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2"
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
