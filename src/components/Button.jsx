export default function Button(props) {
  const { text, test } = props;
  return (
    <button
      onClick={test}
      className="px-8 py-4 mx-auto rounded-md border-[2px] bg-slate-950 border-blue-400 border-solid duration-200 blueShadow"
    >
      <p>{text}</p>
    </button>
  );
}
