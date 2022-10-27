import React, { useState } from 'react'
import { memo } from 'react'
import useControlStyles from '../styles/controls'
import { DefaultTheme, useTheme } from 'react-jss'
import DiceRoller from '../components/DiceRoller'
import { Box, Grid, Paragraph, Tab, Tabs, Text, TextInput } from 'grommet'
import config from '../config'
import { useSetting } from '../contexts/settings'
import RandomTabe from '../components/RandomTabe'
import Notes from '../components/Notes'
import MonsterEdit from '../components/MonsterEdit'
import MonsterView from '../components/MonsterView'

export const Home = () => {
    const theme:DefaultTheme = useTheme()
    const classes = useControlStyles(theme)
    
    const [getSettings, , setSettings] = useSetting()
    const [key, setKey] = useState("test")

    return <Box className={classes.max100}>
            {/* use a tab layout on the side for the roller... but debug wins anyways */}
            <Grid columns={['small', 'auto', 'medium']} gap='xxsmall' rows={['flex']} areas={[
                { name: 'left', start: [0, 0], end: [0, 0] },
                { name: 'main', start: [1, 0], end: [1, 0] },
                { name: 'right', start: [2, 0], end: [2, 0] }
            ]} className={classes.max100}>
                <Box flex='shrink' gridArea='left' border>
                    <Text>Text</Text>
                    <Text>Text long long</Text>
                    <Text>Text</Text>
                    <Text>Text</Text>
                    <Text>Text</Text>
                    <Text>Text</Text>
                    <Text>Text</Text>
                    <Text>Text</Text>
                    <Text>Text</Text>
                    <Text>Text</Text>
                    <Text>Text</Text>
                    <Text>Text</Text>
                </Box>
                <Box flex='grow' gridArea='main' overflow='scroll'>
                    <Tabs>
                        <Tab title='Test Paragraph'>
                            <Paragraph fill margin='none'>{config.loremIpsum}</Paragraph>
                        </Tab>
                        <Tab title='Test Settings'>
                            <Box pad='none'>
                                <TextInput value={getSettings(key)} onChange={ (e) => setSettings(e.target.value, key)}></TextInput>
                                <TextInput value={key} onChange={(e) => setKey(e.target.value)}/>
                                <p>{getSettings(key)}</p>
                                <p>{getSettings("lastRolledResult")}</p>
                            </Box>
                        </Tab>
                        <Tab title='Monster'><MonsterEdit/></Tab>
                    </Tabs>
                </Box>
                <Box gridArea='right' border flex='shrink'>
                    <Tabs>
                        <Tab title='Dice'><DiceRoller/></Tab>
                        <Tab title='Table'><RandomTabe/></Tab>
                        <Tab title='Notes'><Notes/></Tab>
                        <Tab title='Monsters'><MonsterView/></Tab>
                    </Tabs>
                </Box>
            </Grid>
        </Box>
}

export default memo(Home)
