import { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";

const CMSContext = createContext();

export function CMSProvider({ children }) {
    const [pages, setPages] = useState({
        home: [
            {
                id: nanoid(),
                type: "hero",
                props: { title: "Welcome", subtitle: "Click to edit", bg: "#0f172a" },
            },
            {
                id: nanoid(),
                type: "text",
                props: { text: "This is a text section" },
            },
        ],
    });

    const [selectedId, setSelectedId] = useState(null);

    const selectedSection =
        pages.home.find(s => s.id === selectedId) || null;

    /* ---------- ACTIONS ---------- */
    const updateProp = (id, prop, value) => {
        setPages(p => ({
            ...p,
            home: p.home.map(s =>
                s.id === id
                    ? { ...s, props: { ...s.props, [prop]: value } }
                    : s
            ),
        }));
    };

    const deleteSection = id => {
        setPages(p => ({ ...p, home: p.home.filter(s => s.id !== id) }));
        setSelectedId(null);
    };

    const moveSection = (index, dir) => {
        setPages(p => {
            const arr = [...p.home];
            if (index + dir < 0 || index + dir >= arr.length) return p;
            const item = arr[index];
            arr.splice(index, 1);
            arr.splice(index + dir, 0, item);
            return { ...p, home: arr };
        });
    };

    const addSection = (index, type) => {
        const newSection = {
            id: nanoid(),
            type,
            props:
                type === "hero"
                    ? { title: "New Hero", subtitle: "Subtitle", bg: "#020617" }
                    : { text: "New text section" },
        };

        setPages(p => {
            const arr = [...p.home];
            arr.splice(index + 1, 0, newSection);
            return { ...p, home: arr };
        });
    };

    return (
        <CMSContext.Provider
            value={{
                pages,
                selectedId,
                setSelectedId,
                selectedSection,
                updateProp,
                deleteSection,
                moveSection,
                addSection,
            }}
        >
            {children}
        </CMSContext.Provider>
    );
}

export const useCMS = () => useContext(CMSContext);
