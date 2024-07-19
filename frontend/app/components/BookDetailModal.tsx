import React from 'react'
import { BookDetailsModalProps } from './types'
import { MdClose } from 'react-icons/md'

function BookDetailModal ({ handleDetailsModal, book }: BookDetailsModalProps) {
  return (
    <div className='fixed bg-black bg-opacity-60 top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center' onClick={handleDetailsModal}>
      <div onClick={(event) => event.stopPropagation()} className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'
      >
         <button onClick={handleDetailsModal} className='absolute right-6 top-6 text-4xl text-red-600'>
          <MdClose size='3rem' />
        </button>
        <div className='flex flex-col justify-center items-center h-screen text-black text-left text-2xl'>
          <div className='flex flex-col gap-5'>
            <div className='flex'>
              <h4 className='text-left font-bold'>
                id:
              </h4>
              <p className='text-left ml-1'>
                {
                  book._id
                }
              </p>
            </div>
            <div className='flex'>
              <h4 className='text-left font-bold'>
                Title:
              </h4>
              <p className='text-left ml-1'>
                {
                  book.title
                }
              </p>
            </div>
            <div className='flex'>
              <h4 className='text-left font-bold'>
                Author:
              </h4>
              <p className='text-left ml-1'>
                {
                  book.author
                }
              </p>
            </div>
            <div className='flex'>
              <h4 className='text-left font-bold'>
                Published Year:
              </h4>
              <p className='text-left ml-1'>
                {
                  book.publishedYear
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailModal
