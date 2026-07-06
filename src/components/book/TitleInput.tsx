'use client';

interface TitleInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function TitleInput({
  value,
  onChange,
  placeholder = '여기에 제목을 입력하세요...',
}: TitleInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-[50vw] max-w-[600px] bg-white/20 backdrop-blur-md border-4 border-white-50 rounded-full px-[3vw] py-[2.5vh] font-noto font-regular text-[2vw] text-center text-white placeholder-white/50 focus:outline-none focus:border-white transition-all shadow-inner z-20"
      maxLength={20}
    />
  );
}
