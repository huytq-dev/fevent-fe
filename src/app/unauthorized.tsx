import StatusLayout from '@/components/errors/status-layout'
import StatusView from '@/components/errors/status-view'
import { LogIn } from 'lucide-react'

export default function Unauthorized() {
  return (
    <StatusLayout>
      <StatusView
        icon={<LogIn className="h-10 w-10 text-slate-600 dark:text-slate-400" />}
        bgIconColorClass="bg-slate-100 dark:bg-slate-800"
        title="titles.unauthorized"
        message="messages.unauthorized_detail"
        actionLabel="actions.login"
        actionLink="/login"
        showBackButton={false}
      />
    </StatusLayout>
  )
}
