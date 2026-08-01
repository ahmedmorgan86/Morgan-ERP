"use client"

import * as React from "react"
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>
  name: TName
  label: string
  description?: string
  required?: boolean
  children: (field: {
    value: TFieldValues[TName]
    onChange: (...event: unknown[]) => void
    onBlur: () => void
    disabled?: boolean
    name: TName
    ref: React.RefCallback<unknown>
  }) => React.ReactNode
  className?: string
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  description,
  required,
  children,
  className,
}: FormFieldProps<TFieldValues, TName>) {
  const id = React.useId()

  return (
    <Controller
      control={control}
      name={name}
        render={({ field, fieldState }) => (
        <div className={cn("space-y-2", className)}>
          <Label htmlFor={id} className={cn(required && "after:ml-0.5 after:text-destructive after:content-['*']")}>
            {label}
          </Label>
          {children(field)}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {fieldState.error?.message && (
            <p className="text-sm font-medium text-destructive">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  )
}
