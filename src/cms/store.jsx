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

  // History stack
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const saveHistory = (newPages) => {
    setHistory((prev) => [...prev, pages]);
    setRedoStack([]);
    setPages(newPages);
  };

  const undo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, history.length - 1));
    setRedoStack((prevRedo) => [...prevRedo, pages]);
    setPages(prev);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack((rs) => rs.slice(0, rs.length - 1));
    setHistory((prev) => [...prev, pages]);
    setPages(next);
  };

  const selectedSection = pages.home.find((s) => s.id === selectedId) || null;

  /* ---------- ACTIONS ---------- */
  const updateProp = (id, prop, value) => {
    const newPages = {
      ...pages,
      home: pages.home.map((s) =>
        s.id === id ? { ...s, props: { ...s.props, [prop]: value } } : s
      ),
    };
    saveHistory(newPages);
  };

  const deleteSection = (id) => {
    const newPages = {
      ...pages,
      home: pages.home.filter((s) => s.id !== id),
    };
    saveHistory(newPages);
    setSelectedId(null);
  };

  const moveSection = (sourceIndex, destinationIndex) => {
    const arr = [...pages.home];
    const [removed] = arr.splice(sourceIndex, 1);
    arr.splice(destinationIndex, 0, removed);
    saveHistory({ ...pages, home: arr });
  };

  const addSection = (index, type) => {
    const sectionMap = {
      hero: {
        type: "hero",
        props: {
          title: "New Hero",
          subtitle: "Subtitle",
          bg: "#020617",
        },
      },
      text: {
        type: "text",
        props: {
          text: "New text section",
        },
      },
      image: {
        type: "image",
        props: {
          src: "",
          alt: "Image",
        },
      },
    };

    const config = sectionMap[type];
    if (!config) return;

    const newSection = {
      id: nanoid(),
      ...config,
    };

    const arr = [...pages.home];
    arr.splice(index + 1, 0, newSection);

    saveHistory({ ...pages, home: arr });
  };


  const saveToBackend = async () => {
    try {
      const res = await fetch("/api/save-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pages),
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("Pages saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving pages");
    }
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
        undo,
        redo,
        saveToBackend,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export const useCMS = () => useContext(CMSContext);
