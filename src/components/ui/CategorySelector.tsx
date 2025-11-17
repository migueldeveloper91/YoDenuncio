interface CategorySelectorProps {
  label: string;
  value?: string;
  error?: string;
  onChange: (value: string) => void;
}

const categories = [
  { value: "hurto", label: "Robo / Hurto" },
  { value: "asalto", label: "Asalto" },
  { value: "violencia", label: "Violencia física" },
  { value: "acoso", label: "Acoso / Hostigamiento" },
  { value: "vandalismo", label: "Vandalismo" },
  { value: "accidente", label: "Accidente de tránsito" },
  { value: "conduccion_peligrosa", label: "Conducción peligrosa" },
  { value: "rinas", label: "Riñas / Disturbios" },
  { value: "ruido", label: "Ruido excesivo" },
  { value: "alumbrado", label: "Alumbrado dañado" },
  { value: "basura", label: "Basura acumulada" },
  { value: "via_mal_estado", label: "Vía en mal estado" },
];

export default function CategorySelector({
  label,
  value,
  error,
  onChange,
}: CategorySelectorProps) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-500 mb-1">
        {label}
      </label>

      {/* Input deshabilitado */}

      <input
        disabled
        value={categories.find((c) => c.value === value)?.label || ""}
        placeholder="Seleccione una categoría"
        className={`w-full border rounded-xl px-3 py-2 bg-gray-100 text-gray-600 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {/* Chips */}
      <div className="flex flex-wrap gap-2 mt-3">
        {categories.map((cat) => {
          const isSelected = cat.value === value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onChange(cat.value)}
              className={`px-2 py-1 rounded-full border text-xs ${
                isSelected
                  ? "bg-[var(--color-secondary)] text-white border-[var(--color-secondary-dark)]"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
