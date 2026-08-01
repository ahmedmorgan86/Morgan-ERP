"use client"

import * as React from "react"
import { type UseFormReturn } from "react-hook-form"
import { FormProvider } from "react-hook-form"

import { cn } from "@/lib/utils"

interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>
  onSubmit: React.FormEventHandler<HTMLFormElement>
  children: React.ReactNode
  className?: string
}

export function Form({ form, onSubmit, children, className }: FormProps) {
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className={cn("space-y-6", className)}>
        {children}
      </form>
    </FormProvider>
  )
}
