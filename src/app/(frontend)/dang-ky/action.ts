'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { redirect } from 'next/navigation'
import { mapUserToBusinessTypeTable } from '@/utilities/mapUserToBusinessTypeTable'

export async function getBusinessTypes() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  
  if (!user?.id || !user.email) {
    redirect('/')
  }

  const payload = await getPayload({ config: configPromise })


  const businessTypes = await payload.find({
    collection: 'businessTypes',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })
  return businessTypes.docs
}

export async function handleRegistration({ storeName, businessTypeId }: { 
  storeName: string
  businessTypeId: number 
}) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user?.id || !user.email) {
    redirect('/')
  }

  const payload = await getPayload({ config: configPromise })

  try {
    // Update the TenseUsers collection
    await payload.update({
      collection: 'tenseusers',
      id: user.id,
      data: {
        storeName,
        businessType: businessTypeId,
      },
    })

    // Fetch the business type data
    const businessTypeData = await payload.findByID({
      collection: 'businessTypes',
      id: businessTypeId,
      select: {
        title: true,
        description: true,
      },
    })

    // Map user to new business type table
    const mappingResult = await mapUserToBusinessTypeTable(user.id, businessTypeData, payload)

    if (mappingResult.success) {
      // Redirect to /dashboard on success
      redirect('/dashboard')
    } else {
      throw new Error("An error occurred during registration. Please try again.")
    }
  } catch (error) {
    // Handle server-side errors and return a structured response
    return { success: false, message: error.message || "An unexpected error occurred during registration." }
  }
}