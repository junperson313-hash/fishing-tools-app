import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

const TITLE = "このサイトについて";
const DESCRIPTION = `${SITE_NAME}の目的と、計算結果の考え方についてまとめています。`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <nav aria-label="パンくずリスト" className="text-xs text-sea-400">
        <a href="/" className="hover:underline">
          トップ
        </a>
        <span className="mx-1">/</span>
        <span>このサイトについて</span>
      </nav>

      <h1 className="mt-2 text-2xl font-bold text-sea-900">{TITLE}</h1>

      <div className="mt-6 space-y-6 text-sm leading-relaxed text-sea-700">
        <section>
          <h2 className="text-lg font-bold text-sea-900">運営の目的</h2>
          <p className="mt-2">
            {SITE_NAME}は、釣りの現場でよく発生する「号数とlbの換算」や「タイラバの重さ選び」といった、地味だけれど毎回悩みがちな計算を、スマートフォンからその場ですぐに確認できるようにするための無料ツール集です。難しい設定は不要で、数値を入力するだけで結果が出るシンプルな作りにしています。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-sea-900">
            計算結果の考え方について
          </h2>
          <p className="mt-2">
            当サイトに掲載している換算値・計算結果は、複数のメーカーや現場でよく参照されている標準的な目安値をもとにしています。ライン強度やタイラバの重さは、メーカー・製品グレード・潮流・水深・船の流し方など多くの要因で変わるため、当サイトの数値が唯一の正解というわけではありません。実際の釣行では、製品パッケージの表示や、船長・ガイドなど現場の判断を優先してください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-sea-900">運営者情報</h2>
          <p className="mt-2">
            当サイトは個人が趣味・情報発信の一環として運営しています。お気づきの点があれば、今後追加予定のお問い合わせ手段よりご連絡ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-sea-900">広告について</h2>
          <p className="mt-2">
            当サイトはサイト運営費用を賄うため、Google
            AdSenseなどの広告配信サービスやAmazonアソシエイト・プログラムなどのアフィリエイトプログラムの利用を予定しています。表示される広告や商品リンクの内容については、各広告配信事業者・提携先の基準に基づいています。
          </p>
        </section>
      </div>
    </div>
  );
}
