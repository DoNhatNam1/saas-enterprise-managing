import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'size',
        type: 'select',
        defaultValue: 'oneThird',
        options: [
          {
            label: 'Full Width',
            value: 'full',
          },
          {
            label: 'Half Width',
            value: 'half',
          },
          {
            label: 'One Third',
            value: 'oneThird',
          },
          {
            label: 'Two Thirds',
            value: 'twoThirds',
          },
        ],
        admin: {
          width: '50%',
        },
      },
      {
        name: 'icon',
        type: 'upload',
        relationTo: 'media',
        label: 'Icon',
        admin: {
          description: 'Optional icon to display',
          width: '50%',
        }
      },
      {
        name: 'layout',
        type: 'select',
        defaultValue: 'iconCenter',
        options: [
          {
            label: 'Icon Above Content (Center)',
            value: 'iconCenter',
          },
          {
            label: 'Icon with Title (Left)',
            value: 'iconTitleLeft',
          },
        ],
        admin: {
          condition: (data, siblingData) => Boolean(siblingData.icon),
          width: '50%',
        }
      },
    ]
  },
  {
    type: 'row',
    fields: [
      {
        name: 'iconAlign',
        type: 'select',
        defaultValue: 'center',
        options: [
          { label: 'Left', value: 'start' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'end' },
        ],
        admin: {
          condition: (data, siblingData) => Boolean(siblingData.icon),
          width: '50%',
        }
      },
      {
        name: 'contentAlign',
        type: 'select',
        defaultValue: 'center',
        options: [
          { label: 'Left', value: 'start' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'end' },
        ],
        admin: {
          width: '50%',
        }
      },
    ]
  },
  {
    name: 'title',
    type: 'text',
    label: 'Title',
    admin: {
      condition: (data, siblingData) => 
        Boolean(siblingData.icon) && siblingData.layout === 'iconTitleLeft',
    }
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
]

export const CardBlock: Block = {
  slug: 'cardBlock',
  interfaceName: 'CardBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      minRows: 1,
      fields: columnFields,
    },
  ],
}

export const TitleBlock: Block = {
  slug: 'titleBlock',
  interfaceName: 'TitleBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
  ],
}
