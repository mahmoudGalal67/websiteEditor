import { useCMS } from "../../../cms/store.jsx";
export default function BrandSettings() {
    const { pages, updateSectionProp } = useCMS();
    return <div className="p-4">Brand editing will be here (can add color/logo)</div>;
}
