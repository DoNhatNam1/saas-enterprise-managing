import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { backupAndRemoveOldData } from '@/utilities/backupAndRemoveOldData'
import { mapUserToBusinessTypeTable } from '@/utilities/mapUserToBusinessTypeTable'

export const TenseUsers: CollectionConfig = {
  slug: 'tenseusers',
  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'email',
    group: 'Users',
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      admin: {
        components: {
          Field: undefined,
        },
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'storeName',
      type: 'text',
      required: false,
    },
    {
      name: 'businessType',
      type: 'relationship',
      relationTo: 'businessTypes',
      required: false,
    },
    {
      name: 'firstName',
      type: 'text',
      required: false,
    },
    {
      name: 'lastName',
      type: 'text',
      required: false,
    },
    {
      name: 'subscriptionStatus',
      type: 'text',
      required: false,
    },
    {
      name: 'lastLoginAt',
      type: 'date',
      required: false,
    },
  ],
}