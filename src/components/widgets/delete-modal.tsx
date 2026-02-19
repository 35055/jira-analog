import { Box, Button, Flex, Modal, Text } from "@mantine/core";


type TProps = {
    opened: boolean;
    title: string;
    close: () => void;
}

export const DeleteModal = (props: TProps) => {
    const { opened, title, close } = props;

    return <Modal opened={opened} onClose={close} title={title}>
        <form onSubmit={() => console.log("delete")}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px"
            }}>
                <Text size="xl">Are you sure delete ?</Text>
                <Flex justify="right" gap="10px">
                    <Button type='button' onClick={close} color='red'>Cancel</Button>
                    <Button type="submit">Delete</Button>
                </Flex>
            </Box>
        </form>
    </Modal>
}