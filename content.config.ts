import {defineCollection, defineContentConfig, z} from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: 'articles/*.md',
      schema: z.object({
        path: z.string(),
        title: z.string(),
        description: z.string(),
        updated: z.date(),
        seo: z.intersection(
          z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            meta: z.array(z.record(z.string(), z.any())).optional(),
            link: z.array(z.record(z.string(), z.any())).optional(),
          }),
          z.record(z.string(), z.any()),
        ).optional().default({}),
        body: z.object({
          type: z.string(),
          children: z.any(),
          toc: z.any(),
        }),
        navigation: z.union([
          z.boolean(),
          z.object({
            title: z.string(),
            description: z.string(),
          }),
        ]).default(true),
      })
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
    }),
    terms: defineCollection({
      type: 'data',
      source: 'terms/*.yml',
      schema: z.object({
        label: z.string(),
        definition: z.string(),
      })
    })
  }
})
