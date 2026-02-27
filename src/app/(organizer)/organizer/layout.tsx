import { OrganizerShell } from "@/features/organizer/components/organizer-shell"

export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  return <OrganizerShell>{children}</OrganizerShell>
}
