import StatusLayout from '@/components/errors/status-layout'
import StatusView from '@/components/errors/status-view'
import { LogIn } from 'lucide-react'
import { ROUTES } from '@/config/routes'

export default function Unauthorized() {
  return (
    <StatusLayout>
      <StatusView
        icon={<LogIn className="h-10 w-10 text-slate-600 dark:text-slate-400" />}
        bgIconColorClass="bg-slate-100 dark:bg-slate-800"
        title="Không có quyền truy cập"
        message="Bạn không có quyền truy cập trang này. Vui lòng đăng nhập để tiếp tục."
        actionLabel="Đăng nhập"
        actionLink={ROUTES.LOGIN}
        showBackButton={false}
      />
    </StatusLayout>
  )
}
