import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_NAME } from "@/lib/site";

const TITLE = "プライバシーポリシー";
const DESCRIPTION = `${SITE_NAME}におけるプライバシーポリシー・広告配信・アクセス解析について説明しています。`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumb items={[{ label: "プライバシーポリシー" }]} />

      <h1 className="mt-2 text-2xl font-bold text-sea-900">{TITLE}</h1>

      <div className="mt-6 space-y-6 text-sm leading-relaxed text-sea-700">
        <section>
          <p>
            {SITE_NAME}（以下「当サイト」）における、個人情報の取り扱いについて説明します。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-sea-900">広告配信について</h2>
          <p className="mt-2">
            当サイトは、第三者配信の広告サービス（Google
            AdSenseなど）を利用する場合があります。このような広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie（クッキー）を使用することがあります。Cookieを無効にする設定や、Googleが使用するCookieの詳細については、
            <a
              href="https://policies.google.com/technologies/ads?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sea-700 underline"
            >
              Google広告ポリシー
            </a>
            をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-sea-900">
            アクセス解析ツールについて
          </h2>
          <p className="mt-2">
            当サイトでは、サイト改善のためにアクセス解析ツールを利用する場合があります。アクセス解析ツールはCookieを利用してデータを収集しますが、個人を特定する情報は含まれません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-sea-900">
            アフィリエイトプログラムについて
          </h2>
          <p className="mt-2">
            当サイトは、Amazonアソシエイト・プログラムをはじめとするアフィリエイトプログラムに参加する場合があります。当サイトを経由して商品が購入された場合、当サイトに紹介料が支払われることがあります。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-sea-900">免責事項</h2>
          <p className="mt-2">
            当サイトに掲載する計算結果・換算値・情報については、可能な限り正確な内容を提供するよう努めていますが、その正確性・完全性を保証するものではありません。当サイトの情報を利用したことによって生じた損害について、当サイトは一切の責任を負いかねます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-sea-900">
            プライバシーポリシーの変更について
          </h2>
          <p className="mt-2">
            当サイトは、必要に応じて本ポリシーの内容を予告なく変更することがあります。変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。
          </p>
        </section>
      </div>
    </div>
  );
}
