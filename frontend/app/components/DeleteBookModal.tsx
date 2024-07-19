'use client'
import { deleteBook } from '@/utils/apiUtils'
import { DeleteBookModalProps } from './types'
import { useSnackbar } from 'notistack'

function DeleteBookModal ({ handleDeleteModal, book }: DeleteBookModalProps) {
  const id = book._id
  const { enqueueSnackbar } = useSnackbar()

  const handleDeleteBook = async () => {
    try {
      deleteBook(id)
      enqueueSnackbar('Book deleted sucessfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Error deleting book', { variant: 'error' })
      console.log(error)
    }
  }
  return (
    <div className='fixed bg-black bg-opacity-60 top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center' onClick={handleDeleteModal}>
      <div className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col'>
        <div className='flex flex-col justify-around items-center h-screen text-black'>
          <h3 className='text-3xl font-bold text-red-700'>
            Are you sure to delete this book?
          </h3>
          <div>
            <button className='p-4 bg-red-600 text-white m-8 w-fit rounded-xl shadow-lg' onClick={handleDeleteBook}>
              Delete
            </button>
            <button className='p-4 bg-red-600 text-white m-8 w-fit rounded-xl shadow-lg' onClick={handleDeleteModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteBookModal
