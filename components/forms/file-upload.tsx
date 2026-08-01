"use client"

import * as React from "react"
import { Upload, X, FileIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  accept?: string
  maxSize?: number
  onChange?: (file: File | null) => void
  value?: File | null
  disabled?: boolean
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export function FileUpload({
  accept,
  maxSize = 10 * 1024 * 1024,
  onChange,
  value,
  disabled,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFile = React.useCallback(
    (file: File | null) => {
      if (file && maxSize && file.size > maxSize) {
        return
      }
      onChange?.(file)
    },
    [maxSize, onChange]
  )

  const handleDragOver = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) setIsDragOver(true)
    },
    [disabled]
  )

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      if (disabled) return
      const file = e.dataTransfer.files?.[0] ?? null
      handleFile(file)
    },
    [disabled, handleFile]
  )

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null
      handleFile(file)
      if (inputRef.current) inputRef.current.value = ""
    },
    [handleFile]
  )

  const handleRemove = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onChange?.(null)
    },
    [onChange]
  )

  if (value) {
    return (
      <div className="flex items-center gap-3 rounded-md border p-3">
        <FileIcon className="h-8 w-8 shrink-0 text-muted-foreground" />
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium">{value.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatFileSize(value.size)}
          </p>
        </div>
        {!disabled && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove file</span>
          </Button>
        )}
      </div>
    )
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-8 text-center transition-colors",
        "cursor-pointer hover:border-muted-foreground/50",
        isDragOver && "border-primary bg-primary/5",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <Upload className="h-8 w-8 text-muted-foreground" />
      <div className="space-y-1">
        <p className="text-sm font-medium">
          Drag & drop or click to browse
        </p>
        {accept && (
          <p className="text-xs text-muted-foreground">
            Accepted: {accept}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Max size: {formatFileSize(maxSize)}
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={disabled}
        className="hidden"
      />
    </div>
  )
}
