import { useCallback, useEffect, useState } from 'react';
import type { Book, ReadingStatus } from './types';

const STORAGE_KEY = 'reading-list-books';

function load(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Book[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useReadingList() {
  const [books, setBooks] = useState<Book[]>(() => load());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const hasBook = useCallback(
    (title: string) => {
      const normalized = title.trim().toLowerCase();
      return books.some((b) => b.title.trim().toLowerCase() === normalized);
    },
    [books]
  );

  const addBook = useCallback((title: string, status: ReadingStatus) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setBooks((prev) => [
      {
        id: crypto.randomUUID(),
        title: trimmed,
        status,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
  }, []);

  const setStatus = useCallback((id: string, status: ReadingStatus) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  }, []);

  const removeBook = useCallback((id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return { books, addBook, hasBook, setStatus, removeBook };
}
