import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Books: CollectionConfig = {
  slug: 'books',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'book_name',
  },
  fields: [
    {
      name: 'book_name',
      type: 'text',
      required: true,
    },
    {
      name: 'relatedBooks',
      type: 'join',
      collection: 'authors',
      on: 'book',
    }
  ],
}
