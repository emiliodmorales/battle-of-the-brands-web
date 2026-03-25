/* Pretty sure we need this query in the back end to fish for the character_id based on team_id */
export async function getCharacterFromTeam(id) {
  const sql = `
  SELECT character_id
  FROM "teams_characters"
  WHERE team_id =$1
  ORDER BY position
  `;
  const {
    rows: [team],
  } = await db.query(sql, [id]);
  return team;
}
