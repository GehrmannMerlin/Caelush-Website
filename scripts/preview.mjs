import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, resolve, sep } from 'node:path'

const root = resolve('.output/public')
const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.woff2', 'font/woff2']
])

const host = process.env.HOST ?? '127.0.0.1'
const port = Number(process.env.PORT ?? 4173)

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end()
    return
  }

  let pathname
  try {
    pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname)
  } catch {
    response.writeHead(400).end('Bad request')
    return
  }

  const filePath = resolve(root, `.${pathname}`)
  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
    response.writeHead(403).end('Forbidden')
    return
  }

  let target = filePath
  try {
    const fileInfo = await stat(target)
    if (fileInfo.isDirectory()) {
      target = resolve(target, 'index.html')
    }

    if (!(await stat(target)).isFile()) {
      throw new Error('Not a file')
    }
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found')
    return
  }

  response.writeHead(200, {
    'Content-Type': contentTypes.get(extname(target).toLowerCase()) ?? 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff'
  })

  if (request.method === 'HEAD') {
    response.end()
    return
  }

  createReadStream(target).pipe(response)
})

server.listen(port, host, () => {
  console.log(`Previewing .output/public at http://${host}:${port}`)
})
