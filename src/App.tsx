import { useMemo, useState } from 'react';
import { BookMarked, BookOpen, CheckCircle2, Library } from 'lucide-react';
import { useReadingList } from './useReadingList';
import { STATUS_ORDER } from './types';
import { AddBookForm } from './components/AddBookForm';
import { BookCard } from './components/BookCard';
import { FilterBar, type FilterValue } from './components/FilterBar';
import { EmptyState } from './components/EmptyState';

function App() {
  const { books, addBook, hasBook, setStatus, removeBook } = useReadingList();
  const [filter, setFilter] = useState<FilterValue>('all');

  const counts = useMemo(() => {
    const c: Record<FilterValue, number> = { all: books.length } as Record<
      FilterValue,
      number
    >;
    for (const s of STATUS_ORDER) c[s] = 0;
    for (const b of books) c[b.status]++;
    return c;
  }, [books]);

  const visibleBooks = useMemo(
    () =>
      filter === 'all' ? books : books.filter((b) => b.status === filter),
    [books, filter]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/60 via-gray-50 to-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 shadow-sm">
              <BookMarked className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Reading List</h1>
              <p className="text-sm text-gray-500">
                Keep track of your books
              </p>
            </div>
          </div>
        </header>

        {/* Add form */}
        <div className="mb-6">
          <AddBookForm onAdd={addBook} hasBook={hasBook} />
        </div>

        {/* Summary */}
        {books.length > 0 && (
          <div className="mb-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Library className="h-4 w-4" />
                <span className="text-xs font-medium">Total Books</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{books.length}</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <BookOpen className="h-4 w-4" />
                <span className="text-xs font-medium">Reading</span>
              </div>
              <p className="text-2xl font-bold text-sky-600">{counts['reading']}</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs font-medium">Finished</span>
              </div>
              <p className="text-2xl font-bold text-emerald-600">{counts['finished']}</p>
            </div>
          </div>
        )}

        {/* Filters + content */}
        {books.length > 0 && (
          <>
            <div className="mb-5">
              <FilterBar filter={filter} counts={counts} onChange={setFilter} />
            </div>

            {visibleBooks.length > 0 ? (
              <div className="space-y-3">
                {visibleBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onSetStatus={setStatus}
                    onRemove={removeBook}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center py-12 text-gray-400 text-sm">
                No books in this category.
              </p>
            )}
          </>
        )}

        {books.length === 0 && <EmptyState />}
      </div>
    </div>
  );
}

export default App;
