import { ActionIcon, Box, Button, Group, Table, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { CategoryModal, DeleteModal } from "../widgets";
import { useState } from "react";

type TCategory = {
    name: string;
    description: string;
}

const elements = [
    { description: 'C', name: 'Carbon' },
    { description: 'N', name: 'Nitrogen' },
    { description: 'Y', name: 'Yttrium' },
    { description: 'Ba', name: 'Barium' },
    { description: 'Ce', name: 'Cerium' },
];

export const Category = () => {
    const [openedCategory, { open: openCategory, close: closeCategory }] = useDisclosure(false);
    const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);
    const [editdata, setEditData] = useState<TCategory>();

    const handleEdit = (el: TCategory) => {
        setEditData(el);
        openCategory();
    }


    const rows = elements.map((element, i) => (
        <tr key={element.name}>
            <td>{i + 1}</td>
            <td>{element.name}</td>
            <td>{element.description}</td>
            <td>
                <Group position="right">
                    <ActionIcon onClick={() => handleEdit(element)}>
                        <IconEdit color="#1c7ed6" stroke={2} />
                    </ActionIcon>
                    <ActionIcon onClick={openDelete}>
                        <IconTrash color="#c92a2a" stroke={2} />
                    </ActionIcon>
                </Group>
            </td>
        </tr>
    ));

    return <Box>
        <DeleteModal title="Delete Category" opened={openedDelete} close={closeDelete} />
        <CategoryModal opened={openedCategory} close={closeCategory} data={editdata} />
        <Title order={2}>Category</Title>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            paddingTop: "20px"
        }}>
            <Group position="right">
                <Button onClick={openCategory}>ADD CATEGORY</Button>
            </Group>
            <Table withBorder>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Box>
    </Box>
}