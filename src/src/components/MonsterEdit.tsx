import React, { useState } from 'react'
import { memo } from 'react'
import useControlStyles from '../styles/controls'
import { DefaultTheme, useTheme } from 'react-jss'
import StyledButton from './StyledButton'
import { Box, TextInput, Text, TextArea, Card, CardBody, CardFooter, CardHeader, Select } from 'grommet'
import { useSetting } from '../contexts/settings'
import { get, set } from '../services/localObjectStorage'
import { clsj } from '../utils/joinClasses'
import Popup from './Popup'
import { ListInput } from './ListInput'

interface MonsterEditProps {
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

export const MonsterEdit = ({className}: MonsterEditProps) => {
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
    const change = (value:string | number | string[], key:string) => {
        let cp = {...monster}
        cp[key] = value
        setMonster(cp)
    }
    const save = () => {
        !get(dbKey) && set(dbKey, {})
        let items = readFromLocalStorage()
        items[monster.title] = monster
        set(dbKey, items)
    }
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
// TODO fix list with listInputs... fuck this shit
    return <Box className={className} >
        <Box pad='xsmall' direction='column'>
            <TextInput value={monster.title} onChange={(e) => change(e.target.value, 'title')} />
            <Box direction='column' align='top' pad='xsmall' wrap className={clsj(classes.hMaxFit)}>
                <Box direction='column' align='center' pad='xsmall'>
                    <Text>Notes</Text>
                    <ListInput values={monster.notes} onChange={(e) => change(e, 'notes')} />
                </Box>
                <Box direction='column' align='center' pad='xsmall'>
                    <Text>Abilities</Text>
                    <ListInput values={monster.abilities} onChange={(e) => change(e, 'abilities')} />
                </Box>
                <Box direction='column' align='center' pad='xsmall'>
                    <Text>Actions</Text>
                    <ListInput values={monster.actions} onChange={(e) => change(e, 'actions')} />
                </Box>
                <Box direction='column' align='center' pad='xsmall'>
                    <Text>Languages</Text>
                    <ListInput values={monster.languages} onChange={(e) => change(e, 'languages')} />
                </Box>
                <Box direction='column' align='center' pad='xsmall'>
                    <Text>Resistances</Text>
                    <ListInput values={monster.resistances} onChange={(e) => change(e, 'resistances')} />
                </Box>
                <Box direction='column' align='center' pad='xsmall'>
                    <Text>Immunities</Text>
                    <ListInput values={monster.immunities} onChange={(e) => change(e, 'immunities')} />
                </Box>
            </Box>
            <Box pad='xsmall' direction='row'>
                <Box direction='column' align='center' pad='xsmall'>
                    <Text>Str: </Text>
                    <TextInput value={monster.str} onChange={(e) => change(e.target.value, 'str')} />
                </Box>
                <Box direction='column' align='center' pad='xsmall'> 
                    <Text>Dex: </Text>
                    <TextInput value={monster.dex} onChange={(e) => change(e.target.value, 'dex')} />
                </Box>
                <Box direction='column' align='center' pad='xsmall'>
                    <Text>Con: </Text>
                    <TextInput value={monster.con} onChange={(e) => change(e.target.value, 'con')} />
                </Box>
                <Box direction='column' align='center' pad='xsmall'>
                    <Text>Int: </Text>
                    <TextInput value={monster.int} onChange={(e) => change(e.target.value, 'int')} />
                </Box>
                <Box direction='column' align='center' pad='xsmall'>
                    <Text>Wis: </Text>
                    <TextInput value={monster.wis} onChange={(e) => change(e.target.value, 'wis')} />
                </Box>
                <Box direction='column' align='center' pad='xsmall'>
                    <Text>Cha: </Text>
                    <TextInput value={monster.cha} onChange={(e) => change(e.target.value, 'cha')} />
                </Box>
            </Box>
            <ListInput values={monster.languages} onChange={(e) => change(e, 'languages')}/>
            <Box pad='xsmall' direction='row' justify='evenly' wrap>
                <StyledButton onClick={save} text={"Save"}/>
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
                        <Select options={loadKeysFromLocalStorage()} value={loadSelected} onChange={(o) => setLoadSelected(o.target.value)}/>
                    </Box>
                </CardBody>
                <CardFooter pad="small" className={clsj(classes.middle)}>
                    <StyledButton text="Load" onClick={() => setLoaded()}/>
                    <StyledButton text="Cancle" onClick={() => setLoadActive(false)}/>
                </CardFooter>
            </Card>
        </Popup>
    </Box>
}

export default memo(MonsterEdit)
