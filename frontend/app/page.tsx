'use client'
import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import BookDetailModal from './components/BookDetailModal'
import { Book } from '@/types'
import { getBooks } from '@/utils/apiUtils'
import BooksTable from './components/BooksTable'
import DeleteBookModal from './components/DeleteBookModal'
import { BiBookAdd } from 'react-icons/bi'
import Link from 'next/link'

export default function Home () {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const fetchBooks = async () => {
    setLoading(true)
    try {
      getBooks(setBooks)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDetailsModal = (book: Book | null = null) => {
    setSelectedBook(book)
    setIsDetailsModalOpen(!isDetailsModalOpen)
  }

  const handleDeleteModal = (book: Book | null = null) => {
    setSelectedBook(book)
    setIsDeleteModalOpen(!isDeleteModalOpen)
  }

  useEffect(() => {
    fetchBooks()
  }, [isDeleteModalOpen])

  return (
    <main className="px-8">
      <div className='flex flex-col justify-center items-center h-screen'>
      {
        isDetailsModalOpen && selectedBook
          ? (
            <BookDetailModal handleDetailsModal={handleDetailsModal} book={selectedBook} />
            )
          : null
      }
      {
        isDeleteModalOpen && selectedBook
          ? (
          <DeleteBookModal handleDeleteModal={handleDeleteModal} book={selectedBook} />
            )
          : null
      }
      <div className="flex justify-between items-center w-full text-white">
        <h1 className="text-3xl my-8">Books Store</h1>
        <Link href={'/add'}>
          <BiBookAdd size='2rem' />
        </Link>
      </div>
      {
        !loading
          ? (
            <BooksTable books={books} handleDetailsModal={handleDetailsModal} handleDeleteModal={handleDeleteModal} />
            )
          : (
          <ClipLoader color="#FFFF" />
            )
      }
      </div>
    </main>
  )
}
