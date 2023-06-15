import { useLayoutEffect } from 'react'
import { useSignal } from '@preact/signals-react'

export interface IOrientation {
  angle: number
  type: string
}

const defaultProps: IOrientation = {
  angle: 0,
  type: 'landscape-primary',
}

export function useOrientation(initialValue: IOrientation = defaultProps) {
  const orientation = useSignal<IOrientation>(initialValue)

  useLayoutEffect(() => {
    const handleChange = () => {
      const { angle, type } = window.screen.orientation
      orientation.value = {
        angle,
        type,
      }
    }

    const handle_orientationchange = () => {
      orientation.value = {
        type: 'UNKNOWN',
        angle: window.orientation,
      }
    }

    if (window.screen?.orientation) {
      handleChange()
      window.screen.orientation.addEventListener('change', handleChange)
    } else {
      handle_orientationchange()
      window.addEventListener('orientationchange', handle_orientationchange)
    }

    return () => {
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', handleChange)
      } else {
        window.removeEventListener('orientationchange', handle_orientationchange)
      }
    }
  }, [])

  return orientation.value
}
