import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

interface LoadingPageProps {
  message?: string
  className?: string
}

function LoadingPage({ message, className }: LoadingPageProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center gap-3",
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      {message && (
        <p className="text-sm text-muted-foreground">{message}</p>
      )}
    </div>
  )
}

export { LoadingPage }
export type { LoadingPageProps }
