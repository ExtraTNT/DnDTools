import React from 'react'
import { memo } from 'react'
import { Footer } from '../components/Footer'
import { Head } from '../components/Header'
import Sidebar from '../components/Sidebar'
import useControlStyles from '../styles/controls'
import { useTheme } from 'react-jss'
import { clsj } from '../utils/joinClasses'
import { Box } from 'grommet'


export const Layout = (props) => {

    const theme = useTheme()
    const classes = useControlStyles({ ...props, theme })


    return <Box className={clsj(classes.layout, classes.grow, classes.app)}>
        <Head/>
        {props.children}
    </Box>
}

export default memo(Layout)
