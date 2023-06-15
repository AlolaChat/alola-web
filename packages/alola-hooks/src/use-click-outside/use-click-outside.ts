import { useEffect, useRef } from 'react'

const DEFAULT_EVENTS = ['mousedown', 'mouseup', 'touchstart', 'touchend']

export interface IUseClickOutsideProps {
  /**
   * Whether the hook is enabled
   */
  enabled?: boolean

  /**
   * Function invoked when a click is triggered outside the referenced element.
   */
  handler: (e?: Event) => void

  /**
   * List event handler
   */
  events?: string[] | null

  /**
   * List element
   */
  nodes?: (HTMLElement | null)[]
}

export function useClickOutside<T extends HTMLElement = any>({
  handler,
  events,
  nodes,
  enabled,
}: IUseClickOutsideProps) {
  const ref = useRef<T>()

  useEffect(() => {
    if (!enabled) return

    const listener = (event: any) => {
      const { target } = event ?? {}
      if (Array.isArray(nodes)) {
        const shouldIgnore =
          target?.hasAttribute('data-ignore-outside-clicks') ||
          (!document.body.contains(target) && target.tagName !== 'HTML')
        const shouldTrigger = nodes.every((node) => !!node && !event.composedPath().includes(node))
        shouldTrigger && !shouldIgnore && handler(event)
      } else if (ref.current && !ref.current.contains(target)) {
        handler(event)
      }
    }

    ;(events || DEFAULT_EVENTS).forEach((fn) => document.addEventListener(fn, listener))

    return () => {
      ;(events || DEFAULT_EVENTS).forEach((fn) => document.removeEventListener(fn, listener))
    }
  }, [ref, handler, nodes])

  return ref
}
