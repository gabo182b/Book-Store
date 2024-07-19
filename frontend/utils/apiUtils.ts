import { NewBook } from '@/app/add/types'
import { Dispatch, SetStateAction } from 'react'
import { Book, BookDetailsToEdit } from '@/types'

export const getBooks = async (setBooks:Dispatch<SetStateAction<Book[]>>) => {
  try {
    const response = await fetch('http://localhost:5555/books')
    if (!response.ok) { console.log('Books not found') }
    const result = await response.json()
    const data = result.data
    setBooks(data)
  } catch (error) {
    console.log(error)
  }
}

export const addBook = async (data: NewBook) => {
  try {
    const response = await fetch('http://localhost:5555/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      console.log('Error adding book')
    }
    return { status: 'ok', data: await response.json() }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message)
      return { status: 'fail', data: error.message }
    } else {
      console.log('An unexpected error occurred')
      return { status: 'fail', data: 'An unexpected error occurred' }
    }
  }
}

export const deleteBook = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:5555/books/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      console.log('Error deleting book')
    }
  } catch (error) {
    console.log(error)
  }
}

export const getBookDetails = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:5555/books/${id}`)
    if (!response.ok) { console.log('Book not found') }
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const editBook = async (data: BookDetailsToEdit, id: string) => {
  try {
    const response = await fetch(`http://localhost:5555/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      console.log('Error Editing book')
    }
    return { status: 'ok', data: await response.json() }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message)
      return { status: 'fail', data: error.message }
    } else {
      console.log('An unexpected error occurred')
      return { status: 'fail', data: 'An unexpected error occurred' }
    }
  }
}
