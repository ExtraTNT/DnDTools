import React, { useState } from 'react'
import SettingsContext from '../contexts/settings'
export const SettingsProvider = ({ children }) => {
    const [value, setValue] = useState<any>({})
    const get = (id:string) => value[id]
    const set = (v:any, id:string) => {
        const c = {...value}
        c[id] = v
        setValue(c)
    }
    return <SettingsContext.Provider value={[get, value, set]}>
        {children}
    </SettingsContext.Provider>
}