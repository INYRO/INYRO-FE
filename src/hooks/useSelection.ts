import { useState } from "react";

export function useSelection<T>() {
    const [selectedList, setSelectedList] = useState<T[]>([]);

    const toggleSelection = (id: T) => {
        setSelectedList((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const clearSelection = () => setSelectedList([]);

    return {
        selectedList,
        toggleSelection,
        clearSelection,
    };
}
