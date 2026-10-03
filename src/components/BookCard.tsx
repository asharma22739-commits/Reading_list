import { useState } from 'react';
import { Trash2, ChevronDown, Check } from 'lucide-react';
import { STATUS_META, STATUS_ORDER, type Book, type ReadingStatus } from '../types';

interface Props {
  book: Book;
  onSetStatus: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

export function BookCard({ book, onSetStatus, onRemove }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const meta = STATUS_META[book.status];

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-gray-300">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 leading-snug break-words">
            {book.title}
          </h3>
          <span
            className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.badge}`}
          >
            <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
        </div>

        <div className="relative flex flex-col items-center gap-1">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            aria-label="Change status"
          >
            <ChevronDown
              className={`h-4 w-4 transition ${menuOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <button
            onClick={() => onRemove(book.id)}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
            aria-label="Remove book"
          >
            <Trash2 className="h-4 w-4" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-9 z-20 w-44 rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg">
                {STATUS_ORDER.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      onSetStatus(book.id, s);
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${STATUS_META[s].dot}`}
                      />
                      {STATUS_META[s].label}
                    </span>
                    {book.status === s && (
                      <Check className="h-4 w-4 text-sky-600" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
