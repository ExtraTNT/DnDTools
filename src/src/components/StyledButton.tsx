import React, { Component, ReactElement, SVGProps } from 'react'
import { memo } from 'react'
import useControlStyles from '../styles/controls'
import { useTheme } from 'react-jss'
import { Button } from 'grommet/components/Button'
import { clsj } from '../utils/joinClasses'
import { Icon, IconProps } from 'grommet-icons'

interface ButtonProps {
    fill?: boolean
    text?: string | null
    icon?: ReactElement | ReactElement<any, any> | null | Component<IconProps & SVGProps<SVGSVGElement>, any, any>
    className?: string
    margin?: string
    onClick: () => void
}

export const StyledButton = ({fill, text, icon, className, onClick, margin}: ButtonProps) => {

    const theme = useTheme()
    const classes = useControlStyles(theme)

    return <Button
            className={clsj(className, classes.button, (fill? classes.fill: undefined))}
            onClick={onClick}
            label={text}
            icon={icon}
            margin={margin}
        >
        </Button>
}

export default memo(StyledButton)
