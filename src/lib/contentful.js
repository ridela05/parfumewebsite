import { createClient } from "contentful";

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const previewToken = import.meta.env.VITE_CONTENTFUL_PREVIEW_ACCESS_TOKEN;
const usePreview =
  import.meta.env.VITE_CONTENTFUL_USE_PREVIEW === "1" ||
  import.meta.env.VITE_CONTENTFUL_USE_PREVIEW === "true";

const client = createClient({
  space,
  accessToken: usePreview && previewToken ? previewToken : accessToken,
  host:
    usePreview && previewToken
      ? "preview.contentful.com"
      : "cdn.contentful.com",
});

export const getParfumes = async () => {
  try {
    const response = await client.getEntries({
      content_type: "parfumes",
      limit: 100,
    });

    return response.items.map((item) => {
      const f = item.fields || {};
      // image may be either an asset object or a string URL
      let imageUrl = null;
      if (typeof f.image === "string" && f.image.trim()) {
        imageUrl = f.image;
      } else if (
        f.image &&
        f.image.fields &&
        f.image.fields.file &&
        f.image.fields.file.url
      ) {
        imageUrl = f.image.fields.file.url;
      }
      if (imageUrl && imageUrl.startsWith("//")) imageUrl = "https:" + imageUrl;

      // If image points to a viewer URL like /view/ID, try to derive a direct file URL
      const viewMatch = imageUrl && imageUrl.match(/\/view\/(\d+)/);
      if (viewMatch) {
        const id = viewMatch[1];
        // Common pattern used by this CDN: /files/b/{id}.png
        imageUrl = `https://cdn.corenexis.com/files/b/${id}.png`;
      }

      // normalize featured field that may be 'Yes'/'No' or boolean
      const featured =
        f.featured === true || String(f.featured).toLowerCase() === "yes";

      // Extract description robustly (handles plain string or Contentful Rich Text)
      function extractText(node){
        if(!node) return ''
        if(typeof node === 'string') return node
        if(Array.isArray(node)) return node.map(extractText).filter(Boolean).join('\n')
        if(node.nodeType && node.content) return extractText(node.content)
        if(node.nodeType === 'text') return node.value || ''
        if(typeof node === 'object'){
          return Object.values(node).map(v=> extractText(v)).filter(Boolean).join(' ')
        }
        return ''
      }

      const rawDesc = f.description || ''
      const description = String(extractText(rawDesc)).trim()

      return {
        id: item.sys.id,
        category: f.category,
        name: f.name,
        description: description,
        price: f.price,
        image: imageUrl,
        featured: !!featured,
      };
    });
  } catch (error) {
    console.error("Error fetching parfumes:", error);
    return [];
  }
};

export default client;
