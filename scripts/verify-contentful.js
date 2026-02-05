const fs = require('fs')
const path = require('path')
const contentful = require('contentful')

function loadEnv() {
  const env = {}
  const p = path.resolve(__dirname, '..', '.env')
  if (fs.existsSync(p)) {
    const raw = fs.readFileSync(p, 'utf8')
    raw.split(/\r?\n/).forEach(line => {
      const m = line.match(/^\s*([A-Z0-9_]+)=(.*)$/)
      if (m) env[m[1]] = m[2]
    })
  }
  // fallback to process.env
  return Object.assign({}, env, process.env)
}

const env = loadEnv()
const space = env.VITE_CONTENTFUL_SPACE_ID
const accessToken = env.VITE_CONTENTFUL_ACCESS_TOKEN
if (!space || !accessToken) {
  console.error('ERROR: VITE_CONTENTFUL_SPACE_ID or VITE_CONTENTFUL_ACCESS_TOKEN not found in .env or process.env')
  process.exit(1)
}

async function checkClient(opts) {
  const isPreview = opts && opts.host === 'preview.contentful.com'
  const token = isPreview ? (env.VITE_CONTENTFUL_PREVIEW_ACCESS_TOKEN || accessToken) : accessToken
  const client = contentful.createClient(Object.assign({ space, accessToken: token }, isPreview ? { host: 'preview.contentful.com' } : {}))
  try {
    const types = await client.getContentTypes()
    const entries = await client.getEntries({ content_type: 'parfumes', limit: 5 })
    return {
      host: opts && opts.host ? opts.host : 'cdn.contentful.com (delivery)',
      contentTypes: types.items.map(t => t.sys.id),
      parfumesCount: entries.total || 0,
    }
  } catch (err) {
    return { host: opts && opts.host ? opts.host : 'cdn.contentful.com (delivery)', error: err.message || err }
  }
}

;(async () => {
  console.log('Verifying Contentful access for space:', space)
  const delivery = await checkClient()
  const preview = await checkClient({ host: 'preview.contentful.com' })

  console.log('\nDelivery check (CDN):')
  if (delivery.error) console.error('  Error:', delivery.error)
  else {
    console.log('  Content types:', delivery.contentTypes.join(', '))
    console.log('  Entries for content type `parfumes`:', delivery.parfumesCount)
  }

  console.log('\nPreview check (Preview API):')
  if (preview.error) console.error('  Error:', preview.error)
  else {
    console.log('  Content types:', preview.contentTypes.join(', '))
    console.log('  Entries for content type `parfumes`:', preview.parfumesCount)
  }

  console.log('\nSuggestions:')
  console.log(' - If Delivery returns 0 for `parfumes` but Preview shows >0, the entries may be unpublished: use a Preview token to see drafts or publish content.')
  console.log(' - If both return errors like 404, verify the Space ID and Access Token in the Contentful web app (Settings → API keys).')
  console.log(' - Make sure the content type id is exactly `parfumes` (lowercase) and fields are published and present on entries.')
})()
