import { createContext, useMemo, useState } from 'react'

const StateContext = createContext()

const StateProvider = ({ children }) => {
  const [rooms, setRooms] = useState()

  const value = useMemo(() => ({ rooms, setRooms }), [rooms])
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}
export { StateProvider, StateContext }
