import { BookOpen } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 py-16 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 mb-4">
        <BookOpen className="h-7 w-7 text-sky-500" />
      </div>
      <p className="text-gray-600 font-medium">
        Your reading list is empty. Add your first book.
      </p>
    </div>
  );
}
