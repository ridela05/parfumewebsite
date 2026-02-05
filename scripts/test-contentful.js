const contentful = require('contentful')

const client = contentful.createClient({
  space: 'ji3k4n4miv9',
  accessToken: 'Pc43IJpvJoRWkCljfOCGfF-5iKrH2VOL2Sg1PA2vupk',
})

client.getEntries({ content_type: 'parfumes', limit: 5 }).then(res => {
  console.log('Jumlah item:', res.items.length)
  res.items.forEach(it => console.log('-', (it.fields && it.fields.name) || '(no name)'))
}).catch(err => {
  console.error('Gagal mengambil entries:', err.message)
})
