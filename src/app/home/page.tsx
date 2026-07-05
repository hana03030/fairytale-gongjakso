'use client';

import Link from 'next/link';
import Button from '@/components/common/Button';

export default function HomePage() {
  return (
    <main className="w-screen h-screen bg-slate-900 flex flex-col items-center justify-center gap-8">
      <h2 className="text-48 text-white font-cafe24">어디로 가볼까요?</h2>

      <div className="flex gap-4">
        <Link href="/book">
          <Button variant="main" colorType="primary">
            📖 동화책 만들기
          </Button>
        </Link>
        <Link href="/library">
          <Button variant="main" colorType="white">
            📚 내 동화 앨범
          </Button>
        </Link>
      </div>
    </main>
  );
}
