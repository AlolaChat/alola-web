import { useState } from 'react'

import { Remote } from 'comlink'
import { IRunner } from '~/types/runner'

interface IUseFilesystemProps {
  runner: Remote<IRunner> | undefined
}

export default function useFilesystem(props: IUseFilesystemProps) {
  const { runner } = props

  const [watchedModules, setWatchedModules] = useState<Set<string>>(new Set())

  const readFile = (name: string) => {
    return runner?.readFile(name)
  }

  const writeFile = (name: string, data: string) => {
    return runner?.writeFile(name, data)
  }

  const mkdir = (name: string) => {
    return runner?.mkdir(name)
  }

  const rmdir = (name: string) => {
    return runner?.rmdir(name)
  }

  const watchModules = (moduleNames: string[]) => {
    setWatchedModules((prev) => new Set([...prev, ...moduleNames]))
  }

  const unwatchModules = (moduleNames: string[]) => {
    setWatchedModules((prev) => new Set([...prev].filter((e) => !moduleNames.includes(e))))
  }

  return {
    readFile,
    writeFile,
    mkdir,
    rmdir,
    watchModules,
    unwatchModules,
    watchedModules,
  }
}
