import { cn } from 'src/utilities/cn'
import React from 'react'
import type { TitleBlock as TitleBlockProps } from '@/payload-types'

export const TitleBlock: React.FC<TitleBlockProps> = (props) => {
  const { text, textAlign = 'center', customColor, fontSize = 'xl' } = props
  const validFontSize = fontSize || 'xl';

  const textSizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    xl: 'text-xl md:text-2xl',
    '2xl': 'text-2xl md:text-3xl',
    '3xl': 'text-3xl md:text-4xl',
  }

  return (
    <div className="container my-16">
      <h2 
        className={cn(
          textSizeClasses[validFontSize],
        //   textSizeClasses[fontSize],
          {
            'text-left': textAlign === 'left',
            'text-center': textAlign === 'center',
            'text-right': textAlign === 'right',
          }
        )}
        style={customColor ? { color: customColor } : undefined}
      >
        {text}
      </h2>
    </div>
  )
}
