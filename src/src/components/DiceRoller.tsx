import React from 'react'
import { memo } from 'react'
import useControlStyles from '../styles/controls'
import { DefaultTheme, useTheme } from 'react-jss'
import StyledButton from './StyledButton'
import { Box, TextInput, Text } from 'grommet'
import { useSetting } from '../contexts/settings'

interface DiceProps {
    className?: string
}

export const DiceRoller = ({className}: DiceProps) => {
    const [dice, setDice] = React.useState([[1,20,0,1]])
    const [numb, setNumb] = React.useState(0)
    const [getSettings, , setSettings] = useSetting()
    const storeKey = "lastRolledResult"
    
    const calculate = () =>{
        // reduceing array accesses with a total value
        let total:number = 0
        dice.forEach(n => {
            let diceRolls: number = 0;
            for (let i = 0; i < n[0]; i++) {
                let rand:number = (Math.random() * n[1]) + 1
                rand -= rand%1
                diceRolls += rand
            }
            total += diceRolls + (n[3]? n[2] : -n[2])
        })
        setNumb(total)
        setSettings(total, storeKey)
    }
    const add = () => setDice([...dice, [1,6,0]])
    const rm = () => {
        const d = [...dice]
        d.pop()
        setDice(d)
    }
    const change = (value, id, pos) => {
        let d = [...dice]
        d[id][pos] = parseInt(value || 0)
        setDice(d)
    }

    const theme:DefaultTheme = useTheme()
    const classes = useControlStyles(theme)

    return <Box className={className} >
        {dice.map((dice, i) => <Box  pad='small' direction='row' key={i}>
            <TextInput size='small' value={dice[0]} onChange={(e) => change(e.target.value, i, 0)} className={classes.input}/>
            <Text margin='small'>D</Text>
            <TextInput size='small' value={dice[1]} onChange={(e) => change(e.target.value, i, 1)} className={classes.input}/>
            <Text margin='small' onClick={() => change((dice[3]? 0 : 1),i,3)}>{dice[3]? "+" : "-"}</Text>
            <TextInput size='small' value={dice[2]} onChange={(e) => change(e.target.value, i, 2)} className={classes.input}/>
            </Box>)}
            <Box pad='small' direction='row'>
                <TextInput size='small' value={numb} className={classes.input}/>
            
                <StyledButton margin='xxsmall' onClick={add} text='+'/>
                <StyledButton margin='xxsmall' onClick={rm} text='-'/>
                <StyledButton margin='xxsmall' onClick={calculate} text='='/>
            </Box>
    </Box>
}

export default memo(DiceRoller)
