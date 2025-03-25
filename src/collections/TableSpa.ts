import type { CollectionConfig } from 'payload'

export const TableSpa: CollectionConfig = {
  slug: 'tablespa',
  access: {
    create: ({ req: { user } }) => !!user,
    read: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'tenseusers',
      type: 'relationship',
      relationTo: 'tenseusers',
      required: true,
      unique: true,
    },
    {
      name: 'location',
      type: 'text',
      required: false,
    },
  ],
}