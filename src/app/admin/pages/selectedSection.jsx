import { createContext, useContext, useState } from "react";

const CMSContext = createContext();

export function CMSProvider({ children }) {
    const [pages, setPages] = useState({
        home: [
            {
                id: "hero-1",
                type: "hero",
                props: {
                    title: "Welcome to My Site",
                    subtitle: "Click me to edit",
                    bg: "#0f172a",
                },
            },
            {
                id: "text-1",
                type: "text",
                props: { text: "This is a CMS section" },
            },
        ],
    });

    const [selectedSection, setSelectedSection] = useState(null);

    const updateSectionProp = (id, prop, value) => {
        setPages(prev => {
            const updated = prev.home.map(s =>
                s.id === id ? { ...s, props: { ...s.props, [prop]: value } } : s
            );
            return { ...prev, home: updated };
        });

        // Update selectedSection as well for two-way binding
        if (selectedSection?.id === id) {
            setSelectedSection(prev => ({ ...prev, props: { ...prev.props, [prop]: value } }));
        }
    };

    return (
        <CMSContext.Provider
            value={{ pages, setPages, selectedSection, setSelectedSection, updateSectionProp }}
        >
            {children}
        </CMSContext.Provider>
    );
}

export const useCMS = () => useContext(CMSContext);
