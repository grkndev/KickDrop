import React from 'react'
import { Spinner } from './ui/spinner'

export default function Loading() {
  return (
    <div className='items-center justify-center flex h-full'>
      <Spinner className='size-8 text-kick' />
    </div>
  )
}
