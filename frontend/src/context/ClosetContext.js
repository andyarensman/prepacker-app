import { createContext, useReducer } from "react";

export const ClosetContext = createContext()

export const closetReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CLOSET':
      return {
        closet: action.payload
      }
    case 'CREATE_GEAR':
      return {
        closet: [action.payload, ...state.closet]
      }
    case 'DELETE_GEAR':
      return {
        closet: state.closet.filter((gear) => gear._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const ClosetContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(closetReducer, {
    closet: null
  })

  return (
    <ClosetContext.Provider value={{...state, dispatch}}>
      { children }
    </ClosetContext.Provider>
  );
}