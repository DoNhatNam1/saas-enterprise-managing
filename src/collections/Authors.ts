import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Authors: CollectionConfig = {
  slug: 'authors',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'author_name',
  },
  fields: [
    {
      name: 'author_name',
      type: 'text',
      required: true,
    },
    {
        name: 'book',
        type: 'relationship', 
        hasMany: true,
        relationTo: 'books',
      }
  ],
}
