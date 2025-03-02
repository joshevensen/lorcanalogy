import {defineCollection, defineContentConfig, z} from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '*.md'
    }),
    resources: defineCollection({
      type: 'data',
      source: '/resources/*.yml',
      schema: z.object({
        name: z.string(),
        url: z.string(),
        description: z.string(),
        type: z.enum(['blog', 'youtube', 'podcast', 'subreddit']),
      })
    })
  }
})
