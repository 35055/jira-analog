import { ActionIcon, Box, Group, Image, Paper, Text, Title } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DeleteModal } from "./delete-modal";
import { useDisclosure } from "@mantine/hooks";
import type { Project } from "../../types";

type TProps = {
    el: Project;
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    handleEdit: (el: Project) => void;
}

export const CardProject = (props: TProps) => {
    const { el, setProjects, handleEdit } = props;
    const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);

    const handleDeleted = async () => {
        try {
            await window.api.dbRemove("projects", el.id);
            setProjects((prev) => prev.filter((p) => p.id !== el.id));
            closeDelete();
        } catch (e) {
            console.error(e);
            // можно notifications.show если используешь Mantine notifications
        }
    };
    return <Paper w="350px" h="400px" shadow="xl" radius="md" withBorder sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 15px",
        gap: "10px",
        cursor: "pointer"
    }}>
        <DeleteModal title="Delete Project" deleteFunc={handleDeleted} opened={openedDelete} close={closeDelete} />
        <Title order={2}>{el.title}</Title>
        <Image width="250px" height="200px" src={el.imageBase64} />
        <Text lineClamp={3}>{el.description}</Text>
        <Box sx={{
            width: "100%"
        }}>
            <Group position="right">
                <ActionIcon onClick={() => handleEdit(el)} color="blue" variant="filled">
                    <IconEdit stroke={2} />
                </ActionIcon>
                <ActionIcon onClick={openDelete} color="red" variant="filled">
                    <IconTrash stroke={2} />
                </ActionIcon>
            </Group>
        </Box>
    </Paper>
}