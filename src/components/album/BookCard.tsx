'use client';

interface BookItem {
  id: number;
  title: string;
  coverImage: string;
  date: string;
}

interface BookCardProps {
  book: BookItem;
  onClick: () => void;
}

export default function BookCard({ book, onClick }: BookCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-md overflow-hidden shadow-xl  cursor-pointer hover:scale-[1.05] active:scale-98 transition-all relative aspect-[400/600] w-max max-w-[24vw] min-w-[20vw] flex-shrink-0 group"
    >
      {/* 커스텀 표지 이미지 배경 */}
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-full h-full object-cover"
        draggable={false} // 드래그 방지
      />

      {/* 제목 */}
      <div className="absolute bottom-0 left-0 w-full bg-primary/60 backdrop-blur-sm py-[0.8vh] px-[1vw] text-center pointer-events-none">
        <h4 className="font-cafe24 text-[2vw] text-white truncate">
          {book.title}
        </h4>
      </div>
    </div>
  );
}
