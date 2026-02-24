import { fileToBase64 } from "../shared";
import type { Project } from "../types";

export async function createProject(
    values: { title: string; description: string; photo: File | null }
): Promise<Project | null> {
    const { title, description, photo } = values;
    if (!photo) return null;

    const imageBase64 = await fileToBase64(photo);

    const created = await window.api.dbAdd("projects", {
        title,
        description,
        imageBase64,
    });

    return created;
}

export async function editProject(values: {
    id: string;
    title: string;
    description: string;
    photo: File | null;
}): Promise<Project | null> {
    const { id, title, description, photo } = values;

    // PATCH: обновляем текст всегда
    const patch: Partial<Project> = { title, description };

    // если выбрали новое фото — добавим его в patch
    if (photo) {
        const imageBase64 = await fileToBase64(photo);
        patch.imageBase64 = imageBase64;
    }

    const edited = await window.api.dbUpdate("projects", id, patch);
    return edited;
}