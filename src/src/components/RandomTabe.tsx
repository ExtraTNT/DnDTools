import React, { useState } from 'react'
import { memo } from 'react' // used later
import useControlStyles from '../styles/controls'
import { DefaultTheme, useTheme } from 'react-jss'
import StyledButton from './StyledButton'
import { Box, TextInput, Text, TextArea, Tip, Table, TableHeader, TableRow, TableCell, TableBody, Card, CardHeader, CardBody, CardFooter, Select } from 'grommet'
import { Clear } from 'grommet-icons'
import { clsj } from '../utils/joinClasses'
import Popup from './Popup'
import { set, get } from '../services/localObjectStorage'

interface RTProps {
    className?: string
}

interface Entry {
    title: string
    description: string
    chance: number
}

export const RandomTable = ({className}: RTProps) => {
    const theme:DefaultTheme = useTheme()
    const classes = useControlStyles(theme)
    let tmp = 0
    const dbKey = "randomTableEntries"
    const [entries, setEntries] = useState<Entry[]>([])
    const [toAdd, setToAdd] = useState<Entry>({title: "Title", description: "Description", chance: 1})
    const [total, setTotal] = useState(0)
    const [active, setActive] = useState<Entry>()
    const [addActive, setAddActive] = useState(false)
    const [saveText, setSaveText] = useState<string>('')
    const [saveActive, setSaveActive] = useState<boolean>(false)
    const [loadActive, setLoadActive] = useState<boolean>(false)
    const [loadSelected, setLoadSelected] = useState<string>()
    const [deleteActive, setDeleteActive] = useState<boolean>(false)
    const [deleteSelected, setDeleteSelected] = useState<string>()

    const add = () => {
        if(addActive) {
            let cp = [...entries]
            if(entries.indexOf(toAdd) !== -1) return
            cp.push(toAdd)
            setEntries(cp)
            update(cp)
        }
        setAddActive(!addActive)
    }

    const rm = (i: number) => {
        let cp: Entry[] = []
        for (const element of entries) {
            if(entries.indexOf(element) !== i) cp.push(element)
        }
        setEntries(cp)
        update(cp)
    }

    const change = (value: string | number, key:number | string) => {
        let cp = {...toAdd}
        cp[key] = value
        setToAdd(cp)
    }
    const update = (arr:Entry[]) => {
        let tot = 0
        for (const element of arr){
            tot += element.chance
        }
        setTotal(tot)
    }
    const roll = () => {
        const r = ~~(Math.random() * total) + 1
        let tot = 0
        for (const element of entries) {
            tot += element.chance
            if(r <= tot) {
                setActive(element)
                break
            }
        }
    }
    const cpToClip = (value: any) => {
        navigator.clipboard.writeText(value)
        alert(`Copied ${value} to clipboard`) // TODO: make this a toast
    }
    const save = () => {
        //const data = JSON.stringify(entries)
        //cpToClip(data)
        setSaveActive(true)
    }
    const writeToLocalStorrage = () => {
        console.log(saveText, get(dbKey))
        !get(dbKey) && set(dbKey, {})
        let dbElements = get(dbKey)
        dbElements[saveText] = entries
        set(dbKey, dbElements)
        setSaveActive(false)
        setSaveText('')
    }
    const readFromLocalStorage = () => {
        return get(dbKey) || {}
    }
    const loadKeysFromLocalStorage = () => {
        return Object.keys(readFromLocalStorage())
    }
    const setLoaded = () => {
        if(loadSelected == null){
            return
        }
        setEntries(readFromLocalStorage()[loadSelected])
        setLoadActive(false)
    }
    const load = () => {
        setLoadActive(true)
    }
    const del = () => {
        let items = readFromLocalStorage()
        console.log("before", items, deleteSelected)
        delete items[deleteSelected]
        set(dbKey, items)
        console.log("after", items)
        setDeleteActive(false)
    }
    const clear = () => {
        setEntries([])
    }

    return <Box className={className} direction='column'>
        <Table className={clsj(classes.tableFix)}>
            <TableHeader>
                <TableRow>
                    <TableCell className={clsj(classes.noWordBreak)}>
                        <Text>D {total}</Text>
                    </TableCell>
                    <TableCell>
                        <Text>Title</Text>
                    </TableCell>
                    <TableCell/>
                </TableRow>
            </TableHeader>
            <TableBody>
                {entries.map((entry, i) => {
                    tmp += entry.chance
                    return <TableRow key={i} className={entry == active? clsj(classes.bgEnabledColor):''}>
                        <TableCell className={clsj(classes.noWordBreak)}>
                            <Text>{entry.chance == 1? `${tmp}`:`${tmp - entry.chance + 1} - ${tmp}`}</Text>
                        </TableCell>
                        <TableCell>
                            <Tip content={<Box pad='medium' className={clsj(classes.bgBackgroundColor, classes.roundCornersMi)}>{entry.description}</Box>} plain>
                                <Text onClick={() => cpToClip(entry.description)} className={clsj()}>{entry.title}</Text>
                            </Tip>
                        </TableCell>
                        <TableCell>
                            <StyledButton onClick={() => rm(i)} icon={<Clear/>} margin='none' className={clsj(classes.noPad)}/>
                        </TableCell>
                    </TableRow>
                    })}
                </TableBody>
        </Table>
        {addActive && <Box pad='xsmall' margin='xxsmall'>
                <Box pad='none' direction='row'>
                    <TextInput value={toAdd.title} onChange={(e) => change(e.target.value, 'title')}/>
                    <TextInput value={toAdd.chance} onChange={(e) => change(parseInt(e.target.value) | 0, 'chance')}/>
                </Box>
                <TextArea value={toAdd.description} onChange={(e) => change(e.target.value, 'description')}/>
            </Box>
        }
        <Box pad='xsmall' direction='row' justify='evenly' wrap>
            <StyledButton onClick={() => add()} text={"Add"}/>
            <StyledButton onClick={() => roll()} text={"Roll"}/>
            <StyledButton onClick={() => setActive(undefined)} text={"Clear Active"}/>
            <StyledButton onClick={() => save()} text={"Save"}/>
            <StyledButton onClick={() => load()} text={"Load"}/>
            <StyledButton onClick={() => setDeleteActive(true)} text={"Delete"}/>
            <StyledButton onClick={() => clear()} text={"Clear"}/>
        </Box>
        {
            active && <Box pad='xsmall' margin='xxsmall'>
                <Text>{active.title}</Text>
                <Text onClick={() => cpToClip(active.description)}>{active.description}</Text>
            </Box>
        }
        <Popup active={saveActive}>
            <Card className={clsj(classes.alignCenter, classes.justifyCenter)}>
                <CardHeader pad="small" className={clsj(classes.middle)}>
                    <h1>Save as</h1>
                </CardHeader>
                <CardBody className={clsj(classes.middle)}>
                    <Box>
                        <TextInput value={saveText} onChange={(e) => setSaveText(e.target.value)} placeholder={"name"}/>
                    </Box>
                </CardBody>
                <CardFooter pad="small" className={clsj(classes.middle)}>
                    <StyledButton text="OK" onClick={writeToLocalStorrage}/>
                </CardFooter>
            </Card>
        </Popup>
        <Popup active={deleteActive} >
            <Card>
                <CardHeader pad="small" className={classes.middle}>
                    <h1>Load From Local Storrage</h1>
                </CardHeader>
                <CardBody>
                    <Box>
                        <Select options={loadKeysFromLocalStorage()} value={deleteSelected} onChange={(o) => setDeleteSelected(o.target.value)}/>
                    </Box>
                </CardBody>
                <CardFooter pad="small" className={clsj(classes.middle)}>
                    <StyledButton text="Delete" onClick={() => del()}/>
                    <StyledButton text="Cancle" onClick={() => setDeleteActive(false)}/>
                </CardFooter>
            </Card>
        </Popup>
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
        {/* same for load */}
    </Box>
}
//todo
//export default memo(RandomTable)
export default RandomTable
