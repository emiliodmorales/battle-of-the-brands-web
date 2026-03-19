import "../battle.css";

export default function Battle() {
  return (
    <div className="battleBackground">
      <h1>
        Get ready to <span className="vertical-shake">rumble</span>
      </h1>
      <div className="battleBox">
        <div className="challenger" />
        <p className="challenger">Challenger</p>
        <p className="sword">⚔️</p>

        <button onClick="">FIGHT!</button>

        <p className="defender">Defender</p>
        <div className="defender">❔</div>
      </div>
    </div>
  );
}
