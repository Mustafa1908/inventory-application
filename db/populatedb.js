const { Client } = require("pg");
require("dotenv").config();

const SQL = `

CREATE TABLE IF NOT EXISTS videogame_categorie (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  videogame_categorie_name VARCHAR ( 20 ),
  videogame_categorie_description VARCHAR (1000),
  videogame_categorie_image VARCHAR (500)
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






  CREATE TABLE IF NOT EXISTS videogame (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  videogame_name VARCHAR ( 130 ),
  videogame_description VARCHAR ( 1000 ),
  videogame_price INTEGER,
  videogame_release_date VARCHAR ( 30 ),
  videogame_rating INTEGER,
  videogame_quantity INTEGER,
  videogame_image VARCHAR ( 500 )
);


CREATE TABLE IF NOT EXISTS videogame_genre (
  id INTEGER ,
  videogame_categorie_name VARCHAR ( 40 )
);

CREATE TABLE IF NOT EXISTS videogame_publisher (
  id INTEGER ,
  publisher VARCHAR ( 120 )
);




INSERT INTO videogame (videogame_name,  videogame_description, videogame_price, videogame_release_date, videogame_rating, videogame_quantity, videogame_image) 
VALUES
  ('Hollow Knight', 'Hollow Knight  is a critically acclaimed action-adventure game developed by Team Cherry. Set in the haunting hand-drawn world of Hallownest, players control a silent knight as they explore, battle enemies, and uncover the lore of a fallen kingdom. The game features challenging combat and platforming', 14.99, '2017-02-24', 5, 14572  ,'https://images2.alphacoders.com/125/1253971.jpg'),
  ('Yakuza: Like a Dragon', 'Yakuza: Like a Dragon (Yakuza 7) is a turn-based RPG in the Yakuza series, featuring Ichiban Kasuga, who seeks to uncover the truth behind his betrayal. Set in Yokohama, it blends dramatic storytelling with quirky side activities, including job classes and mini-games.', 19.99, '2020-11-10', 4, 6789 ,'https://www.gamespot.com/a/uploads/screen_kubrick/1574/15747411/3755649-yakuza--like-a-dragon-review-promothumb.jpg'),
   ('Dead Cells', 'Dead Cells is a roguelite, metroidvania inspired, action-platformer. You will explore a sprawling, ever-changing castle assuming you are able to fight your way past its keepers in 2D souls-lite combat. No checkpoints. Kill, die, learn, repeat.', 24.99, '2018-08-06', 4, 7856 ,'https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_DeadCells.jpg'),
  ('Call of Duty: Black Ops III', 'Call of Duty: Black Ops III is a first-person shooter set in a dystopian future. It features a robust campaign with a co-op mode, focusing on a new threat involving advanced technology. The game also offers a fast-paced multiplayer experience and the popular Zombies mode.', 59.99, '2015-11-06', 5, 14982, 'https://images2.alphacoders.com/597/597965.jpg'),
  ('League of Legends', 'League of Legends is a popular moba  game where players control unique champions and compete in teams to destroy the enemys Nexus. With various roles like ADC, support, and jungler, strategic teamwork and individual skill are crucial. Regular updates keep the game engaging.', 0, '2009-10-27', 4, '92832', 'https://wallpapers.com/images/hd/4k-gaming-phone-league-of-legends-akali-iuob433pfedj8p01.jpg'),
  ('World of Warcraft', 'Word Warcraft delves into the epic universe of fantasy and conflict, where powerful factions vie for dominance. In this world, words wield immense power spells and incantations can alter reality, summon creatures, or unleash devastating attacks.', 12.99, '2004-11-23', 5, 43234, 'https://images3.alphacoders.com/159/159225.jpg' ),
  ('The Legend of Zelda: Tears of the Kingdom', 'The Legend of Zelda: Tears of the Kingdom" (TOTK) follows Link as he explores a vast, open-world Hyrule. With new abilities like building and sky exploration, players uncover secrets and battle enemies. The game invite players to solve puzzles and save the kingdom in fresh ways!', 51.49, '2023-05-12', 5, 58423, 'https://images7.alphacoders.com/131/1314891.jpg'),
  ('Soma', 'SOMA is a sci-fi horror game that explores consciousness and identity in an underwater research facility. Players control Simon who navigates a nightmarish world filled with monstrous beings and philosophical questions about what it means to be human. The  storytelling  create a haunting experience.', 29.99, '2015-09-21', 5, 2345, 'https://images4.alphacoders.com/643/643092.jpg'),
  ('Minecraft', 'Minecraft is a sandbox game that lets players build, explore, and survive in a blocky, procedurally generated world. Players can gather resources, craft items, and create structures or entire cities. With modes like Survival and Creative, it offers endless possibilities for creativity with friends.', 14.49, '2011-11-18', 5, 4234, 'https://wallpapers.com/images/featured/minecraft-hd-f0k9haimutvt21n8.jpg'),
  ('The Elder Scrolls V: Skyrim', 'Skyrim, part of The Elder Scrolls series, is an open-world RPG set in the fantasy realm of Tamriel. Players assume the role of the Dragonborn, tasked with defeating dragons and fulfilling prophecies. With rich lore, vast landscapes, and countless quests, it offers  immersive storytelling.', 39.99, '2011-11-11', 5, 8734, 'https://wallpapers.com/images/hd/the-elder-scrolls-v-skyrim-1920-x-1080-background-qo2pff6ukijkkkcw.jpg'),
  ('Nier:Automata', 'Nier: Automata is an action RPG set in a post-apocalyptic Earth, featuring androids 2B, 9S, and A2 battling alien machines. With fast-paced combat and a rich narrative exploring themes of existence and consciousness, it offers multiple endings that deepen the experience.', 39.99, '2017-02-23', 5, 89913, 'https://i.pinimg.com/originals/59/61/ab/5961ab356c150082452c066b490b1b3d.jpg'),
  ('Undertale', 'Undertale is a unique RPG where players navigate the Underground, a realm filled with monsters. Choices matter players can choose to fight, flee, or befriend enemies, influencing the story and ending. With its charming characters, retro graphics, and innovative gameplay', 9.99, '2015-09-15', 5, 6989, 'https://images7.alphacoders.com/798/798682.png');



  INSERT INTO videogame_genre (id, videogame_categorie_name)
  VALUES
  (1, 'Metroidvania'),
  (2, 'Action'),
  (2, 'Adventure'),
  (2, 'Jrpg'),
  (3, 'Metroidvania'),
  (3, 'Roguelike'),
  (4, 'FPS'),
  (4, 'Action'),
  (5, 'Moba'),
  (5, 'Action'),
  (5, 'RPG'),
  (6, 'MMORPG'),
  (7, 'Action'),
  (7, 'Adventure'),
  (7, 'Puzzle'),
  (8, 'Horror'),
  (9, 'Sandbox'),
  (9, 'Action'),
  (9, 'Adventure'),
  (10, 'Action'),
  (10, 'RPG'),
  (10, 'Adventure'),
  (11, 'Action'),
  (11, 'RPG'),
  (11, 'Adventure'),
  (12, 'Adventure'),
  (12, 'Action');


  INSERT INTO videogame_publisher (id, publisher)
  VALUES
  (1, 'Team Cherry'),
  (2, 'Sega'),
  (3, 'Motion Twin'),
  (4, 'Treyarch'),
  (5, 'Riot Games'),
  (6, 'Blizzard ENtertainment'),
  (7, 'Nintendo'),
  (8, 'Frictional Games'),
  (9, 'Mojang'),
  (10, 'Bethesda Game Studios'),
  (11, 'Square Enix'),
  (12, 'Toby Fox');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:5432/${process.env.DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
