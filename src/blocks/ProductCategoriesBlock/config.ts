import type { Block } from 'payload'

export const ProductCategories: Block = {
  slug: 'prodCategoriesBlock',
  interfaceName: 'ProdCategoriesBlock',
  fields: [
    {
      name: 'type',
      type: 'text',
      required: true,
      admin: {
        hidden: true,
      },
      defaultValue: 'prodCategoriesBlock',
    },
    {
      name: 'cats',
      type: 'array',
      label: 'Categories',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Category Name',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Category Icon',
          required: true,
        },
        // Items list with source selection
        {
          name: 'src',
          type: 'radio',
          defaultValue: 'new',
          options: [
            {
              label: 'Custom Items',
              value: 'new',
            },
            {
              label: 'From Business Type',
              value: 'biz',
            },
          ],
        },
        // Custom Items
        {
          name: 'items',
          type: 'array',
          label: 'Items',
          admin: {
            condition: (data, siblingData) => siblingData.src === 'new',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'path',
              type: 'text',
              required: true,
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              required: true,
            }
          ],
        },
        // Business Type Selection
        {
          name: 'biz',
          type: 'relationship',
          relationTo: 'businessTypes',
          hasMany: true,
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData.src === 'biz',
          },
        }
      ],
    },
  ],
}

