import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Movies: CollectionConfig = {
  slug: 'movies',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
        name: 'dayOnly',
        type: 'date',
        admin: {
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'd MMM yyy',
            },
        },
    },
    {
        name: 'age',
        type: 'number',
        required: true,
        admin: {
          step: 1,
        },
      }
  ],
}
