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
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${bookTitle}_표지.png`;
    link.click();
    alert('멋진 표지가 완성되어 내 앨범에 쏙 저장되었습니다!');
    router.push('/home');
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
      <div className="flex justify-center items-center m-auto gap-10">
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

        {/* 가운데 캔버스 영역 */}
        <div className="flex flex-col items-center justify-center z-10">
          <h3 className="font-cafe24 text-[2.2vw] text-white mb-6 text-center max-w-[600px] truncate">
            책 제목: {bookTitle}
          </h3>

          {/* 이젤 컨테이너 */}
          <div
            className="relative bg-contain bg-no-repeat bg-center flex items-center justify-center"
            style={{
              backgroundImage: `url('/images/easel.png')`,
              width: '500px',
              height: '704px',
            }}
          >
            {/* 캔버스 (400 x 600) */}
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
              // 캔버스 좌표 조절 - 이젤에 맞춤
              className="bg-white rounded-[12px] shadow-inner cursor-crosshair block touch-none absolute"
              style={{
                // 캔버스가 내려가 있으면 값을 줄이면 됨
                top: '34px',
                // 좌우 여백은 50이면 맞음
                left: '50px',
              }}
            />
          </div>
        </div>

        {/* 오른쪽 도구함 영역 */}
        <div className="w-[16vw] bg-[#FFF8D3] rounded-[48px] px-8 py-12 flex flex-wrap gap-8 justify-center shadow-xl z-10">
          {/* 펜 기능 버튼 */}
          <button
            onClick={() => setTool('pen')}
            className={`w-full flex justify-center items-center transition-all cursor-pointer ${
              tool === 'pen' ? 'scale-115' : 'hover:scale-105'
            }`}
          >
            <Image
              src="/images/icons/icon-pen.png"
              alt="붓 그리기"
              width={100}
              height={100}
              draggable={false}
            />
          </button>

          {/* 펜 굵기 조절 슬라이더 */}
          <div
            className={`w-full mt-[-20px] px-6 flex flex-col items-center gap-1 transition-opacity duration-200 ${tool === 'pen' ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}
          >
            <input
              type="range"
              min="3"
              max="30"
              value={penSize}
              onChange={(e) => setPenSize(Number(e.target.value))}
              className="w-full accent-[#927AF4] cursor-pointer rounded-full"
            />
          </div>

          {/* 지우개 기능 버튼 */}
          <button
            onClick={() => setTool('eraser')}
            className={`w-full flex justify-center items-center transition-all cursor-pointer ${
              tool === 'eraser' ? 'scale-115' : 'hover:scale-105'
            }`}
          >
            <Image
              src="/images/icons/icon-eraser.png"
              alt="지우개"
              width={100}
              height={100}
              draggable={false}
            />
          </button>

          {/* 지우개 굵기 */}
          <div
            className={`w-full mt-[-20px] px-6 flex flex-col items-center gap-1 transition-opacity duration-200 ${tool === 'eraser' ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}
          >
            <input
              type="range"
              min="5"
              max="50"
              value={eraserSize}
              onChange={(e) => setEraserSize(Number(e.target.value))}
              className="w-full accent-[#FC9495] cursor-pointer rounded-full"
            />
          </div>

          {/* 페인트 기능 버튼 */}
          <button
            onClick={() => setTool('paint')}
            className={`w-full flex justify-center items-center transition-all cursor-pointer ${
              tool === 'paint' ? 'scale-115' : 'hover:scale-105'
            }`}
          >
            <Image
              src="/images/icons/icon-paint.png"
              alt="페인트 통"
              width={100}
              height={100}
              draggable={false}
            />
          </button>

          {/* 모두 지우기 기능 버튼 */}
          <button
            onClick={handleClearCanvas}
            className="w-full flex justify-center items-center transition-all cursor-pointer group"
          >
            <Image
              src="/images/icons/icon-trash.png"
              alt="모두 지우기"
              width={100}
              height={100}
              draggable={false}
              className="group-hover:scale-105 transition-transform"
            />
          </button>
        </div>
      </div>

      <NextButton visible={true} onClick={handleSaveCover}></NextButton>
    </main>
  );
}
