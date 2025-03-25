import { checkAndRedirect } from '@/utilities/authRedirect'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

export default async function AuthCallBackLayout({ children }: { children: React.ReactNode }) {
  await checkAndRedirect()
  const { getUser } = getKindeServerSession()
    const user = await getUser()
    const payload = await getPayload({ config: configPromise })
    // Check if user has already completed registration
    const existingUser = await payload.find({
      collection: 'tenseusers',
      where: {
        email: {
          equals: user.email,
        },
      },
    })
  
    if (existingUser.docs.length && existingUser.docs[0].businessType) {
      redirect('/dashboard')
    }
  return (
    <div className="h-screen w-screen fixed inset-0 bg-background z-50">
      {children}
    </div>
  )
}
