'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Media } from '@/components/Media'
import { X } from 'lucide-react'
import { toast } from '@payloadcms/ui'
import type { BusinessType } from '@/payload-types'
import { handleRegistration, getBusinessTypes } from './action'

export default function RegistrationPage() {
  const [businessTypes, setBusinessTypes] = useState<BusinessType[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [storeName, setStoreName] = useState('')
  const [selectedType, setSelectedType] = useState<number | null>(null)
  const [selectedTypeName, setSelectedTypeName] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchBusinessTypes = async () => {
      try {
        const data = await getBusinessTypes()
        setBusinessTypes(data)
      } catch (error) {
        console.error('Failed to fetch business types:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBusinessTypes()
  }, [])

  const handleSelectBusinessType = (type: BusinessType) => {
    setSelectedType(type.id)
    setSelectedTypeName(type.title)
    setOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!storeName || selectedType === null) return

    try {
      setIsSubmitting(true)
      const res = await handleRegistration({
        storeName,
        businessTypeId: selectedType!,
      })

      if (res.success === false) {
        toast.error(res.message || 'Registration failed. Please try again.')
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="container max-w-2xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Hoàn tất đăng ký</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">
            Tên gian hàng của bạn
          </label>
          <Input
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="Nhập tên gian hàng..."
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Chọn ngành hàng kinh doanh
          </label>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(true)}
            className="w-full text-left justify-between text-white"
          >
            {selectedTypeName || 'Chọn ngành hàng'}
            <span>→</span>
          </Button>
        </div>

        <Button 
          type="submit" 
          className="w-full mt-8"
          disabled={!storeName || !selectedType || isSubmitting}
        >
          {isSubmitting ? 'Đang xử lý...' : 'Hoàn tất đăng ký'}
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
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
                  type="button"
                  onClick={() => handleSelectBusinessType(type)}
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
    </form>
  )
}
