import { Link } from "react-router";

export default function TeamCard(team) {
  return (
    <li
      className="teamCard bg-white dark:bg-gray-700 rounded-lg shadow p-4 mb-2 flex flex-col items-center border-2 border-red-600 hover:shadow-lg transition"
      key={team.id}
    >
      <Link to={String(team.id)} className="w-full flex flex-col items-center">
        <p
          className="text-lg font-bold text-red-700 mb-2"
          style={{ fontFamily: "Papyrus, fantasy" }}
        >
          {team.name}
        </p>
        <section className="flex flex-wrap flex-row justify-center gap-2 w-full">
          {team.characters.map((c) => (
            <img
              key={c.id}
              src={c.image}
              alt={c.name}
              className="w-12 h-12 object-contain rounded border border-gray-300 bg-gray-100"
            />
          ))}
        </section>
      </Link>
    </li>
  );
}
