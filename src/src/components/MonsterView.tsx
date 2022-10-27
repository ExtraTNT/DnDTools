import React, { useState } from 'react'
import { memo } from 'react'
import useControlStyles from '../styles/controls'
import { DefaultTheme, useTheme } from 'react-jss'
import StyledButton from './StyledButton'
import {
    Box,
    Text,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Select
} from 'grommet'
import { useSetting } from '../contexts/settings'
import { get } from '../services/localObjectStorage'
import { clsj } from '../utils/joinClasses'
import Popup from './Popup'
import {getMod} from '../utils/stats'
import {toHumanreadableString} from '../utils/resistanceAndImmunities'

interface MonsterViewProps {
    className?: string
}
interface Monster {
    title: string
    notes: Array<string>
    actions: Array<string>
    abilities: Array<string>
    resistances:  Array<string>
    immunities: Array<string>
    str: number
    dex: number
    con: number
    int: number
    wis: number
    cha: number
    ac: number
    hp: number
    languages: Array<string>
}

const dbKey = 'monster'

export const MonsterView = ({className}: MonsterViewProps) => {
    const [loadActive, setLoadActive] = useState<boolean>(false)
    const [loadSelected, setLoadSelected] = useState<string>()
    // TODO currently testing
    const [monster, setMonster] = useState<Monster>({
        title: "",
        notes: [],
        actions: [],
        abilities: [],
        resistances: [],
        immunities: [],
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0,
        ac: 0,
        hp: 0,
        languages: [],
    })
    const theme:DefaultTheme = useTheme()
    const classes = useControlStyles(theme)
    const loadKeysFromLocalStorage = () => {
        return Object.keys(readFromLocalStorage() || {})
    }
    const readFromLocalStorage = () => {
        return get(dbKey)
    }
    const load = () => {
        setLoadActive(true)
    }
    const setLoaded = () => {
        if(loadSelected == null){
            return
        }
        setMonster(readFromLocalStorage()[loadSelected])
        setLoadActive(false)
    }

    return <Box className={className} >
        <Box pad='xsmall' direction='column'>
            <Text className={classes.middle}>{monster.title}</Text>
            <Box pad='xsmall' direction='row' wrap justify='between'>
                <Text>HP: {monster.hp}</Text>
                <Text>AC: {monster.ac}</Text>
            </Box>
            {monster.notes.map(v => <Text className={classes.breakWord}>
                {v}
            </Text>)}
            {/*2 boxes may not be optimal*/}
            <Box pad='xsmall' direction='row' wrap justify='between'>
                <Text>STR: {monster.str} ({getMod(monster.str)})</Text>
                <Text>DEX: {monster.dex} ({getMod(monster.dex)})</Text>
                <Text>CON: {monster.con} ({getMod(monster.con)})</Text>
            </Box>
            <Box pad='xsmall' direction='row' wrap justify='between'>
                <Text>INT: {monster.int} ({getMod(monster.int)})</Text>
                <Text>WIS:{monster.wis} ({getMod(monster.wis)})</Text>
                <Text>CHA: {monster.cha} ({getMod(monster.cha)})</Text>
            </Box>
            <Text>{toHumanreadableString(monster["resistances"], "resistance")}</Text>
            <Text>{toHumanreadableString(monster["immunities"], "immunity")}</Text>
            <h2>Abilities:</h2>
            {monster.abilities.map(v => <Text className={classes.breakWord}>
                {v}
            </Text>)}
            <h2>Actions:</h2>
            {monster.actions.map(v => <Text className={classes.breakWord}>
                {v}
            </Text>)}
            <Box pad='xsmall' direction='row' justify='evenly' wrap>
                <StyledButton onClick={load} text={"Load"}/>
            </Box>
        </Box>
        <Popup active={loadActive} >
            <Card>
                <CardHeader pad="small" className={classes.middle}>
                    <h1>Load From Local Storrage</h1>
                </CardHeader>
                <CardBody>
                    <Box>
                        <Select
                            options={loadKeysFromLocalStorage()}
                            value={loadSelected}
                            onChange={(o) => setLoadSelected(o.target.value)}
                        />
                    </Box>
                </CardBody>
                <CardFooter pad="small" className={clsj(classes.middle)}>
                    <StyledButton text="Load" onClick={() => setLoaded()}/>
                    <StyledButton
                        text="Cancle"
                        onClick={() => setLoadActive(false)}
                    />
                </CardFooter>
            </Card>
        </Popup>
    </Box>
}

export default memo(MonsterView)

