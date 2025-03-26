'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getAuthStatus() {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    const payload = await getPayload({ config: configPromise })
    const existingUser = await payload.find({
      collection: 'tenseusers',
      where: {
        email: {
          equals: user.email,
        },
      },
    })

    if (existingUser.docs.length) {
      const userDoc = existingUser.docs[0]
      
      await payload.update({
        collection: 'tenseusers',
        id: userDoc.id,
        data: { lastLoginAt: new Date().toISOString() },
      })

      return {
        success: true,
        shouldCompleteRegistration: !userDoc.businessType
      }
    }

    // Create new user
    await payload.create({
      collection: 'tenseusers',
      data: {
        id: user.id,
        email: user.email,
        firstName: user.given_name || '',
        lastName: user.family_name || '',
        subscriptionStatus: 'free',
        lastLoginAt: new Date().toISOString(),
      } as any
    })

    return {
      success: true,
      shouldCompleteRegistration: true
    }
    
  } catch (error) {
    throw error
  }
}
