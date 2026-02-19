import { Button, ColorInput, Flex, Modal, Textarea, TextInput } from '@mantine/core';
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

export const StatusModal = (props: TProps) => {
    const { opened, close, data } = props;

    const form = useForm({
        initialValues: {
            name: "",
            color: "",
            description: "",
        },

        validate: {
            name: (value: string) =>
                value.trim().length > 0 ? null : 'Field required',
            color: (value: string) =>
                value.trim().length > 0 ? null : 'Field required',
            description: (value: string) =>
                value.trim().length > 0 ? null : 'Field required',
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


    return <Modal opened={opened} onClose={close} title="Create Status">
        <form style={{
            display: "flex",
            gap: "20px",
            flexDirection: "column"
        }} onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput withAsterisk label="Name" placeholder='Write...' {...form.getInputProps('name')} />
            <ColorInput
                withAsterisk
                label="Choose color for status"
                format="hex"
                placeholder='Choose'
                swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
                {...form.getInputProps('color')}
            />
            <Textarea autosize minRows={2} maxRows={5} withAsterisk label="Description" placeholder='Write...'  {...form.getInputProps('description')} />
            <Flex justify="right" gap="10px">
                <Button type='button' onClick={close} color='red'>Cancel</Button>
                <Button type="submit">Create</Button>
            </Flex>
        </form>
    </Modal>
}