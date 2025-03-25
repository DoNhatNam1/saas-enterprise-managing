import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { CardBlock as CardBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export const CardBlock: React.FC<CardBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  const renderCardContent = (col: any) => {
    const { 
      enableLink, 
      link, 
      richText, 
      icon, 
      layout, 
      title,
      iconAlign = 'center',
      contentAlign = 'center' 
    } = col

    if (icon && layout === 'iconTitleLeft') {
      return (
        <>
          <div className={cn(
            "flex items-center gap-4 mb-4",
            {
              'justify-start': iconAlign === 'start',
              'justify-center': iconAlign === 'center',
              'justify-end': iconAlign === 'end',
            }
          )}>
            <div className="flex-shrink-0">
              <Media 
                resource={icon}
                className="w-12 h-12 object-contain"
              />
            </div>
            {title && <h3 className="text-xl font-semibold">{title}</h3>}
          </div>
          <div className={cn(
            "w-full", 
            {
              'text-left': contentAlign === 'start',
              'text-center': contentAlign === 'center',
              'text-right': contentAlign === 'end',
            }
          )}>
            {richText && <RichText content={richText} enableGutter={false} />}
            {enableLink && <CMSLink {...link} />}
          </div>
        </>
      )
    }

    return (
      <>
        {icon && (
          <div className={cn(
            "flex mb-4",
            {
              'justify-start': iconAlign === 'start',
              'justify-center': iconAlign === 'center',
              'justify-end': iconAlign === 'end',
            }
          )}>
            <Media 
              resource={icon}
              className="w-12 h-12 object-contain"
            />
          </div>
        )}
        <div className={cn(
          "w-full",
          {
            'text-left': contentAlign === 'start',
            'text-center': contentAlign === 'center',
            'text-right': contentAlign === 'end',
          }
        )}>
          {richText && <RichText content={richText} enableGutter={false} />}
          {enableLink && <CMSLink {...link} />}
        </div>
      </>
    )
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns?.map((col, index) => {
          const { size } = col

          return (
            <div
              key={index}
              className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`)}
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 dark:text-white">
                {renderCardContent(col)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}