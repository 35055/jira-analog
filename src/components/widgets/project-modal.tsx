import { Button, FileInput, Flex, Modal, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUpload } from '@tabler/icons-react';
import { useEffect } from 'react';

type TProps = {
    opened: boolean;
    close: () => void;
    data?: {
        title: string;
        description: string;
    }
}

export const ProjectModal = (props: TProps) => {
    const { opened, close, data } = props;

    const form = useForm({
        initialValues: {
            title: "",
            photo: "",
            description: ""
        },

        validate: {
            title: (value: string) =>
                value.trim().length > 0 ? null : 'Field Required',

            description: (value: string) =>
                value.trim().length > 0 ? null : 'Field Required',
            photo: (value: string) =>
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


    return <Modal opened={opened} onClose={close} title="Create Project">
        <form style={{
            display: "flex",
            gap: "20px",
            flexDirection: "column"
        }} onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput withAsterisk label="Title" placeholder='Write...' {...form.getInputProps('title')} />
            <Textarea autosize minRows={2} maxRows={5} withAsterisk label="Description" placeholder='Write...'  {...form.getInputProps('description')} />
            <FileInput withAsterisk label="Screen of project" icon={<IconUpload size="1rem" />} {...form.getInputProps("photo")} />
            <Flex justify="right" gap="10px">
                <Button type='button' onClick={close} color='red'>Cancel</Button>
                <Button type="submit">Create</Button>
            </Flex>
        </form>
    </Modal>
}