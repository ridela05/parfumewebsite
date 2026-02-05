import { createClient } from 'contentful'

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const deliveryAccessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
const previewAccessToken = import.meta.env.VITE_CONTENTFUL_PREVIEW_ACCESS_TOKEN
const usePreviewEnv = import.meta.env.VITE_CONTENTFUL_USE_PREVIEW
const usePreview = usePreviewEnv === '1' || usePreviewEnv === 'true'

function getClient() {
  const isPreview = usePreview && !!previewAccessToken
  if (usePreview && !previewAccessToken) {
    // Fall back to delivery token if preview requested but token missing
    console.warn('VITE_CONTENTFUL_USE_PREVIEW is enabled but VITE_CONTENTFUL_PREVIEW_ACCESS_TOKEN is not set. Falling back to delivery API.')
  }
  const accessToken = isPreview ? previewAccessToken : deliveryAccessToken
  const host = isPreview ? 'preview.contentful.com' : 'cdn.contentful.com'

  return createClient({
    space,
    accessToken,
    host,
  })
}

function extractText(node){
  if(!node) return ''
  if(typeof node === 'string') return node
  if(Array.isArray(node)) return node.map(extractText).filter(Boolean).join('\n')
  // Contentful rich text: document -> content -> paragraph -> text
  if(node.nodeType && node.content) return extractText(node.content)
  if(node.nodeType === 'text') return node.value || ''
  // fallback for unexpected shapes
  if(typeof node === 'object'){
    return Object.values(node).map(v=> extractText(v)).filter(Boolean).join(' ')
  }
  return ''
}

export async function getParfumes() {
  const client = getClient()
  const res = await client.getEntries({ content_type: 'parfumes', limit: 100 })
  // Map entries to only include allowed fields
  return res.items.map((item) => {
    const f = item.fields || {}
    const rawDesc = f.description || ''
    const description = String(extractText(rawDesc)).trim()
    return {
      id: item.sys?.id,
      name: f.name || '',
      description: description,
      price: f.price || '',
      category: f.category || '',
      featured: !!f.featured,
      image: (f.image && f.image.fields && f.image.fields.file && f.image.fields.file.url) ? (f.image.fields.file.url.startsWith('//') ? 'https:' + f.image.fields.file.url : f.image.fields.file.url) : null,
    }
  })
} 
