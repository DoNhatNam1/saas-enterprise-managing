'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Media } from '@/components/Media'
import { X } from 'lucide-react'
import { getBusinessTypes } from './action'

interface BusinessTypeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect?: (type: string) => void
}

export const BusinessTypeDialog = async ({ open, onOpenChange, onSelect }: BusinessTypeDialogProps) => {
  const businessTypes = await getBusinessTypes()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] h-[80vh] p-0">
        <DialogHeader className="p-6 border-b relative">
          <DialogTitle>Chọn ngành hàng kinh doanh</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity">
            <X className="h-4 w-4" />
            <span className="sr-only">Đóng</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => onSelect?.(type.id.toString())}
                className="flex flex-col items-center p-6 rounded-lg border border-gray-200 hover:border-primary transition-colors bg-card text-left"
              >
                <div className="w-16 h-16 mb-4">
                  <Media 
                    resource={type.icon}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-semibold mb-2">{type.title}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
