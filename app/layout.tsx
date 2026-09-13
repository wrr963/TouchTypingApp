import type { Metadata } from "next";
import { headers } from "next/headers";
import "@mantine/core/styles.css";
import "./globals.css";
import { Providers } from "./providers";

const title = "KEYDRIFT — 知識を鍛えるタイピングラボ";
const description =
  "英語・数字・記号・コードを打ちながら、1〜5分のセッションで速度と知識を同時に鍛えるタッチタイピングトレーナー。";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const origin = host ? protocol + "://" + host : "http://localhost:3000";
  const socialImage = origin + "/og-v2.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: origin,
      images: [{ url: socialImage, width: 1764, height: 923, alt: "KEYDRIFT" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" data-mantine-color-scheme="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
