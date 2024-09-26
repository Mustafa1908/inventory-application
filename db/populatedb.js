const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS videogame_categorie (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  videogame_categorie_name VARCHAR ( 20 ),
  videogame_categorie_description VARCHAR (300),
  videogame_categorie_image VARCHAR (300)
);

INSERT INTO videogame_categorie (videogame_categorie_name, videogame_categorie_description, videogame_categorie_image) 
VALUES
  ('Metroidvania', 'Metroidvania is a sub-genre of action-adventure games and/or platformers focused on guided non-linearity and utility-gated exploration and progression. The term is a portmanteau of the names of the video game series Metroid and Castlevania, based on the template from Metroid (1986).', 'https://www.digitaltrends.com/wp-content/uploads/2020/08/best-metroidvania-games-featured.jpg?p=1'),
  ('Jrpg', 'The J in JRPG stands for Japanese RPG. While it refers to just the origin of the RPG, they tend to nearly always have certain characteristics that other RPGs do not have. JRPGs tend to be more grind-heavy. They tend to be much longer than other RPGs and often share a much deeper story-line' , 'https://images.timeextension.com/b8d8fa1a5bd18/the-term-jrpg-is-a-positive-according-to-persona-5-designer-1.large.jpg'),
  ('FPS', 'First person shooter (FPS) is a type of shooter video game in which the player experiences the game through the eyes of the character they control. FPS games typically involve the use of firearms and require players to have fast reflexes, spatial awareness, and good hand-eye coordination.', 'https://media.steampowered.com/apps/csgo/blog/images/fb_image.png?v=6'),
  ('Moba', 'Multiplayer online battle arena, or MOBA, is a type of strategy role-playing game with a simple goal  to defeat opponents in a battle. Unlike the strategy genre, in MOBA games each player only controls one hero and contributes to the teams overall strategy.', 'https://steamuserimages-a.akamaihd.net/ugc/2010328424759555731/7167A3ECE235D7D7E9CDD5E866E9C556F20C22BD/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false' ),
  ('MMORPG', 'An MMORPG, or Massively Multiplayer Online Role-Playing Game, is a genre where players create characters and explore a vast, persistent world. They complete quests, engage in combat, and interact socially with other players. Popular examples include World of Warcraft and Final Fantasy XIV.', 'https://wow.zamimg.com/uploads/screenshots/normal/1059910.jpg'),
  ('RPG', 'An RPG, or Role-Playing Game, is a game genre where players assume the roles of characters in a fictional setting. Players make choices that influence the story, develop their characters abilities, and often engage in quests and battles. RPGs can be tabletop or digital.', 'https://www.gamewallpapers.com/download.php?img=wallpaper_ioi_online_fantasy_rpg_01_1920x1080.jpg'),
  ('Action', 'Action refers to a genre of video games characterized by fast-paced gameplay that emphasizes physical challenges, including hand-eye coordination and reaction time. Players often engage in combat, platforming, or fast-moving scenarios. Popular examples include Devil May Cry, and Call of Duty.', 'https://wallpapers.com/images/hd/action-games-2560-x-1600-wallpaper-orv9ulbmel37ji8r.jpg'), 
  ('Adventure', 'Adventure games focus on exploration, storytelling, and puzzle-solving, often featuring rich narratives and immersive worlds. Players control a character as they interact with the environment, gather items, and solve challenges. Classic examples include The Legend of Zelda and Monkey Island.', 'https://images2.alphacoders.com/130/thumb-1920-1301855.jpg'), 
  ('Puzzle' , 'Puzzle games challenge players to solve problems using logic, pattern recognition, or spatial reasoning. They often involve tasks like matching items, navigating mazes, or completing patterns. Examples include Tetris, Portal These games emphasize critical thinking and strategy over reflexes.', 'https://wallpapers.com/images/featured/puzzle-games-14qbx4lgo1g7ck8d.jpg'),
  ('Roguelike', 'A roguelike is a subgenre of role-playing games characterized by procedural generation, turn-based gameplay, and permanent death. Players navigate randomly generated dungeons, battling enemies and collecting items. Each playthrough is unique, emphasizing strategy and adaptability.', 'https://images6.alphacoders.com/130/1302421.jpg'),
  ('Horror', 'The horror video game genre focuses on creating fear and tension through unsettling atmospheres, eerie narratives, and often survival elements. Players typically face threats from monsters or psychological challenges, enhancing suspense. Notable examples include Resident Evil and Silent Hill', 'https://wallpapers.com/images/hd/horror-games-3500-x-1989-wallpaper-ufqhjqgcbib6vdr1.jpg'), 
  ('Sandbox' , 'The sandbox video game genre allows players to explore and interact with an open world freely, emphasizing creativity and self-directed gameplay. Players can build, modify, or destroy environments without strict objectives. Popular examples include Minecraft, Garrys Mod, and Grand Theft Auto V.', 'https://i.pinimg.com/originals/dc/f7/02/dcf702bb86bc528c1944d567cdfed464.jpg');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:
      "postgresql://mustafa:loldu455@localhost:5432/inventory_application",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
