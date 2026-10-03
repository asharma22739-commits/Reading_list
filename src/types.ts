export type ReadingStatus = 'want-to-read' | 'reading' | 'finished';

export interface Book {
  id: string;
  title: string;
  status: ReadingStatus;
  createdAt: number;
}

export const STATUS_META: Record<
  ReadingStatus,
  { label: string; color: string; badge: string; dot: string }
> = {
  'want-to-read': {
    label: 'Want to Read',
    color: 'amber',
    badge: 'bg-amber-100 text-amber-700',
    dot: 'bg-amber-500',
  },
  reading: {
    label: 'Reading',
    color: 'sky',
    badge: 'bg-sky-100 text-sky-700',
    dot: 'bg-sky-500',
  },
  finished: {
    label: 'Finished',
    color: 'emerald',
    badge: 'bg-emerald-100 text-emerald-700',
    dot: 'bg-emerald-500',
  },
};

export const STATUS_ORDER: ReadingStatus[] = [
  'want-to-read',
  'reading',
  'finished',
];
