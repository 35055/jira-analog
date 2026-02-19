import { Box, Button, Group, Title } from "@mantine/core";
import { CardProject, ProjectModal } from "../widgets";
import { useDisclosure } from "@mantine/hooks";

const projectsArray = [
    {
        photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.norma.uz%2Fnashi_obzori%2Fkak_otkryt_internet-magazin_v_uzbekistane&psig=AOvVaw2EtU7s3p74eBRAvG4Ap-eh&ust=1771513450965000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLCLkoGo45IDFQAAAAAdAAAAABAE",
        title: "Online shop",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sequi ipsa numquam eligendi, debitis ipsum sint repellat soluta, fugiat eveniet exercitationem expedita hic possimus dolor, at officiis minima voluptates officia?"
    },
    {
        photo: "https://www.google.com/imgres?q=jira&imgurl=https%3A%2F%2Fcdn.prod.website-files.com%2F659bd602c8644fb17135bbe7%2F674dc9218489c1ed249240bb_674dc5e491882eda2f797c9e_Jira%252520Board.png&imgrefurl=https%3A%2F%2Fwww.swarmit.ch%2Fen%2Ftools%2Fjira&docid=tITNw-7PutssUM&tbnid=b7jBUzS245t4xM&vet=12ahUKEwiFgbaZqOOSAxVGQkEAHerOJGgQM3oECB4QAA..i&w=2560&h=1529&hcb=2&ved=2ahUKEwiFgbaZqOOSAxVGQkEAHerOJGgQM3oECB4QAA",
        title: "Jira Analog",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sequi ipsa numquam eligendi, debitis ipsum sint repellat soluta, fugiat eveniet exercitationem expedita hic possimus dolor, at officiis minima voluptates officia?"
    }
]

export const Projects = () => {
    const [openedProject, { open: openProject, close: closeProject }] = useDisclosure(false);


    return <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    }}>
        <ProjectModal opened={openedProject} close={closeProject} />
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
                projectsArray.map((el) => (
                    <CardProject description={el.description} photo={el.photo} title={el.title} />
                ))
            }
        </Box>
    </Box >
}