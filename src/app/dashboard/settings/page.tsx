'use client'

import { CategoryManager } from '@/components/calendar/category-manager'

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold">Settings</h2>
      <CategoryManager />
    </div>
  )
}
