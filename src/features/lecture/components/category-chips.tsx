"use client";

interface Props {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export function CategoryChips({ categories, active, onChange }: Props) {
  return (
    <div className="scroll-hidden flex gap-2 overflow-x-auto px-4 py-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`flex-shrink-0 rounded-pill px-4 py-1.5 text-sm font-medium transition ${
            active === category
              ? "bg-brand text-black"
              : "border border-base-border text-text-secondary"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
