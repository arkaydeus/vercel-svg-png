import type { NextApiRequest, NextApiResponse } from 'next'
const { Resvg } = require('@resvg/resvg-js')
const { join, resolve } = require('path')

type Data = {
  name: string
}

const opts = {
  // background: 'rgba(238, 235, 230, .9)',
  fitTo: {
    mode: 'width',
    value: 1200
  },
  font: {
    fontFiles: [
      join(process.cwd(), 'fonts', 'OpenSans-Medium.ttf'),
      join(process.cwd(), 'fonts', 'RobotoMono-Regular.ttf')
    ], // Load custom fonts.
    loadSystemFonts: false, // It will be faster to disable loading system fonts.
    defaultFontFamily: 'Roboto Mono' // Set default font family.
  }
}

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { svg, width } = req.body

  // console.log('svg', svg)
  console.log('width', width)
  console.log(
    'font path',
    join(process.cwd(), 'fonts', 'RobotoMono-Regular.ttf')
  )

  if (width) {
    opts.fitTo.value = Number(width)
  }

  const resvg = new Resvg(svg, opts)
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  console.info('Original SVG Size:', `${resvg.width} x ${resvg.height}`)
  console.info('Output PNG Size  :', `${pngData.width} x ${pngData.height}`)

  res.setHeader('Content-Type', 'image/png')
  res.status(200).send(pngBuffer)
}
