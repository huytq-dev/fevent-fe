import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, Github, Linkedin, Share2, ExternalLink, Globe, Link2 } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"
import type { UserProfile } from "../types"

type SocialLink = { platform: number; url: string }

const platformMeta = (platform: number) => {
  switch (platform) {
    case 1:
      return { label: "Facebook", icon: <Facebook className="h-5 w-5 text-blue-600" /> }
    case 2:
      return { label: "LinkedIn", icon: <Linkedin className="h-5 w-5 text-blue-700" /> }
    case 3:
      return { label: "GitHub", icon: <Github className="h-5 w-5" /> }
    case 4:
      return { label: "Website", icon: <Globe className="h-5 w-5 text-emerald-600" /> }
    default:
      return { label: "Liên kết", icon: <Link2 className="h-5 w-5 text-gray-600" /> }
  }
}

export function SocialLinksCard({ socialLinks }: { socialLinks?: UserProfile["socialLinks"] }) {
  const links = (socialLinks || []).filter((item): item is SocialLink => !!item?.url)

  return (
    <Card className="border-none shadow-sm ring-1 ring-gray-200">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Share2 className="h-5 w-5 text-blue-500" />
        <CardTitle className="text-base">Social Profiles</CardTitle>
      </CardHeader>
      <CardContent className="mt-2 space-y-4">
        {links.length === 0 && (
          <p className="text-sm text-muted-foreground">Chưa có liên kết mạng xã hội.</p>
        )}
        {links.map((item, index) => {
          const meta = platformMeta(item.platform)
          return (
            <SocialItem
              key={`${item.platform}-${index}`}
              icon={meta.icon}
              label={meta.label}
              url={item.url}
            />
          )
        })}
      </CardContent>
    </Card>
  )
}

function SocialItem({ icon, label, url }: { icon: ReactNode; label: string; url: string }) {
  return (
    <div className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-50">
      <div className="flex items-center gap-3">
        {icon}
        <div className="flex flex-col">
          <span className="text-sm font-medium">{label}</span>
          <span className="max-w-[150px] truncate text-xs text-muted-foreground">{url}</span>
        </div>
      </div>
      <Link href={url} target="_blank" rel="noreferrer" aria-label={`Open ${label}`}>
        <ExternalLink className="h-4 w-4 text-gray-400 hover:text-orange-500" />
      </Link>
    </div>
  )
}
