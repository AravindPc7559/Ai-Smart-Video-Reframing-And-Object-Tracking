import ReactPlayer from 'react-player'
import { cn } from '@/shared/utils/helpers'

export type VideoPlayerProps = {
  videoUrl: string
  className?: string
}

export function VideoPlayer({ videoUrl, className }: VideoPlayerProps) {
  return (
    <div
      className={cn('relative w-full overflow-hidden rounded-lg bg-slate-900', className)}
      style={{ paddingTop: '56.25%' }}
    >
      <div className="absolute inset-0">
        <ReactPlayer
          src={videoUrl}
          controls
          width="100%"
          height="100%"
        />
      </div>
    </div>
  )
}
