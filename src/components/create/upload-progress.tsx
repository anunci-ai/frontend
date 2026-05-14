function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

interface UploadProgressProps {
  fileName: string
  progress: number
  fileSize?: number
}

export function UploadProgress({ fileName, progress, fileSize }: UploadProgressProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="truncate font-medium text-foreground">{fileName}</span>
        <span className="shrink-0 text-muted-foreground">{progress}%</span>
      </div>
      {fileSize !== undefined && (
        <p className="text-xs text-muted-foreground">{formatBytes(fileSize)}</p>
      )}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
