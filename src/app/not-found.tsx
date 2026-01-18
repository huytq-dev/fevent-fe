import StatusLayout from '@/components/errors/status-layout'
import StatusView from '@/components/errors/status-view'
import { CalendarFold } from 'lucide-react' 

export default function NotFound() {
  return (
    <StatusLayout>
      <StatusView
        icon={<CalendarFold className="h-10 w-10 text-orange-600 dark:text-orange-500" />}
        bgIconColorClass="bg-orange-100 dark:bg-orange-900/20"
        title="Không tìm thấy sự kiện"
        message="Sự kiện bạn tìm kiếm không tồn tại, đã bị hủy hoặc đường dẫn không đúng."
      />
    </StatusLayout>
  )
}