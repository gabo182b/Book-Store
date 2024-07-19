'use client'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import BackButton from '../components/BackButton'
import { ClipLoader } from 'react-spinners'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { NewBook } from './types'
import { addBook } from '@/utils/apiUtils'

export default function AddBook () {
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<NewBook>()

  const onSubmit: SubmitHandler<NewBook> = async (data) => {
    setLoading(true)
    try {
      const addNewBook = await addBook(data)
      if (addNewBook.status === 'ok') {
        enqueueSnackbar('Book added successfully', { variant: 'success' })
        router.push('/')
        reset()
      }
    } catch (error) {
      enqueueSnackbar('Error', { variant: 'error' })
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <div className='px-8'>
      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='flex flex-col justify-between items-center w-full gap-4'>
          <h1 className='text-3xl font-bold text-white'>Add a new book</h1>
          {loading ? <ClipLoader /> : null}
          <div className='flex flex-col justify-center items-center w-[600px] max-w-full h-[400px] bg-slate-400 p-4 rounded-xl'>
            <form className='grid grid-cols-[min-content_1fr] gap-8 w-[500px]' onSubmit={handleSubmit(onSubmit)}>
              <label>Title:</label>
              <input
                className='bg-transparent border border-white p-2 focus:shadow-xl outline-none focus:border-black'
                placeholder='Title'
                type='text'{...register('title', {
                  required: 'Title required'
                })}
              />
              {errors.title && <span className='col-span-2 text-red-600'>{errors.title.message}</span>}
              <label>Author:</label>
              <input
                className='bg-transparent border border-white p-2 focus:shadow-xl outline-none focus:border-black'
                placeholder='Author'
                type='text'{...register('author', {
                  required: 'Author required'
                })}
              />
              {errors.author && <span className='col-span-2 text-red-600'>{errors.author.message}</span>}
              <label>Published Year:</label>
              <input
                className='bg-transparent border border-white p-2 focus:shadow-xl outline-none focus:border-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                placeholder='Published year'
                type='number'{...register('publishedYear', {
                  required: 'Year required'
                })}
              />
              {errors.publishedYear && <span className='col-span-2 text-red-600'>{errors.publishedYear.message}</span>}
              <div className='col-span-2 flex justify-center gap-40'>
                <button className='bg-ok-button rounded-xl px-3 py-2' type='submit'>Add book</button>
                <BackButton text='Cancel' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
