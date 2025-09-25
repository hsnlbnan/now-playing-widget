"use client";

type Props = {
  id?: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
};

export default function Checkbox({ id, label, checked, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 cursor-pointer select-none">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-[#1DB954]"
      />
      {label}
    </label>
  );
}

