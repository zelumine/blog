import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
    }),
});

const ressources = defineCollection({
  loader: glob({ base: "./src/content/ressources", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.url(),
    categorie: z.enum([
      "gif",
      "outil",
      "podcast",
      "tuto",
      "divers",
      "evenements",
    ]),
  }),
});

const evenements = defineCollection({
  loader: glob({ base: "./src/content/evenements", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    eventDate: z.coerce.date(),
  }),
});

export const collections = { blog, ressources, evenements };
