const https = require('https')
const url = process.argv[2]
if (!url) { console.error('Usage: node check-url.js <url>'); process.exit(1) }
https.get(url, (res) => {
  console.log('Status:', res.statusCode)
  console.log('Content-Type:', res.headers['content-type'])
  console.log('Cache-Control:', res.headers['cache-control'])
  let body = ''
  res.setEncoding('utf8')
  res.on('data', chunk => { if (body.length < 2000) body += chunk })
  res.on('end', () => {
    console.log('\nResponse snippet:\n')
    console.log(body.slice(0, 1000))
    process.exit(0)
  })
}).on('error', (e) => { console.error('Error:', e.message); process.exit(1) })
