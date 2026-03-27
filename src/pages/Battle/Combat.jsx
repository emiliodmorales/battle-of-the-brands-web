export default function Combat({ challengerTeam, defenderTeam }) {
  const challenger = challengerTeam[0];
  const defender = defenderTeam[0];

  return (
    <section className="grid grid-cols-[45%_10%_45%] grid-rows-[10%_65%_25%] h-[50vh] w-[100vh]">
      <p className="col-start-1 place-self-center">{challenger.name}</p>
      <p className="col-start-3 place-self-center">{defender.name}</p>
      <img
        className="col-start-1 row-start-2 w-full h-full object-contain"
        src={challenger.image}
        alt={challenger.name}
      />
      <img
        className="col-start-3 row-start-2 "
        src={defender.image}
        alt={defender.name}
      />
      <p className="col-start-1 row-start-3 place-self-center">
        {challenger.hp}/MaxHealth
      </p>
      <p className="col-start-3 row-start-3 place-self-center">
        {defender.hp}/MaxHealth
      </p>
    </section>
  );
}
