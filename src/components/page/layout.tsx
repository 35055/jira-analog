import { useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    Box,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { IconCategory, IconChartArrowsVertical, IconHome2 } from '@tabler/icons-react';
import { NavlinkComponent } from '../widgets';

export const Layout = () => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                    <Box>
                        <NavlinkComponent label='Projects' icon={<IconHome2 size="2rem" stroke={1.7} />} link='/' />
                        <NavlinkComponent label='Category' icon={<IconCategory size="2rem" stroke={1.7} />} link='/category' />
                        <NavlinkComponent label='Status' icon={<IconChartArrowsVertical size="2rem" stroke={1.7} />} link='/status' />
                    </Box>
                </Navbar>
            }
            header={
                <Header height={{ base: 50, md: 70 }} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <Text fw="bold" sx={{
                            fontSize: "30px"
                        }}>Jira Analog</Text>
                    </div>
                </Header>
            }
        >
            <Outlet />
        </AppShell>
    );
}