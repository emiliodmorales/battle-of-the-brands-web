import { Link } from "react-router";

export default function TeamCard(team) {
  return (
    <li className="bg-neutral-400" key={team.id}>
      <Link to={String(team.id)}>
        <p>{team.name}</p>
        {/* When viewing team icons, always display in 2 rows  */}
        <section className="flex flex-wrap flex-row justify-center [&>img]:w-[30%]">
          {team.characters.map((c) => (
            <img key={c.id} src={c.image} alt={c.name}></img>
          ))}
        </section>
      </Link>
    </li>
  );
}
