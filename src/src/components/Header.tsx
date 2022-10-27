import React from 'react'
import { useHistory } from "react-router-dom"
import { useTheme } from 'react-jss'
import useControlStyles from '../styles/controls'
import { clsj } from '../utils/joinClasses'
import { memo } from 'react'
import config from '../config'
import { ThemeSwitch } from './ThemeSwitch'
import { Box, Clock, Header, Text } from 'grommet'

export const Head = (props) => {
    const history = useHistory()
    const theme = useTheme()
    const classes = useControlStyles({ ...props, theme })
    return <Header height='xxsmall' direction='row' justify='between' align='center'>     
        <Text onClick={() => history.push('/')}>{config.title}</Text>
        <Clock type='digital' />
        <ThemeSwitch/>
    </Header>
}

export default memo(Head)
