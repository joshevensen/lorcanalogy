import {defineCollection, defineContentConfig, z} from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '*.md'
    }),
    resources: defineCollection({
      type: 'data',
      source: 'resources/*.yml',
      schema: z.object({
        name: z.string(),
        description: z.string(),
        websiteURL: z.string().optional(),
        youtubeURL: z.string().optional(),
        subredditURL: z.string().optional(),
      })
    })
  }
})
