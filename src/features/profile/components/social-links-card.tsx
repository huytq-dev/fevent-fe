import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, Github, Linkedin, Share2, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"
import type { UserProfile } from "../types"

export function SocialLinksCard({ socials }: { socials: UserProfile["socials"] }) {
  return (
    <Card className="border-none shadow-sm ring-1 ring-gray-200">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Share2 className="h-5 w-5 text-blue-500" />
        <CardTitle className="text-base">Social Profiles</CardTitle>
      </CardHeader>
      <CardContent className="mt-2 space-y-4">
        {socials.linkedin && (
          <SocialItem
            icon={<Linkedin className="h-5 w-5 text-blue-700" />}
            label="LinkedIn"
            url={socials.linkedin}
          />
        )}
        {socials.github && (
          <SocialItem
            icon={<Github className="h-5 w-5" />}
            label="GitHub"
            url={socials.github}
          />
        )}
        {socials.facebook && (
          <SocialItem
            icon={<Facebook className="h-5 w-5 text-blue-600" />}
            label="Facebook"
            url={socials.facebook}
          />
        )}
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
