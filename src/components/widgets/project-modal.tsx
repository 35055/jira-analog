import { Button, FileInput, Flex, Modal, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUpload } from '@tabler/icons-react';
import { useEffect } from 'react';
import type { Project } from '../../types';
import { createProject, editProject } from '../../api/project-api';

type TProps = {
    opened: boolean;
    data?: Project | null;
    close: () => void;
    onEdit: (project: Project) => void;
    onCreated: (project: Project) => void;
    setEditValue: (project: Project | null) => void;
}

type TValues = { title: string; description: string; photo: File | null; };

export const ProjectModal = (props: TProps) => {
    const { opened, data, close, onEdit, onCreated, setEditValue } = props;

    const form = useForm({
        initialValues: {
            title: "",
            photo: null,
            description: ""
        },

        validate: {
            title: (value: string) =>
                value.trim().length > 0 ? null : 'Field Required',

            description: (value: string) =>
                value.trim().length > 0 ? null : 'Field Required',
            photo: (value: File | null) => (data ? null : value ? null : "Field Required"),
        },
    });

    const handleCreateProject = async (values: TValues) => {
        const created = await createProject(values);
        if (!created) return;

        onCreated(created);   // ✅ created уже Project
        close();
        form.reset();
    }

    const handleEditProject = async (values: TValues) => {
        if (!data) return;
        const edited = await editProject({
            ...values,
            id: data.id
        });
        if (!edited) return;
        onEdit(edited);
        close();
        form.reset();
    }

    useEffect(() => {
        if (data) {
            form.setValues({ title: data.title, description: data.description, photo: null });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        if (!opened) {
            setEditValue(null);
            form.reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opened])


    return <Modal opened={opened} onClose={close} title={data ? "Edit Project" : "Create Project"}>
        <form style={{
            display: "flex",
            gap: "20px",
            flexDirection: "column"
        }} onSubmit={form.onSubmit((values) => data ? handleEditProject(values) : handleCreateProject(values))}>
            <TextInput withAsterisk label="Title" placeholder='Write...' {...form.getInputProps('title')} />
            <Textarea autosize minRows={2} maxRows={5} withAsterisk label="Description" placeholder='Write...'  {...form.getInputProps('description')} />
            {data?.imageBase64 && (
                <img
                    src={data.imageBase64}
                    alt="Current screenshot"
                    style={{ width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 8 }}
                />
            )}
            <FileInput
                label={data ? "Replace screenshot (optional)" : "Screen of project"}
                withAsterisk={!data}
                icon={<IconUpload size="1rem" />}
                accept="image/*"
                {...form.getInputProps("photo")}
            />
            <Flex justify="right" gap="10px">
                <Button type='button' onClick={close} color='red'>Cancel</Button>
                <Button type="submit">{data ? "Edit" : "Create"}</Button>
            </Flex>
        </form>
    </Modal>
}