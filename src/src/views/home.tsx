import React, { useState } from 'react'
import { memo } from 'react'
import useControlStyles from '../styles/controls'
import { useTheme } from 'react-jss'
import DiceRoller from '../components/DiceRoller'
import { Box, Grid, Paragraph, Tab, Tabs, Text, TextInput } from 'grommet'
import config from '../config'
import { useSetting } from '../contexts/settings'
import RandomTabe from '../components/RandomTabe'

export const Home = (props) => {
    const theme = useTheme()
    const classes = useControlStyles({...props, theme})
    
    const [getSettings, , setSettings] = useSetting()
    const [key, setKey] = useState("test")

    return <Box>
            {/* use a tab layout on the side for the roller... but debug wins anyways */}
            <Grid columns={['small', 'auto', 'medium']} gap='xxsmall' rows={['flex']} areas={[
                { name: 'left', start: [0, 0], end: [0, 0] },
                { name: 'main', start: [1, 0], end: [1, 0] },
                { name: 'right', start: [2, 0], end: [2, 0] }
            ]}>
                <Box flex='shrink' gridArea='left'>
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
                <Box flex='grow' gridArea='main'>
                    <Paragraph fill margin='none'>{config.loremIpsum}</Paragraph>
                    <TextInput value={getSettings(key)} onChange={ (e) => setSettings(e.target.value, key)}></TextInput>
                    <TextInput value={key} onChange={(e) => setKey(e.target.value)}/>
                    <p>{getSettings(key)}</p>
                    <p>{getSettings("lastRolledResult")}</p>
                </Box>
                <Tabs gridArea='right'>
                    <Tab title='Dice'><DiceRoller/></Tab>
                    <Tab title='Table'><RandomTabe/></Tab>
                    <Tab title='Dice3'>Hehe</Tab>
                    <Tab title='Dice4'>Hoho</Tab>
                </Tabs>
            </Grid>
        </Box>
}

export default memo(Home)