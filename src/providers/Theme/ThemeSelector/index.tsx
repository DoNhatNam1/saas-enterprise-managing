'use client'

import { useTheme } from ".."
import DarkModeToggle from "@/components/ui/darkmodetoggle"

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (isDark: boolean) => {
    setTheme(isDark ? 'dark' : 'light')
  }

  return <DarkModeToggle onToggle={handleThemeChange} defaultDark={theme === 'dark'} />
}
