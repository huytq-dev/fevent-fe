import StatusLayout from '@/components/errors/status-layout'
import StatusView from '@/components/errors/status-view'
import { ShieldAlert } from 'lucide-react'

export default function Forbidden() {
  return (
    <StatusLayout>
      <StatusView
        icon={<ShieldAlert className="h-10 w-10 text-red-600 dark:text-red-500" />}
        bgIconColorClass="bg-red-100 dark:bg-red-900/20"
        title="titles.forbidden"
        message="messages.forbidden_detail"
      />
    </StatusLayout>
  )
}
