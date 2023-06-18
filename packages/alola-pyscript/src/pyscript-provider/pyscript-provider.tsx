import { createContext } from 'react'
import { IPackages } from '~/types/packages'

const PyscriptContext = createContext({
  packages: {} as IPackages,
  timeout: 0,
  lazy: false,
  terminateOnCompletion: false,
})

export const suppressedMessages = ['Pyscript initialization complete']

interface IPyscriptProviderProps {
  packages?: IPackages
  timeout?: number
  lazy?: boolean
  terminateOnCompletion?: boolean
  // eslint-disable-next-line
  children: any
}

function PyscriptProvider(props: IPyscriptProviderProps) {
  const { packages = {}, timeout = 0, lazy = false, terminateOnCompletion = false } = props

  return (
    <PyscriptContext.Provider
      value={{
        packages,
        timeout,
        lazy,
        terminateOnCompletion,
      }}
      {...props}
    />
  )
}

export { PyscriptContext, PyscriptProvider }
