import { checkAndRedirect } from '@/utilities/authRedirect'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await checkAndRedirect()
  return (
    <div className="h-screen w-screen fixed inset-0 bg-background z-50">
      {children}
    </div>
  )
}
