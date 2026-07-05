'use client';

import { useRef, MouseEvent } from 'react';

export function useDragScroll() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // 드래그 거리 판정을 위한 변수
  const dragThreshold = 5; // 5픽셀 이상 움직이면 드래그로 간주
  const mouseStartX = useRef(0);

  const velocity = useRef(0);
  const lastX = useRef(0);
  const timestamp = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const momentumLoop = () => {
    if (!scrollRef.current) return;
    velocity.current *= 0.95;
    scrollRef.current.scrollLeft -= velocity.current;

    if (Math.abs(velocity.current) > 0.5) {
      animationFrameId.current = requestAnimationFrame(momentumLoop);
    } else {
      // 스크롤이 완전히 멈추면 드래그 상태 해제
      scrollRef.current.setAttribute('data-dragging', 'false');
    }
  };

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    isDown.current = true;
    scrollRef.current.style.cursor = 'grabbing';

    // 처음에 누른 순수 마우스 좌표 기록
    mouseStartX.current = e.pageX;

    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;

    lastX.current = e.pageX;
    timestamp.current = Date.now();
  };

  const onMouseLeave = () => {
    if (!isDown.current) return;
    isDown.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      // 살짝 딜레이를 주어 마우스를 뗄 때 클릭이 발동되지 않도록 방어
      setTimeout(() => {
        scrollRef.current?.setAttribute('data-dragging', 'false');
      }, 50);
    }
    momentumLoop();
  };

  const onMouseUp = () => {
    if (!isDown.current) return;
    isDown.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      // 마우스를 뗄 때 즉시 false로 바꾸지 않고, 관성 이동이 끝날 때 혹은 미세한 딜레이 후 해제
      setTimeout(() => {
        scrollRef.current?.setAttribute('data-dragging', 'false');
      }, 50);
    }
    momentumLoop();
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;

    // 누른 지점으로부터 마우스가 일정 거리(Threshold) 이상 움직였다면 드래그 중이라고 선언!
    if (Math.abs(e.pageX - mouseStartX.current) > dragThreshold) {
      scrollRef.current.setAttribute('data-dragging', 'true');
    }

    scrollRef.current.scrollLeft = scrollLeft.current - walk;

    const now = Date.now();
    const dt = now - timestamp.current;
    if (dt > 0) {
      velocity.current = ((e.pageX - lastX.current) / dt) * 10;
    }

    lastX.current = e.pageX;
    timestamp.current = now;
  };

  return {
    scrollRef,
    scrollProps: {
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onMouseMove,
      style: { cursor: 'grab' },
      'data-dragging': 'false', // 초기값 설정
    },
  };
}
