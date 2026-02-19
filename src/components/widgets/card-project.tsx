import { ActionIcon, Box, Group, Image, Paper, Text, Title } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import jiraScreen from "../../assets/jira.png"

type TProps = {
    photo: string;
    title: string;
    description: string;
}

export const CardProject = (props: TProps) => {
    const { photo, description, title } = props;

    return <Paper w="350px" h="400px" shadow="xl" radius="md" withBorder sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 15px",
        gap: "10px",
        cursor: "pointer"
    }}>
        <Title order={2}>{title}</Title>
        <Image width="250px" height="200px" src={photo} />
        <Text lineClamp={3}>{description}</Text>
        <Box sx={{
            width: "100%"
        }}>
            <Group position="right">
                <ActionIcon color="blue" variant="filled">
                    <IconEdit stroke={2} />
                </ActionIcon>
                <ActionIcon color="red" variant="filled">
                    <IconTrash stroke={2} />
                </ActionIcon>
            </Group>
        </Box>
    </Paper>
}