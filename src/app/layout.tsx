import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';
import '@/styles/globals.css';

const notoSans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-noto-sans',
});

// 카페 서라운드 파일 연결
const cafe24Ssurround = localFont({
  src: './fonts/Cafe24Ssurround.woff',
  variable: '--font-cafe24',
});

// 로고 파일 연결
const logoFont = localFont({
  src: './fonts/LogoFont.woff',
  variable: '--font-logo',
});

export const metadata: Metadata = {
  title: '동화공작소',
  description: 'AI 기반 참여형 동화 웹앱',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSans.variable} ${cafe24Ssurround.variable} ${logoFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
