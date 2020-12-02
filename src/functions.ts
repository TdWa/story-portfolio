import { ActorType, Phrase } from "./store/types";

export const playScene = (
  script: Phrase[],
  actors: ActorType[],
  actorTextRef: React.MutableRefObject<string>,
  setActors: React.Dispatch<React.SetStateAction<ActorType[]>>
) => {
  if (script.length > 0) {
    const text = script[0].text;
    actorTextRef.current = "";
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        // mouth.textContent = i % 5 === 0 ? "O" : "o";
        actorTextRef.current += text[i];
        setActors(
          actors.map((actor) => {
            if (actor.id !== script[0].actorId) {
              return { ...actor, currentText: "" };
            } else {
              return { ...actor, currentText: actorTextRef.current };
            }
          })
        );
      }, 50 * i);
    }

    setTimeout(() => {
      // mouth.textContent = "o";
      playScene(script.slice(1), actors, actorTextRef, setActors);
    }, 1000 + 50 * text.length);
  } else {
    setActors(actors.map((actor) => ({ ...actor, currentText: "" })));
  }
};

/*
      // document.getElementById("startButton").style.visibility = "hidden";
      // if (script.length === 1) {
      //   setTimeout(() => {
      //     document.getElementById("startButton").style.visibility = "visible";
      //   }, 1000 + 50 * text.length);
      // }

  */