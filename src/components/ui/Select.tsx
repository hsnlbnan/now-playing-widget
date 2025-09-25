"use client";

type Option = { value: string; label: string };
type Props = {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
};

export default function Select({ id, label, value, onChange, options }: Props) {
  return (
    <label className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
      <span>{label}</span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-white/80 text-xs outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

