import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import React from 'react'
import type { Header } from '@/payload-types'

export async function Header() {
  const header: Header = await getCachedGlobal('header', 1)()
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const isAuthenticated = !!(user?.id && user?.email)

  return <HeaderClient header={header} isAuthenticated={isAuthenticated} />
}
