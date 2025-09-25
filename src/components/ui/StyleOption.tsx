"use client";

type StyleOptionProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

export default function StyleOption({
  icon,
  label,
  value,
  onChange,
  options
}: StyleOptionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 text-white/70">
          {icon}
        </div>
        <span className="text-sm font-medium text-white/90">{label}</span>
      </div>
      <div className="space-y-1.5">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              w-full text-left px-3 py-2.5 rounded-lg border transition-all duration-200 ease-out
              hover:scale-[1.01] active:scale-[0.99]
              ${value === option.value
                ? 'border-[#1DB954]/30 bg-[#1DB954]/10 text-white shadow-lg shadow-[#1DB954]/10'
                : 'border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/8 hover:text-white/90'
              }
            `}
          >
            <div className="text-sm font-medium">{option.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
