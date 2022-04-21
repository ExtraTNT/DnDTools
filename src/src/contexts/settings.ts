import { createContext, useContext } from 'react'

export type SettingContextType = [
    getSetting: (id:string) => any,
    setting: {},
    setSetting: (value:any, id:string) => void
]

const SettingContext = createContext<SettingContextType>([() => null, {}, () => null])
export const useSetting = () => useContext(SettingContext)
export default SettingContext