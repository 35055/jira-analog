import { useEffect, useState } from "react";
import { db } from "../shared/db";

type Item = {
    id: string;
    createdAt: number;
    title?: string;
    value?: number;
};

export const Check = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    // ✅ Загрузка всех items при старте
    useEffect(() => {
        (async () => {
            try {
                const res = await db.get();
                setItems(res.items);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // ✅ Добавление
    const handleAdd = async () => {
        const newItem = await db.add({
            title: "New project",
            value: Math.floor(Math.random() * 1000),
        });

        // Мы возвращаем newItem из Electron — добавляем в UI
        setItems((prev) => [newItem, ...prev]);
    };

    // ✅ Удаление
    const handleRemove = async (id: string) => {
        await db.remove(id);
        setItems((prev) => prev.filter((x) => x.id !== id));
    };

    // ✅ Очистка
    const handleClear = async () => {
        await db.clear();
        setItems([]);
    };

    if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", gap: 10 }}>
                <button onClick={handleAdd}>Add</button>
                <button onClick={handleClear}>Clear</button>
            </div>

            <ul style={{ marginTop: 20 }}>
                {items.map((x) => (
                    <li key={x.id} style={{ marginBottom: 10 }}>
                        <b>{x.title}</b> — {x.value} —{" "}
                        {new Date(x.createdAt).toLocaleString()}
                        <button
                            onClick={() => handleRemove(x.id)}
                            style={{ marginLeft: 10 }}
                        >
                            delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}