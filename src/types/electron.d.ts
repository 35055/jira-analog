export { };

type Project = {
    id: string;
    createdAt: number;
    updatedAt?: number;
    title: string;
    description: string;
    imageBase64: string;
};

type Category = {
    id: string;
    createdAt: number;
    updatedAt?: number;
    name: string;
    description: string;
};

type Status = {
    id: string;
    createdAt: number;
    updatedAt?: number;
    name: string;
    color: string;
};

type Task = {
    id: string;
    createdAt: number;
    updatedAt?: number;
    title: string;
    description: string;
    projectId: string;
    categoryId: string;
    statusId: string;
};

// 🧠 Связка таблицы и типа
type Tables = {
    projects: Project;
    categories: Category;
    statuses: Status;
    tasks: Task;
};

declare global {
    interface Window {
        api: {
            dbAdd<K extends keyof Tables>(
                table: K,
                item: Omit<Tables[K], "id" | "createdAt" | "updatedAt">
            ): Promise<Tables[K]>;

            dbList<K extends keyof Tables>(table: K): Promise<Tables[K][]>;

            dbRemove<K extends keyof Tables>(
                table: K,
                id: string
            ): Promise<{ removed: number }>;

            dbUpdate<K extends keyof Tables>(
                table: K,
                id: string,
                patch: Partial<Tables[K]>
            ): Promise<Tables[K] | null>;
        };
    }
}