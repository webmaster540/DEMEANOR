import MuxPlayer from '@mux/mux-player-react'

type VideoPlayerProps = {
  playbackId: string | null;
}

export default function VideoPlayer({ playbackId }: VideoPlayerProps) {
  return (
    <MuxPlayer
      playbackId={playbackId || ""}
      autoPlay
      muted
      loop
      data-mux-controls="false"
      className="w-full h-full object-cover filter brightness-125 sepia hue-rotate-140 saturate-200"
    />
  )
}
