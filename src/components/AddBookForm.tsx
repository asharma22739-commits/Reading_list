import { useState } from 'react';
import { Plus } from 'lucide-react';
import { STATUS_META, STATUS_ORDER, type ReadingStatus } from '../types';

const MAX_TITLE_LENGTH = 60;

interface Props {
  onAdd: (title: string, status: ReadingStatus) => void;
  hasBook: (title: string) => boolean;
}

export function AddBookForm({ onAdd, hasBook }: Props) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<ReadingStatus>('want-to-read');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    if (trimmed.length > MAX_TITLE_LENGTH) {
      setError('Book title must be 60 characters or fewer.');
      return;
    }

    if (hasBook(trimmed)) {
      setError('This book is already in your reading list.');
      return;
    }

    onAdd(trimmed, status);
    setTitle('');
    setStatus('want-to-read');
    setError('');
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 py-5 text-gray-500 font-medium transition hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50/50"
      >
        <Plus className="h-5 w-5" />
        Add a book
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm space-y-4"
    >
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Book title
          </label>
          <span
            className={`text-xs ${
              title.length > MAX_TITLE_LENGTH
                ? 'text-red-500 font-medium'
                : 'text-gray-400'
            }`}
          >
            {title.length}/{MAX_TITLE_LENGTH}
          </span>
        </div>
        <input
          autoFocus
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          placeholder="e.g. The Great Gatsby"
          maxLength={200}
          className={`w-full rounded-xl border px-3.5 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-sky-500 focus:ring-sky-200'
          }`}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Status
        </label>
        <div className="flex gap-2">
          {STATUS_ORDER.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition ${
                status === s
                  ? `${STATUS_META[s].badge} ring-2 ring-offset-1 ring-sky-300`
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center justify-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${STATUS_META[s].dot}`} />
                {STATUS_META[s].label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-sky-600 py-2.5 font-medium text-white transition hover:bg-sky-700 active:scale-[0.98]"
        >
          Add book
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setTitle('');
            setError('');
          }}
          className="rounded-xl bg-gray-100 px-4 py-2.5 font-medium text-gray-600 transition hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
