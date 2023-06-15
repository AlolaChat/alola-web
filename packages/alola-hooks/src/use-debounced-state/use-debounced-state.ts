import { useEffect, useRef, useState } from 'react'
import { useSignal } from '@preact/signals-react'

export function useDebouncedState<T = any>(
  defaultValue: T,
  wait: number,
  options = { leading: false }
) {
  const value = useSignal<T>(defaultValue)
  const timeoutRef = useRef<number>(null)
  const leadingRef = useRef(true)

  const clearTimeout = () => window.clearTimeout(timeoutRef.current)
  useEffect(() => clearTimeout, [])

  const debouncedSetValue = (newValue: T) => {
    clearTimeout()
    if (leadingRef.current && options.leading) {
      value.value = newValue
    } else {
      timeoutRef.current = window.setTimeout(() => {
        leadingRef.current = true
        value.value = newValue
      }, wait)
    }
    leadingRef.current = false
  }

  return [value.value, debouncedSetValue] as const
}
