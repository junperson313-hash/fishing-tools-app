"use client";

import { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

export default function AffiliateLink({
  href,
  category,
  keyword,
  className,
  children,
}: {
  href: string;
  category: string;
  keyword: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={className}
      onClick={() => trackEvent("affiliate_click", { category, keyword })}
    >
      {children}
    </a>
  );
}
