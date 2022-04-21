import * as React from 'react'
import { render } from 'react-dom'
import { App } from './components/App'
import {ThemeProvider} from './components/ThemeProvider'
import { SettingsProvider } from './components/SettingsProvider' 
import '@fontsource/roboto'

// add providers for stuff
render(
    <SettingsProvider>
        <ThemeProvider>
                <App/>
        </ThemeProvider>
    </SettingsProvider>
, document.getElementById('app'))