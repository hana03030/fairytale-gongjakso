'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import CloseButton from '@/components/common/CloseButton';
import NextButton from '@/components/book/NextButton';

type DrawingEvent =
  | React.MouseEvent<HTMLCanvasElement>
  | React.TouchEvent<HTMLCanvasElement>;

export default function BookCanvasPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const theme = searchParams.get('theme') || 'ocean';
  const character = searchParams.get('character') || '인어공주,왕자';
  const style = searchParams.get('style') || 'watercolor';
  const bookTitle = searchParams.get('title') || '나만의 동화책';

  // 도구 및 색상 상태 관리
  const [tool, setTool] = useState<'pen' | 'eraser' | 'paint'>('pen');
  const [color, setColor] = useState<string>('#FF5252');

  // 펜 굵기와 지우개 굵기 따로 관리
  const [penSize, setPenSize] = useState<number>(8);
  const [eraserSize, setEraserSize] = useState<number>(15);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);

  // 팔레트 색상별 이미지 경로 배열
  const PALETTE_COLORS = [
    { code: '#FF5252', img: '/images/palette/color-red.png' },
    { code: '#FFB74D', img: '/images/palette/color-orange.png' },
    { code: '#FFF176', img: '/images/palette/color-yellow.png' },
    { code: '#81C784', img: '/images/palette/color-green.png' },
    { code: '#64B5F6', img: '/images/palette/color-blue.png' },
    { code: '#4DD0E1', img: '/images/palette/color-skyblue.png' },
    { code: '#9575CD', img: '/images/palette/color-purple.png' },
    { code: '#F48FB1', img: '/images/palette/color-pink.png' },
    { code: '#212121', img: '/images/palette/color-black.png' },
  ];

  // 현재 선택된 툴의 굵기를 반환하는 함수
  const currentBrushSize = tool === 'eraser' ? eraserSize : penSize;

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getCoordinates = (e: DrawingEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    const mouseEvent = e as React.MouseEvent<HTMLCanvasElement>;
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top,
    };
  };

  const startDrawing = (e: DrawingEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);

    if (tool === 'paint') {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    isDrawingRef.current = true;
    ctx.beginPath();
    ctx.moveTo(x, y);

    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
    ctx.lineWidth = currentBrushSize;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const draw = (e: DrawingEvent) => {
    if (!isDrawingRef.current || tool === 'paint' || !canvasRef.current) return;
    e.preventDefault();

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const handleClearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSaveCover = () => {
    if (!canvasRef.current) return;

    // 캔버스 그린 내용을 문자열(Base64)로 추출
    const coverImageData = canvasRef.current.toDataURL('image/png');

    // 앨범에 저장할 하나의 책 데이터 객체 만들기
    const newBook = {
      id: Date.now(), // 고유 ID용 타임스탬프
      title: bookTitle,
      coverImage: coverImageData,
      theme: theme,
      character: character,
      style: style,
      date: new Date().toLocaleDateString(),
      // 테스트용 더미 본문 세팅
      stories: [
        '맑고 푸른 바다 속, 끝없이 펼쳐진 수평선 너머에는 돌고래들이 자유롭게 헤엄치며 살아가고 있었어요.',
        '그 중에서도 가장 빠르고 용감한 돌고래는 돌돌이와 아리아였죠.',
        '어느 날, 바다 저편에서 거대한 폭풍우가 몰아치기 시작했어요.',
        '돌돌이와 아리아는 친구들을 안전한 동굴로 대피시키기 위해 헤엄쳤습니다.',
        '마침내 폭풍우가 지나가고, 바다에는 다시 아름다운 평화가 찾아왔답니다.',
      ],
    };

    // 기존 내역 가져와서 합친 후 다시 저장하기
    const existingBooksRaw = localStorage.getItem('fairytale_album');
    const existingBooks = existingBooksRaw ? JSON.parse(existingBooksRaw) : [];

    // 최신작이 맨 앞에 오도록 추가
    localStorage.setItem(
      'fairytale_album',
      JSON.stringify([newBook, ...existingBooks]),
    );

    // 기존 이미지 다운로드 코드 유지
    // const link = document.createElement('a');
    // link.href = coverImageData;
    // link.download = `${bookTitle}_표지.png`;
    // link.click();

    alert('나만의 동화책이 동화 앨범 보관함에 등록되었습니다!');
    router.push('/album'); // 앨범 페이지로 이동
  };

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#E0F2F1] flex items-center justify-between px-[5vw] relative select-none">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/main-bg.png"
          alt="동화공작소 메인 배경"
          fill // 채우기
          priority // 빠르게 로딩
          className="object-cover" // 비율 유지
        />
      </div>

      {/* 왼쪽 상단 아이콘 영역 */}
      <div className="absolute top-[4vh] left-[4vw] z-30 flex gap-4 items-center">
        <button
          onClick={() =>
            router.push(
              `/book/title?theme=${theme}&character=${character}&style=${style}`,
            )
          }
          className="bg-white font-cafe24 text-[1.2vw] px-8 py-3 rounded-full hover:scale-105 transition-all text-primary cursor-pointer shadow-md"
        >
          제목 다시 짓기
        </button>
      </div>

      {/* 오른쪽 상단 아이콘 영역 */}
      <div className="absolute top-[4vh] right-[4vw] z-30 flex gap-4 items-center">
        <CloseButton onClick={() => router.push('/home')} size={50} />
      </div>

      {/* 팔레트, 이젤, 도구함 정렬용 */}
      <div className="flex justify-center items-center m-auto gap-10 md:gap-10 sm:gap-2">
        {/* 왼쪽 팔레트 영역 */}
        <div className="w-[16vw] bg-[#FFF8D3] rounded-[48px] px-8 py-12 flex flex-wrap justify-center shadow-xl z-10">
          <div className="grid grid-cols-2 gap-[2vw] w-full justify-items-center">
            {PALETTE_COLORS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setColor(item.code);
                  if (tool === 'eraser') setTool('pen');
                }}
                className={`w-full max-w-[90px] aspect-square rounded-full transition-all cursor-pointer relative ${
                  color === item.code && tool !== 'eraser'
                    ? 'scale-115 drop-shadow-lg ring-4 ring-white/80'
                    : ''
                }`}
              >
                <Image
                  src={item.img}
                  alt="색상 칩"
                  fill
                  className="object-contain"
                  draggable={false}
                />
              </button>
            ))}

            {/* 컬러 피커 버튼 */}
            <label
              className={`w-full max-w-[90px] aspect-square rounded-full flex items-center justify-center cursor-pointer transition-all relative ${
                tool !== 'eraser' &&
                !PALETTE_COLORS.some((p) => p.code === color)
                  ? 'scale-110 ring-4 ring-slate-600/20'
                  : ''
              }`}
            >
              <Image
                src="/images/palette/color-rainbow.png"
                alt="무지개 색 고르기"
                fill
                className="object-contain"
                draggable={false}
              />
              <input
                type="color"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                  if (tool === 'eraser') setTool('pen');
                }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </label>
          </div>
        </div>

        {/* 가운데 캔버스 및 이젤 영역 */}
        <div
          className="
            // 기본 모드
            relative bg-transparent flex items-center justify-center 
            h-[58vh] max-h-[230px] aspect-[400/600] transition-all duration-200
            
            // 모바일 모드
            sm:bg-contain sm:bg-no-repeat sm:bg-center sm:w-[188px] sm:h-[264px] sm:max-h-none sm:aspect-auto
            
            md:w-[500px] md:h-[704px]
          "
          style={{
            backgroundImage: `url('/images/easel.png')`,
          }}
        >
          {/* 캔버스 도화지 */}
          <canvas
            ref={canvasRef}
            width={400}
            height={600}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="
              bg-white rounded-[8px] shadow-md cursor-crosshair block touch-none 
              relative w-full h-full top-0 left-0
              
              sm:absolute sm:w-[150px] sm:h-[225px] sm:top-[13px] sm:left-[19px]
              
              md:w-[400px] md:h-[600px] md:top-[34px] md:left-[50px]
            "
          />
        </div>

        {/* 오른쪽 도구함 영역 */}
        <div
          className="
            fixed bottom-4 left-1/2 -translate-x-1/2 w-[92vw] h-20 bg-[#FFF8D3] rounded-[24px] px-4 py-2 
            flex flex-row gap-4 items-center justify-around shadow-xl z-50 transition-all
            
            sm:fixed sm:bottom-auto sm:left-auto sm:translate-x-0 sm:relative 
            sm:w-[12vw] sm:max-w-[100px] md:max-w-none sm:h-auto sm:rounded-[40px] sm:px-4 sm:py-6 
            sm:flex-col sm:flex-nowrap sm:gap-4 sm:justify-center
          "
        >
          {/* 펜 기능 버튼 */}
          <button
            onClick={() => setTool('pen')}
            className={`flex justify-center items-center transition-all cursor-pointer 
              w-[6vw] h-[6vw] sm:w-12 sm:h-12 md:w-[6vw] md:h-[6vw] ${
                tool === 'pen' ? 'scale-115' : 'hover:scale-105'
              }`}
          >
            <Image
              src="/images/icons/icon-pen.png"
              alt="붓 그리기"
              width={100}
              height={100}
              draggable={false}
              className="w-full h-full object-contain"
            />
          </button>

          {/* 펜 굵기 조절 슬라이더 */}
          <div
            className={`
              w-14 sm:w-full transition-opacity duration-200 flex flex-col items-center gap-1 
              sm:mt-[-10px] sm:px-1 
              ${tool === 'pen' ? 'opacity-100' : 'opacity-40 pointer-events-none'}
            `}
          >
            <input
              type="range"
              min="3"
              max="30"
              value={penSize}
              onChange={(e) => setPenSize(Number(e.target.value))}
              className="w-full accent-[#927AF4] cursor-pointer rounded-full scale-90 sm:scale-100"
            />
          </div>

          {/* 지우개 기능 버튼 */}
          <button
            onClick={() => setTool('eraser')}
            className={`flex justify-center items-center transition-all cursor-pointer 
                w-[6vw] h-[6vw] sm:w-12 sm:h-12 md:w-[6vw] md:h-[6vw] ${
                  tool === 'eraser' ? 'scale-115' : 'hover:scale-105'
                }`}
          >
            <Image
              src="/images/icons/icon-eraser.png"
              alt="지우개"
              width={100}
              height={100}
              draggable={false}
              className="w-full h-full object-contain"
            />
          </button>

          {/* 지우개 굵기 */}
          <div
            className={`
              w-14 sm:w-full transition-opacity duration-200 flex flex-col items-center gap-1
              sm:mt-[-10px] sm:px-1 
              ${tool === 'eraser' ? 'opacity-100' : 'opacity-40 pointer-events-none'}
            `}
          >
            <input
              type="range"
              min="5"
              max="50"
              value={eraserSize}
              onChange={(e) => setEraserSize(Number(e.target.value))}
              className="w-full accent-[#FC9495] cursor-pointer rounded-full scale-90 sm:scale-100"
            />
          </div>

          {/* 페인트 기능 버튼 */}
          <button
            onClick={() => setTool('paint')}
            className={`flex justify-center items-center transition-all cursor-pointer 
                w-[6vw] h-[6vw] sm:w-12 sm:h-12 md:w-[6vw] md:h-[6vw] ${
                  tool === 'paint' ? 'scale-115' : 'hover:scale-105'
                }`}
          >
            <Image
              src="/images/icons/icon-paint.png"
              alt="페인트 통"
              width={100}
              height={100}
              draggable={false}
              className="w-full h-full object-contain"
            />
          </button>

          {/* 모두 지우기 기능 버튼 */}
          <button
            onClick={handleClearCanvas}
            className="flex justify-center items-center transition-all cursor-pointer group w-[6vw] h-[6vw] sm:w-12 sm:h-12 md:w-[6vw] md:h-[6vw]"
          >
            <Image
              src="/images/icons/icon-trash.png"
              alt="모두 지우기"
              width={100}
              height={100}
              draggable={false}
              className="group-hover:scale-105 transition-transform w-full h-full object-contain"
            />
          </button>
        </div>
      </div>

      <NextButton visible={true} onClick={handleSaveCover}></NextButton>
    </main>
  );
}
