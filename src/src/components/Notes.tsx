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

interface NotesProps {
    className?: string
}

const dbKey = 'notes'
//todo make it with only one entry -> so, that it effectifely works...

export const Notes = ({className}: NotesProps) => {
    const [currentText, setCurrentText] = useState<string>('')
    const [currentTitle, setCurrentTitle] = useState<string>('')
    const [loadActive, setLoadActive] = useState<boolean>(false)
    const [loadSelected, setLoadSelected] = useState<string>()

    const theme:DefaultTheme = useTheme()
    const classes = useControlStyles(theme)

    const save = () => {
        !get(dbKey) && set(dbKey, {})
        let items = readFromLocalStorage()
        items[currentTitle] = currentText
        set(dbKey, items)
    }
    const clear = () => {
        setCurrentText('')
        setCurrentTitle('')
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
        setCurrentText(readFromLocalStorage()[loadSelected])
        setCurrentTitle(loadSelected)
        setLoadActive(false)
    }
    const del = () => {
        if(!confirm("are you sure")) return
        let items = readFromLocalStorage()
        delete items[currentTitle]
        set(dbKey, items)
        clear()
    }

    return <Box className={className} >
        <Box pad='xsmall' direction='column'>
            <TextInput value={currentTitle} onChange={(e) => setCurrentTitle(e.target.value)}/>
            <TextArea value={currentText} onChange={(e) => setCurrentText(e.target.value)}/>
            <Box pad='xsmall' direction='row' justify='evenly' wrap>
                <StyledButton onClick={save} text={"Save"}/>
                <StyledButton onClick={load} text={"Load"}/>
                <StyledButton onClick={clear} text={"Clear"}/>
                <StyledButton onClick={del} text={"Delete"}/>
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

export default memo(Notes)
