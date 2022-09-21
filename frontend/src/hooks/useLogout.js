//! make sure to update Navbar (#11 4:00) and update css (5:50)

import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout function
    dispatch({type: 'LOGOUT'})
  }

  return {logout}
}