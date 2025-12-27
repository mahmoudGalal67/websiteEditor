import { useCMS } from "../../cms/store";
import SectionWrapper from "../../cms/SectionWrapper";
import Hero from "../../cms/section-types/Hero";
import Text from "../../cms/section-types/Text";

const MAP = { hero: Hero, text: Text };

export default function Home({ editable }) {
    const { pages } = useCMS();

    return pages.home.map((s, i) => {
        const Component = MAP[s.type];
        return editable ? (
            <SectionWrapper key={s.id} section={s} index={i}>
                <Component {...s.props} id={s.id} />
            </SectionWrapper>
        ) : (
            <Component key={s.id} {...s.props} />
        );
    });
}
