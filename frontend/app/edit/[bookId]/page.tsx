'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import BackButton from '../../components/BackButton'
import { ClipLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { BookDetailsProps } from '@/types'
import { BookDetailsToEdit } from './types'
import { getBookDetails, editBook } from '@/utils/apiUtils'

export default function BookToEdit ({ params }: BookDetailsProps) {
  const [loading, setLoading] = useState(false)
  const id = params.bookId

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<BookDetailsToEdit>({
    defaultValues: {
      title: '',
      author: '',
      publishedYear: null

    }
  })
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const fetchBookDetail = useCallback(async () => {
    setLoading(true)
    try {
      const bookDetails = await getBookDetails(id)
      reset(bookDetails)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [id, reset])

  const onSubmit: SubmitHandler<BookDetailsToEdit> = async (data) => {
    setLoading(true)
    try {
      const bookEdit = await editBook(data, id)
      if (bookEdit.status === 'ok') {
        enqueueSnackbar('Book edited successfully', { variant: 'success' })
        router.push('/')
      }
    } catch (error) {
      enqueueSnackbar('Error editing book', { variant: 'error' })
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBookDetail()
  }, [fetchBookDetail])

  return (
    <div className='px-8'>
      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='flex flex-col justify-between items-center w-full gap-4'>
          <h1 className='text-3xl font-bold text-white'>Edit Book</h1>
          {loading ? <ClipLoader /> : null}
          <div className='flex flex-col justify-center items-center w-[600px] max-w-full h-[400px] bg-slate-400 p-4 rounded-xl'>
          <form className='grid grid-cols-[min-content_1fr] gap-8 w-[500px]' onSubmit={handleSubmit(onSubmit)}>
            <label className='font-bold'>Title:</label>
            <input
              className='bg-transparent border border-white p-2 focus:shadow-xl outline-none focus:border-black'
              type='text'{...register('title', {
                required: 'Title required'
              })}
            />
            {errors.title && <span className='col-span-2 text-red-600'>{errors.title.message}</span>}
            <label className='font-bold'>Author:</label>
            <input
              className='bg-transparent border border-white p-2 focus:shadow-xl outline-none focus:border-black'
              type='text'{...register('author', {
                required: 'Author required'
              })}
            />
            {errors.author && <span className='col-span-2 text-red-600'>{errors.author.message}</span>}
            <label className='font-bold'>Published Year:</label>
            <input
              className='bg-transparent border border-white p-2 focus:shadow-xl outline-none focus:border-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              type='number'{...register('publishedYear', {
                required: 'Year required'
              })}
              />
              {errors.publishedYear && <span className='col-span-2 text-red-600'>{errors.publishedYear.message}</span>}
            <div className='col-span-2 flex justify-center gap-40'>
              <button className='bg-ok-button rounded-xl px-3 py-2' type='submit'>Edit</button>
              <BackButton text='Cancel' />
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  )
}
