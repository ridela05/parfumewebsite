const contentful = require('contentful')
const fs = require('fs')
const path = require('path')

// load .env manually
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
    const fields = item.fields || {}
    const img = fields.image
    let url = null
    if (typeof img === 'string' && img.trim()) url = img
    else if (img && img.fields && img.fields.file && img.fields.file.url) url = img.fields.file.url
    const normalized = url ? (url.startsWith('//') ? 'https:' + url : url) : null
    console.log('---')
    console.log('id:', item.sys.id)
    console.log('name:', fields.name)
    console.log('fields keys:', Object.keys(fields))
    console.log('full fields:', JSON.stringify(fields, null, 2))
    console.log('image url (raw):', url)
    console.log('image url (norm):', normalized)
  })
}).catch(err => {
  console.error('Error fetching entries:', err)
})
