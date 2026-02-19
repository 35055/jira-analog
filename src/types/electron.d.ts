export { };

declare global {
    interface Window {
        api: {
            categories: {
                getAll(): Promise<Array<{ id: string; name: string; description: string }>>;
                getById(id: string): Promise<{ id: string; name: string; description: string } | null>;
                create(data: { name: string; description: string }): Promise<{ id: string; name: string; description: string }>;
                update(data: { id: string; name?: string; description?: string }): Promise<{ id: string; name: string; description: string }>;
                delete(id: string): Promise<{ deleted: boolean }>;
            };
        };
    }
}
