import { Book } from '@/types'

export interface BookDetailsModalProps {
  handleDetailsModal : () => void
  book: Book
}

export interface DeleteBookModalProps {
  handleDeleteModal : () => void
  book: Book
}

export interface BooksTableProps {
  books: Book[];
  handleDetailsModal: (book?: Book | null) => void;
  handleDeleteModal: (book?: Book | null) => void;
}
