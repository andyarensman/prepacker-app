import { useContext } from 'react'

// context
import { ClosetContext } from '../context/ClosetContext'


export const useClosetContext = () => {
  const context = useContext(ClosetContext)

  if (!context) {
    throw Error('useClosetContext must be used inside a ClosetContextProvider')
  }

  return context
}