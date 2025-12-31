import { useCMS } from "../store";

export default function Text({ text, id }) {
  const { selectedSection, updateProp } = useCMS();
  const active = selectedSection?.id === id;

  return (
    <section className="p-10 bg-white rounded shadow max-w-3xl mx-auto">
      {active ? (
        <textarea
          className="w-full border p-2 rounded"
          value={text}
          onChange={e => updateProp(id, "text", e.target.value)}
        />
      ) : (
        <p>{text}</p>
      )}
    </section>
  );
}
