import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  console.log('submit')

  const svg = e.currentTarget.svg.value
  const width = e.currentTarget.width.value
  const fileType = e.currentTarget.fileType.value

  try {
    fetch('/api/svgpng', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ svg, width })
    })
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob)

        const img = new Image()
        img.src = url
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext('2d')

          if (!ctx) return

          ctx.drawImage(img, 0, 0)

          const format = fileType === 'webp' ? 'image/webp' : 'image/png'

          const dataURL = canvas.toDataURL(format)
          const newTab = window.open()
          newTab?.document.write(`<img src="${dataURL}" />`)
        }
      })
  } catch (error) {
    console.log(error)
  }
}

export default function Home () {
  const [svg, setSvg] = useState('')

  return (
    <main
      className={`flex min-h-screen flex-col items-center  p-24 ${inter.className}`}
    >
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center w-full max-w-4xl'
      >
        <h1 className='mb-12 text-4xl font-bold text-center'>
          SVG to PNG converter
        </h1>
        <div className='flex flex-col items-center justify-center w-full'>
          <label htmlFor='svg' className='text-xl font-bold '>
            SVG
          </label>
          <textarea
            id='svg'
            className='w-full p-4 mt-2 text-black border border-gray-300 rounded-lg h-96'
            value={svg}
            onChange={e => setSvg(e.target.value)}
          />
        </div>
        <div className='flex flex-col items-center justify-center w-64 mt-8'>
          <label htmlFor='width' className='text-xl font-bold'>
            Width
          </label>
          <input
            id='width'
            type='number'
            className='w-full p-4 mt-2 text-black border border-gray-300 rounded-lg'
          />
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-8'>
          <p className='text-xl font-bold'>Select file type</p>
          <div className='flex items-center justify-center p-4 mt-2 border border-white rounded-lg'>
            <label htmlFor='png' className='mr-4'>
              PNG
            </label>
            <input
              id='png'
              type='radio'
              name='fileType'
              value='png'
              className='mr-4'
            />
            <label htmlFor='webp' className='mr-4'>
              WebP
            </label>
            <input
              id='webp'
              type='radio'
              name='fileType'
              value='webp'
              className='mr-4'
            />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <button
            type='submit'
            className='w-full p-4 mt-8 text-black transition-all duration-300 bg-white border border-white rounded-lg hover:bg-black hover:text-white'
          >
            Convert
          </button>
        </div>
      </form>
    </main>
  )
}
