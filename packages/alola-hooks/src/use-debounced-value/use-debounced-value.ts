import { useEffect, useRef } from 'react'
import { useSignal } from '@preact/signals-react'

export function useDebouncedValue<T = any>(value: T, wait: number, options = { leading: false }) {
  const _value = useSignal<T>(value)
  const mountedRef = useRef(false)
  const timeoutRef = useRef<number>(null)
  const cooldownRef = useRef(false)

  const cancel = () => window.clearTimeout(timeoutRef.current)

  useEffect(() => {
    if (mountedRef.current) {
      if (!cooldownRef.current && options.leading) {
        cooldownRef.current = true
        _value.value = value
      } else {
        cancel()
        timeoutRef.current = window.setTimeout(() => {
          cooldownRef.current = false
          _value.value = value
        }, wait)
      }
    }
  }, [value, options.leading, wait])

  useEffect(() => {
    mountedRef.current = true
    return cancel
  }, [])

  return [_value.value, cancel] as const
}
