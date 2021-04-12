import { useState, createContext } from 'react';

export const AppContext = createContext()

function StoreProvider({children}) {

    const [showSidebar, setShowSidebar] = useState(true)

    function toogleSidebar() {
        setShowSidebar(!showSidebar)
    }

    const store = {
        showSidebar,
        toogleSidebar
    }

    return (
        <AppContext.Provider value={store}>
            {children}
        </AppContext.Provider>
    )
}

export default StoreProvider