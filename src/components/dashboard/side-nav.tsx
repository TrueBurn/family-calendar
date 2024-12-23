'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Settings } from 'lucide-react'

const navigation = [
  { name: 'Calendar', href: '/dashboard', icon: Calendar },
  { name: 'Family', href: '/dashboard/family', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function SideNav() {
  const pathname = usePathname()

  return (
    <nav className="flex w-64 flex-col border-r p-4">
      <div className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start',
                  pathname === item.href && 'bg-muted'
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
