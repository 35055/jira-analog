import { ActionIcon, Box, Button, Group, Table, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { CategoryModal, DeleteModal, StatusModal } from "../widgets";
import { useState } from "react";

type TStatus = {
    name: string;
    description: string;
    color: string;
}

const elements = [
    { description: 'C', name: 'Carbon', color: "red" },
    { description: 'N', name: 'Nitrogen', color: "red" },
    { description: 'Y', name: 'Yttrium', color: "red" },
    { description: 'Ba', name: 'Barium', color: "red" },
    { description: 'Ce', name: 'Cerium', color: "red" },
];

export const Status = () => {
    const [openedStatus, { open: openStatus, close: closeStatus }] = useDisclosure(false);
    const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);
    const [editdata, setEditData] = useState<TStatus>();

    const handleEdit = (el: TStatus) => {
        setEditData(el);
        openStatus();
    }


    const rows = elements.map((element, i) => (
        <tr key={element.name}>
            <td>{i + 1}</td>
            <td>{element.name}</td>
            <td>{element.color}</td>
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
        <DeleteModal title="Delete Status" opened={openedDelete} close={closeDelete} />
        <StatusModal opened={openedStatus} close={closeStatus} data={editdata} />
        <Title order={2}>Status</Title>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            paddingTop: "20px"
        }}>
            <Group position="right">
                <Button onClick={openStatus}>ADD STATUS</Button>
            </Group>
            <Table withBorder>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Name</th>
                        <th>Color</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Box>
    </Box>
}