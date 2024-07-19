import Link from 'next/link'
import React from 'react'

interface BackButtonProps {
  text?: string
}

export default function BackButton ({ text }: BackButtonProps) {
  return (
    <button className='bg-cancel-button rounded-xl px-3 py-2'>
      <Link href={'/'}>
        {text === 'Cancel' ? 'Cancel' : 'Back'}
      </Link>
    </button>
  )
}
