import type { NextApiRequest, NextApiResponse } from 'next'
const { Resvg } = require('@resvg/resvg-js')

type Data = {
  name: string
}

const opts = {
  // background: 'rgba(238, 235, 230, .9)',
  fitTo: {
    mode: 'width',
    value: 1200
  }
}

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  // const { svg } = req.body

  // console.log(JSON.stringify(req.body))

  const { svg, width } = req.body

  console.log('svg', svg)
  console.log('width', width)

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
  // res.status(200).send(JSON.stringify(req.body))
}

// module.exports = (req, res) => {
//   const svg = req.query.svg
//   const width = req.query.width
//   const height = req.query.height
//   const size = Math.min(width, height)
//   svg2img(
//     url,
//     { width: size, height: size, preserveAspectRatio: true },
//     function (error, buffer) {
//       if (buffer) {
//         res.send(buffer)
//       }
//     }
//   )
// }
