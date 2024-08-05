import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utilities/swoldier";
import { useState } from "react";
import Button from "./Button";

function Header(props) {
  const { index, title, description } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center justify-center">
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">{title}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
}

export default function Generator(props) {
  const {
    poison,
    setPoison,
    muscles,
    setMuscles,
    goal,
    setGoal,
    updateWorkout,
  } = props;
  const [showModal, setShowModal] = useState(false);

  function updateMuscles(muscle) {
    if (muscles.includes(muscle)) {
      setMuscles(muscles.filter((val) => val !== muscle));
      return;
    }
    if (muscles.length > 2) return;

    if (poison !== "individual") {
      setMuscles([muscle]);
      setShowModal(false);
      return;
    }
    setMuscles([...muscles, muscle]);
    if (muscles.length === 2) setShowModal(false);
  }

  return (
    <div>
      <SectionWrapper
        header={"generate your workout"}
        title={["it's", "huge", "o'clock"]}
        id={"generate"}
      >
        <Header
          index={"01"}
          title={"Pick your poison"}
          description={"Select the workout you wish to endure."}
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.keys(WORKOUTS).map((type, typeIndex) => {
            return (
              <button
                key={typeIndex}
                onClick={() => {
                  setPoison(type);
                  setMuscles([]);
                }}
                className={
                  "bg-slate-950 border duration-200 hover:border-blue-600 p-3 rounded-lg " +
                  (type === poison ? "border-blue-600" : "border-blue-400")
                }
              >
                <p className="capitalize">{type.replaceAll("_", " ")}</p>
              </button>
            );
          })}
        </div>

        <Header
          index={"02"}
          title={"Lock on targets"}
          description={"Select the muscles judged for annihilation."}
        />
        <div className="bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col">
          <button
            className="relative flex p-3 items-center justify-center"
            onClick={() => setShowModal(!showModal)}
          >
            <p className="uppercase">
              {muscles.length === 0
                ? "Select muscles group"
                : muscles.join(" ")}
            </p>
            <i className="fa-solid fa-caret-down absolute top-1/2 right-3 -translate-y-1/2"></i>
          </button>
          {showModal && (
            <div className="flex flex-col px-3 pb-3">
              {(poison === "individual"
                ? WORKOUTS[poison]
                : Object.keys(WORKOUTS[poison])
              ).map((muscle, muscleIndex) => {
                return (
                  <button
                    key={muscleIndex}
                    onClick={() => {
                      updateMuscles(muscle);
                    }}
                    className={
                      "pb-2 hover:text-blue-400 duration-200 " +
                      (muscles.includes(muscle) ? "text-blue-400" : " ")
                    }
                  >
                    <p className="uppercase">{muscle.replaceAll("_", " ")}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <Header
          index={"03"}
          title={"Become Juggernaut"}
          description={"Select your ultimate objective."}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
            return (
              <button
                key={schemeIndex}
                className={
                  "bg-slate-950 border duration-200 hover:border-blue-600 p-3 rounded-lg " +
                  (scheme === goal ? "border-blue-600" : "border-blue-400")
                }
                onClick={() => {
                  setGoal(scheme);
                }}
              >
                <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
              </button>
            );
          })}
        </div>
        <Button test={updateWorkout} text={"Formulate"} />
      </SectionWrapper>
    </div>
  );
}
