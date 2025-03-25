'use client'

import { cn } from 'src/utilities/cn'
import React from 'react'
import { Media } from '@/components/Media'
import Link from 'next/link'
import type { ProdCategoriesBlock as ProdCategoriesBlockProps } from '@/payload-types'

type ItemProps = {
  name: string
  path: string
  icon: any
}

const CategoryItem: React.FC<ItemProps> = ({ name, path, icon }) => (
  <Link
    href={path || '#'}
    className={cn(
      "flex items-center gap-3 p-2.5",
      "rounded-md transition-colors",
      "hover:bg-blue-100 dark:hover:bg-gray-800",
      "group"
    )}
  >
    <div className="w-6 h-6 relative shrink-0">
      <Media
        resource={icon}
        className="w-full h-full object-contain group-hover:scale-110 transition-transform"
      />
    </div>
    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-primary">
      {name}
    </span>
  </Link>
)

export const ProductCategoriesBlock: React.FC<ProdCategoriesBlockProps> = ({ cats }) => {
  const renderCategoryItems = (category: any) => {
    const items = category.src === 'new' 
      ? category.items?.map(item => ({
          name: item.name,
          path: item.path,
          icon: item.icon,
          key: item.name
        }))
      : category.biz?.map(biz => ({
          name: biz.title,
          path: biz.path,
          icon: biz.icon,
          key: biz.id
        }))

    return items?.map(item => (
      <CategoryItem 
        key={item.key}
        name={item.name}
        path={item.path}
        icon={item.icon}
      />
    ))
  }

  return (
    <div className="container px-4 my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cats?.map((category, index) => (
          <div 
            key={index}
            className={cn(
              "bg-card rounded-lg p-6",
              "border border-gray-200 dark:border-gray-700",
              "transition-all duration-200",
              "hover:shadow-lg hover:border-primary/20",
              "dark:hover:border-primary/40"
            )}
          >
            {/* Category Header */}
            <div className={cn(
              "flex flex-col items-center gap-4 mb-6 pb-4",
              "border-b border-gray-200 dark:border-gray-700"
            )}>
              <div className="w-17 h-17 relative">
                <Media 
                  resource={category.icon}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-center dark:text-white">
                {category.name}
              </h3>
            </div>

            {/* Items Grid */}
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
              {renderCategoryItems(category)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
