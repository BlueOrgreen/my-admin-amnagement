import React, { createContext, PropsWithChildren, useContext } from 'react'

type ContainerType = {
  containerName: string
  containerNo: string
  disabled: boolean
}

type MultiVersionState = {
  containers: ContainerType[]
  setContainers: (callback: (data: ContainerType[] | undefined) => void) => void
}

export const MultiVersionContext = createContext<MultiVersionState>({
  containers: [],
  setContainers: () => {},
})

export const MultiVersionProvider = (
  props: PropsWithChildren<{
    value: {
      containers: ContainerType[]
      setContainers: (
        callback: (data: ContainerType[] | undefined) => void,
      ) => void
    }
  }>,
) => {
  const { value } = props
  return (
    <MultiVersionContext.Provider value={value}>
      {props.children}
    </MultiVersionContext.Provider>
  )
}

export const useMultiVersionContext = () => {
  const data = useContext(MultiVersionContext)
  return data
}
