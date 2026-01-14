import StatusLayout from '@/components/errors/status-layout'
import StatusView from '@/components/errors/status-view'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <StatusLayout>
      <StatusView
        icon={<FileQuestion className="h-10 w-10 text-orange-600 dark:text-orange-500" />}
        bgIconColorClass="bg-orange-100 dark:bg-orange-900/20"
        title="titles.not_found"
        message="messages.not_found_detail"
      />
    </StatusLayout>
  )
}
