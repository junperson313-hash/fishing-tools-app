import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const LINKS = [
  { href: "/", label: "トップ" },
  { href: "/tools/pe-line", label: "PEライン換算" },
  { href: "/tools/leader", label: "リーダー換算" },
  { href: "/tools/tairaba", label: "タイラバ重量計算" },
  { href: "/about", label: "このサイトについて" },
  { href: "/privacy", label: "プライバシーポリシー" },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-sea-100 bg-sea-950 text-sea-100">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <nav aria-label="フッターリンク">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-6 text-xs text-sea-300">
          当サイトの計算結果はすべて目安です。実際の釣行では、ラインやルアーに記載の情報、船長・ガイドの指示を優先してください。
        </p>
        <p className="mt-2 text-xs text-sea-400">
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
