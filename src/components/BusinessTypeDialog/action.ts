"use server"

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getBusinessTypes() {
  try {
    const payload = await getPayload({ config: configPromise })
    const businessTypes = await payload.find({
      collection: 'businessTypes',
      draft: false,
      limit: 1000,
      overrideAccess: false,
    })
    return businessTypes.docs

  } catch (error) {
    // console.error('Error fetching business types:', error)
    throw new Error('Failed to fetch business types')
  }
}
