import React from 'react'
import Link from 'next/link'
import { BooksTableProps } from './types'
import { tableHeaders } from '@/constants'
import { MdDeleteOutline, MdInfoOutline, MdModeEditOutline } from 'react-icons/md'

export default function BooksTable ({ books, handleDetailsModal, handleDeleteModal }:BooksTableProps) {
  return (
    <div className='flex flex-col w-full overflow-y-auto bg-slate-400 shadow-md rounded-xl bg-clip-border border'>
      <table className="w-full table-auto min-w-max">
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th className="border-b border-r p-2" key={header}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {books.map((books, index) => (
                <tr key={books._id} className="h-8 text-center">
                  <td className="border border-l-0 border-b-0">
                    {index + 1}
                  </td>
                  <td className="border border-b-0">
                    {books.title}
                  </td>
                  <td className="border border-b-0">
                    {books.author}
                  </td>
                  <td className="border border-b-0">
                    {books.publishedYear}
                  </td>
                  <td className="border border-b-0 border-r-0">
                    <div className="flex justify-center items-center gap-x-5">
                      <MdInfoOutline className='cursor-pointer' onClick={() => handleDetailsModal(books)} />
                      <Link href={`/edit/${books._id}`}>
                        <MdModeEditOutline />
                      </Link>
                      <MdDeleteOutline className='cursor-pointer' onClick={() => handleDeleteModal(books)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
  )
}
