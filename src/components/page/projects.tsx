import { Box, Button, Group, Title } from "@mantine/core";
import { CardProject, ProjectModal } from "../widgets";
import { useDisclosure } from "@mantine/hooks";
import type { Project } from "../../types";
import { useEffect, useState } from "react";

export const Projects = () => {
    const [openedProject, { open: openProject, close: closeProject }] = useDisclosure(false);
    const [editValue, setEditValue] = useState<Project | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);

    const handleEdit = (el: Project) => {
        setEditValue(el);
        openProject();
    }

    useEffect(() => {
        (async () => {
            const list = await window.api.dbList("projects");
            setProjects(list as Project[]);
        })();
    }, []);


    return <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    }}>
        <ProjectModal data={editValue} opened={openedProject} close={closeProject} setEditValue={setEditValue} onEdit={(edited) => setProjects((prev) => prev.map((p) => (p.id === edited.id ? edited : p)))} onCreated={(p) => setProjects((prev) => [p, ...prev])} />
        <Title align="center" order={2} sx={{
            fontSize: "35px"
        }}>Projects</Title>
        <Group position="right">
            <Button onClick={openProject}>ADD PROJECT</Button>
        </Group>
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px",
        }}>
            {
                projects.map((el) => (
                    <CardProject el={el} handleEdit={handleEdit} setProjects={setProjects} />
                ))
            }
        </Box>
    </Box >
}