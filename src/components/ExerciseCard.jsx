import { useState } from "react";

export default function ExerciseCard(props) {
  const { exercise, i } = props;
  const [counter, setCounter] = useState(0);

  return (
    <div className="flex flex-col bg-slate-950 rounded-md p-4 gap-4">
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center items-start">
        <p className="hidden sm:inline text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-400">
          {"0" + (i + 1)}
        </p>
        <p className="capitalize text-base sm:text-xl md:text-2xl truncate max-w-full">
          {exercise.name.replaceAll("_", " ")}
        </p>
        <p className="capitalize text-sm text-slate-400">{exercise.type}</p>
      </div>
      <div>
        <h4 className="text-sm text-slate-400">Muscle Group</h4>
        <p className="capitalize">{exercise.muscles.join(" & ")}</p>
      </div>
      <div className="text-sm">
        {exercise.description.split("___").map((val, i) => {
          return (
            <p className="mb-3" key={i}>
              {val}
            </p>
          );
        })}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="border border-slate-900 p-2 rounded">
          <p className="capitalize text-slate-400 text-sm">reps</p>
          <p className="font-medium">{exercise.reps}</p>
        </div>
        <div className="border border-slate-900 p-2 rounded">
          <p className="capitalize text-slate-400 text-sm">rest</p>
          <p className="font-medium">{exercise.rest}</p>
        </div>
        <div className="border border-slate-900 p-2 rounded">
          <p className="capitalize text-slate-400 text-sm">tempo</p>
          <p className="font-medium">{exercise.tempo.replaceAll(" ", "-")}</p>
        </div>
        <button
          className="flex flex-col border border-blue-900 hover:border-blue-600 duration-200 p-2 rounded"
          onClick={() => {
            counter !== 5 && setCounter((counter + 1) % 6);
          }}
        >
          <p className="capitalize text-slate-400 text-sm">sets completed</p>
          <p className="font-medium">{counter} / 5</p>
        </button>
      </div>
    </div>
  );
}
