import React, { useState } from 'react'
import { useTheme } from 'react-jss'
import useControlStyles from '../styles/controls'
import { TextInput } from 'grommet'
import { StyledButton } from './StyledButton'
import { Subtract, Add } from 'grommet-icons'
import { clsj } from '../utils/joinClasses'

interface ListProps {
    values: Array<string> | string
    readOnly?: boolean
    onChange: (changedValue: Array<string> | string) => void
}

export const ListInput = ({ values, onChange, readOnly }: ListProps) => {
    const normalizedValue = Array.isArray(values) ? values : [values]

    const [newValue, setNewValue] = useState<string>('')

    const handleAdd = () => {
        const result = [...normalizedValue, newValue]
        result.length == 1 ? onChange(result[0]) : onChange(result)
        setNewValue('')
    }

    const handleRemove = (indexToRemove: number) => {
        const result = [...normalizedValue.reduce((accumulator, currentValue, currentIndex) => currentIndex == indexToRemove ? accumulator : [...accumulator, currentValue], [])]
        result.length == 1 ? onChange(result[0]) : onChange(result)
    }

    const theme = useTheme()
    const classes = useControlStyles(theme)

    return <div className={clsj(classes.flexColumn)}>
        {normalizedValue.map((v, i) => <div key={i} className={classes.flexRow}>
            <TextInput type="text" value={v} disabled={true} className={classes.input}/>
            {!readOnly && <StyledButton onClick={() => handleRemove(i)} icon={<Subtract/>}/>}
        </div>)}
        {!readOnly && <div className={clsj(classes.flexRow)}>
            <TextInput type="text" value={newValue} disabled={false} onChange={(e) => setNewValue(e.target.value)} className={classes.input}/>
            <StyledButton onClick={() => handleAdd()} icon={<Add/>}/>
        </div>}
    </div>
}