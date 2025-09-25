"use client";

type FeatureToggleProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function FeatureToggle({
  label,
  description,
  checked,
  onChange
}: FeatureToggleProps) {
  return (
    <label className={`
      group relative flex items-start gap-3 p-3 rounded-xl border cursor-pointer
      transition-all duration-200 ease-out hover:scale-[1.01]
      ${checked
        ? 'border-[#1DB954]/30 bg-[#1DB954]/10 shadow-lg shadow-[#1DB954]/20'
        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
      }
    `}>
      <div className="flex-1 min-w-0">
        <div className={`
          text-sm font-medium transition-colors duration-200
          ${checked ? 'text-white' : 'text-white/90'}
        `}>
          {label}
        </div>
        {description && (
          <div className="text-xs text-white/60 mt-0.5">{description}</div>
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div className={`
        w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
        ${checked
          ? 'border-[#1DB954] bg-[#1DB954] scale-100'
          : 'border-white/30 bg-transparent scale-90 group-hover:border-white/50 group-hover:scale-100'
        }
      `}>
        {checked && (
          <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </label>
  );
}
