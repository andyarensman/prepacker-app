import { useAuthContext } from './useAuthContext'
import { useClosetContext } from './useClosetContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: closetDispatch } = useClosetContext()
  
  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout function
    dispatch({type: 'LOGOUT'})
    closetDispatch({ type: 'SET_CLOSET', payload: null })
    closetDispatch({ type: 'SET_CHECKLISTS', payload: null })
    window.localStorage.removeItem('PREPACK_NEW_CHECKLIST')
  }

  return { logout }
}