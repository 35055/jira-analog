import { Button, Flex, Modal, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

type TProps = {
    opened: boolean;
    close: () => void;
    data?: {
        name: string;
        description: string;
    }
}

export const CategoryModal = (props: TProps) => {
    const { opened, close, data } = props;

    const form = useForm({
        initialValues: {
            name: "",
            description: ""
        },

        validate: {
            name: (value: string) =>
                value.trim().length > 0 ? null : 'Field Required',

            description: (value: string) =>
                value.trim().length > 0 ? null : 'Field Required',
        },
    });

    useEffect(() => {
        if (data) {
            form.setValues(data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        if (!opened) {
            form.reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opened])


    return <Modal opened={opened} onClose={close} title="Create Category">
        <form style={{
            display: "flex",
            gap: "20px",
            flexDirection: "column"
        }} onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput withAsterisk label="Name" placeholder='Write...' {...form.getInputProps('name')} />
            <Textarea autosize minRows={2} maxRows={5} withAsterisk label="Description" placeholder='Write...'  {...form.getInputProps('description')} />
            <Flex justify="right" gap="10px">
                <Button type='button' onClick={close} color='red'>Cancel</Button>
                <Button type="submit">Create</Button>
            </Flex>
        </form>
    </Modal>
}