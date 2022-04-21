import React, { ReactElement, useState } from 'react'
import { memo } from 'react'
import useControlStyles from '../styles/controls'
import { useTheme } from 'react-jss'
import StyledButton from './StyledButton'
import { Box, TextInput, Text, TextArea, Tip, Table, TableHeader, TableRow, TableCell, Tab, TableBody, Card, CardHeader, CardBody, CardFooter } from 'grommet'
import { Clear, Toast } from 'grommet-icons'
import { clsj } from '../utils/joinClasses'
import Popup from './Popup'

interface RTProps {
    className?: string
}

interface Entry {
    title: string
    description: string
    chance: number
}

interface Toast {
    title: string
    body: ReactElement
    onClick: () => void
}

export const RandomTable = ({className}: RTProps) => {
    const theme = useTheme()
    const classes = useControlStyles(theme)
    let tmp = 0
    const [entries, setEntries] = useState<Entry[]>([])
    const [toAdd, setToAdd] = useState<Entry>({title: "Title", description: "Description", chance: 1})
    const [total, setTotal] = useState(0)
    const [active, setActive] = useState<Entry>()
    const [addActive, setAddActive] = useState(false)
    const [toast, setToast] = useState<Toast>()

    const add = () => {
        if(addActive) {
            let cp = [...entries]
            if(entries.indexOf(toAdd) !== -1) return
            cp.push(toAdd)
            setEntries(cp)
            Update(cp)
        }
        setAddActive(!addActive)
    }

    const rm = (i) => {
        let cp = []
        for (const element of entries) {
            if(entries.indexOf(element) !== i) cp.push(element)
        }
        setEntries(cp)
        Update(cp)
    }

    const change = (value, key) => {
        let cp = {...toAdd}
        cp[key] = value
        setToAdd(cp)
    }
    const Update = (arr) => {
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
    const cpToClip = (value) => {
        navigator.clipboard.writeText(value)
        alert(`Copied ${value} to clipboard`) // TODO: make this a toast
    }
    const save = () => {
        const data = JSON.stringify(entries)
        
    }
    const load = () => {
        
        alert("Loaded from clipboard") // TODO: make this a toast
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
            <StyledButton onClick={() => setActive(null)} text={"Clear"}/>
            <StyledButton onClick={() => save()} text={"Save"}/>
            <StyledButton onClick={() => load()} text={"Load"}/>
        </Box>
        {
            active && <Box pad='xsmall' margin='xxsmall'>
                <Text>{active.title}</Text>
                <Text onClick={() => cpToClip(active.description)}>{active.description}</Text>
            </Box>
        }
        <Popup active={!!toast}>
            <Card className={clsj(classes.alignCenter, classes.justifyCenter)}>
                <CardHeader pad="small" className={clsj(classes.middle)}>
                    <h1>{toast.title}</h1>
                    </CardHeader>
                <CardBody className={clsj(classes.middle)}>
                    {toast.body}
                </CardBody>
                <CardFooter pad="small" className={clsj(classes.middle)}>
                    <StyledButton text="OK" onClick={toast.onClick}></StyledButton>
                </CardFooter>
            </Card>
        </Popup>
    </Box>
}

export default memo(RandomTable)