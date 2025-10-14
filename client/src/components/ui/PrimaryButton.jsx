import React from 'react'

function PrimaryButton({children}) {
  return (
    <div className='px-4 py-2 bg-zinc-200 text-zinc-900 rounded cursor-pointer transition-all hover:bg-zinc-600 hover:text-zinc-200 hover:shadow-lg shadow-zinc-100/50'>
        {children}
    </div>
  )
}

export default PrimaryButton