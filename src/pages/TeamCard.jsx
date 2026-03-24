import { Link } from "react-router";

export default function TeamCard(team) {
  return (
    <li className="team-card" key={team.id}>
      <Link to={String(team.id)}>
        <p>{team.name}</p>
        <section className="team-view">
          {team.characters.map((c) => (
            <img key={c.id} src={c.image} alt={c.name}></img>
          ))}
        </section>
      </Link>
    </li>
  );
}
