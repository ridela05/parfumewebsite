const contentful = require('contentful')
const fs = require('fs')
const path = require('path')

// load .env
const envPath = path.resolve(__dirname, '..', '.env')
const env = {}
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach(line => {
    const m = line.match(/^\s*([A-Z0-9_]+)=(.*)$/)
    if (m) env[m[1]] = m[2]
  })
}

const space = env.VITE_CONTENTFUL_SPACE_ID || process.env.VITE_CONTENTFUL_SPACE_ID
const accessToken = env.VITE_CONTENTFUL_ACCESS_TOKEN || process.env.VITE_CONTENTFUL_ACCESS_TOKEN
if (!space || !accessToken) {
  console.error('Missing space or token in .env')
  process.exit(1)
}

const client = contentful.createClient({ space, accessToken })

client.getEntries({ content_type: 'parfumes', limit: 20 }).then(res => {
  console.log('Found', res.items.length, 'entries')
  res.items.forEach(item => {
    const f = item.fields || {}
    let imageUrl = null
    if (typeof f.image === 'string' && f.image.trim()) imageUrl = f.image
    else if (f.image && f.image.fields && f.image.fields.file && f.image.fields.file.url) imageUrl = f.image.fields.file.url
    if (imageUrl && imageUrl.startsWith('//')) imageUrl = 'https:' + imageUrl
    const viewMatch = imageUrl && imageUrl.match(/\/view\/(\d+)/)
    if (viewMatch) {
      const id = viewMatch[1]
      imageUrl = `https://cdn.corenexis.com/files/b/${id}.png`
    }
    console.log('id:', item.sys.id, '->', imageUrl)
  })
}).catch(err => { console.error('Error:', err) })
