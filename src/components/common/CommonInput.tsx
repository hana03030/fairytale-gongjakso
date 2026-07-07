'use client';

interface InputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function CommonInput({
  value,
  onChange,
  placeholder = '여기에 값을 입력하세요...',
}: InputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-[50vw] max-w-[500px] bg-white/20 backdrop-blur-md border-4 border-white-50 rounded-full px-[2vw] py-[2vh] font-noto font-regular text-[1.6vw] text-center text-white placeholder-white/50 focus:outline-none focus:border-white transition-all shadow-inner z-20"
      maxLength={20}
    />
  );
}
