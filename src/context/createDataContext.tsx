import React, { useReducer } from 'react';

export default (
  reducer: any,
  actions: { [index: string]: Function },
  initialState: any
) => {
  const Context = React.createContext(initialState);

  const Provider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions: { [index: string]: Function } = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
