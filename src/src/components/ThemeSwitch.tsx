import * as React from 'react'
import { useState, useEffect } from 'react'
import { useThemeSwitch } from '../contexts/theme'
import lightTheme from '../themes/light'
import darkTheme from '../themes/dark'
import paper from '../themes/paper'
import arcTheme from '../themes/arc'
import { Select } from 'grommet/components/Select'
import config from '../config'

interface Props {
    className?: string
}
export const ThemeSwitch = ({className}:Props) => {

    const [, , setThemeContext] = useThemeSwitch()

    const themes = {
        'dark': darkTheme,
        'light': lightTheme,
        'paper': paper,
        'arc': arcTheme
    }
    const options:string[] = Object.keys(themes)
    
    const [ selectedTheme, setSelectedTheme ] = useState<string>(localStorage.getItem('theme') || config.defaultTheme)

    useEffect(() => {
        setThemeContext(themes[selectedTheme])
        localStorage.setItem('theme', selectedTheme)
    }, [selectedTheme])

    return <Select size='small' className={className} options={options} value={selectedTheme} onChange={({ option }) => setSelectedTheme(option)} />
}