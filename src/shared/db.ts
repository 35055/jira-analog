export const db = {
    get: async () => window.api.dbGet(),
    add: async (item: Record<string, any>) => window.api.dbAdd(item),
    remove: async (id: string) => window.api.dbRemove(id),
    clear: async () => window.api.dbClear(),
};