import type { Block } from 'payload'

export const TitleBlock: Block = {
  slug: 'titleBlock',
  interfaceName: 'TitleBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Title Text',
          admin: {
            width: '70%',
          },
        },
        {
          name: 'textAlign',
          type: 'select',
          defaultValue: 'center',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
          admin: {
            width: '30%',
          },
        },
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'customColor',
          type: 'text',
          label: 'Custom Color (hex or color name)',
          admin: {
            description: 'Example: #FF0000 or red',
            width: '50%',
          },
        },
        {
          name: 'fontSize',
          type: 'select',
          defaultValue: 'xl',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Normal', value: 'base' },
            { label: 'Large', value: 'xl' },
            { label: 'Extra Large', value: '2xl' },
            { label: 'Huge', value: '3xl' },
          ],
          admin: {
            width: '50%',
          },
        },
      ]
    }
  ],
}
