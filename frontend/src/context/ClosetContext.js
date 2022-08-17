import { createContext, useReducer } from "react";

export const ClosetContext = createContext()

export const closetReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CLOSET':
      return {
        ...state,
        closet: action.payload
      }
    case 'CREATE_GEAR':
      return {
        ...state,
        closet: [action.payload, ...state.closet]
      }
    case 'DELETE_GEAR':
      return {
        ...state,
        closet: state.closet.filter((gear) => gear._id !== action.payload._id)
      }
    case 'SET_CHECKLISTS':
      return {
        ...state,
        checklists: action.payload
      }
    case 'CREATE_CHECKLIST':
      return {
        ...state,
        checklists: [action.payload, ...state.checklists]
      }
    case 'DELETE_CHECKLIST':
      return {
        ...state,
        checklists: state.checklists.filter((checklist) => checklist._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const ClosetContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(closetReducer, {
    closet: null,
    checklists: null
  })

  return (
    <ClosetContext.Provider value={{...state, dispatch}}>
      { children }
    </ClosetContext.Provider>
  );
}