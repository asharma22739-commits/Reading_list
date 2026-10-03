import { STATUS_META, STATUS_ORDER, type ReadingStatus } from '../types';

export type FilterValue = ReadingStatus | 'all';

interface Props {
  filter: FilterValue;
  counts: Record<FilterValue, number>;
  onChange: (filter: FilterValue) => void;
}

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  ...STATUS_ORDER.map((s) => ({ value: s as FilterValue, label: STATUS_META[s].label })),
];

export function FilterBar({ filter, counts, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
      {FILTERS.map((f) => {
        const active = filter === f.value;
        const count = counts[f.value] ?? 0;
        const dot =
          f.value !== 'all' ? STATUS_META[f.value as ReadingStatus].dot : '';
        return (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              active
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900'
            }`}
          >
            {dot && <span className={`h-2 w-2 rounded-full ${dot}`} />}
            {f.label}
            <span
              className={`rounded-full px-1.5 text-xs ${
                active ? 'bg-white/20' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
