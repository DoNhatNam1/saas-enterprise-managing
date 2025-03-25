import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { redirect, unauthorized } from 'next/navigation'

export async function checkAndRedirect() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  // Scenario 1: User is not logged in
  if (!user?.id || !user.email) {
    unauthorized()
  }

  const payload = await getPayload({ config: configPromise })

  // Fetch the user's data from the `tenseusers` collection
  const userData = await payload.find({
    collection: 'tenseusers',
    where: {
      email: {
        equals: user.email,
      },
    },
  })

  // Scenario 2: User has not completed registration
  if (!userData.docs.length || !userData.docs[0].businessType) {
    // Redirect to /auth-callback to handle registration logic
    redirect('/auth-callback')
  }

  return user
}