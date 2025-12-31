import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useCMS } from "../../cms/store";
import SectionWrapper from "../../cms/SectionWrapper";
import Hero from "../../cms/section-types/Hero";
import Text from "../../cms/section-types/Text";
import Image from "../../cms/section-types/Image";

const MAP = { hero: Hero, text: Text, image: Image };

export default function Home({ editable }) {
  const { pages, moveSection } = useCMS();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    moveSection(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="page">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {pages.home.map((s, i) => {
              const Component = MAP[s.type];
              return editable ? (
                <Draggable key={s.id} draggableId={s.id} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <SectionWrapper section={s} index={i}>
                        <Component {...s.props} id={s.id} />
                      </SectionWrapper>
                    </div>
                  )}
                </Draggable>
              ) : (
                <Component key={s.id} {...s.props} />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
