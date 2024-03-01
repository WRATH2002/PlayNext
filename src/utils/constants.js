// require("dotenv").config();
const API_KEY = process.env.REACT_APP_API_KEY;

export const VIDEO_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  API_KEY;

export const SEARCH_API =
  "http://suggestqueries.google.com/complete/search?client=firefox&q=";

export const COMMENT_API =
  "https://www.googleapis.com/youtube/v3/commentThreads?key=" + API_KEY;

var nameList = [
  "Time",
  "Past",
  "Future",
  "Dev",
  "Fly",
  "Flying",
  "Soar",
  "Soaring",
  "Power",
  "Falling",
  "Fall",
  "Jump",
  "Cliff",
  "Mountain",
  "Rend",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Gold",
  "Demon",
  "Demonic",
  "Panda",
  "Cat",
  "Kitty",
  "Kitten",
  "Zero",
  "Memory",
  "Trooper",
  "XX",
  "Bandit",
  "Fear",
  "Light",
  "Glow",
  "Tread",
  "Deep",
  "Deeper",
  "Deepest",
  "Mine",
  "Your",
  "Worst",
  "Enemy",
  "Hostile",
  "Force",
  "Video",
  "Game",
  "Donkey",
  "Mule",
  "Colt",
  "Cult",
  "Cultist",
  "Magnum",
  "Gun",
  "Assault",
  "Recon",
  "Trap",
  "Trapper",
  "Redeem",
  "Code",
  "Script",
  "Writer",
  "Near",
  "Close",
  "Open",
  "Cube",
  "Circle",
  "Geo",
  "Genome",
  "Germ",
  "Spaz",
  "Shot",
  "Echo",
  "Beta",
  "Alpha",
  "Gamma",
  "Omega",
  "Seal",
  "Squid",
  "Money",
  "Cash",
  "Lord",
  "King",
  "Duke",
  "Rest",
  "Fire",
  "Flame",
  "Morrow",
  "Break",
  "Breaker",
  "Numb",
  "Ice",
  "Cold",
  "Rotten",
  "Sick",
  "Sickly",
  "Janitor",
  "Camel",
  "Rooster",
  "Sand",
  "Desert",
  "Dessert",
  "Hurdle",
  "Racer",
  "Eraser",
  "Erase",
  "Big",
  "Small",
  "Short",
  "Tall",
  "Sith",
  "Bounty",
  "Hunter",
  "Cracked",
  "Broken",
  "Sad",
  "Happy",
  "Joy",
  "Joyful",
  "Crimson",
  "Destiny",
  "Deceit",
  "Lies",
  "Lie",
  "Honest",
  "Destined",
  "Bloxxer",
  "Hawk",
  "Eagle",
  "Hawker",
  "Walker",
  "Zombie",
  "Sarge",
  "Capt",
  "Captain",
  "Punch",
  "One",
  "Two",
  "Uno",
  "Slice",
  "Slash",
  "Melt",
  "Melted",
  "Melting",
  "Fell",
  "Wolf",
  "Hound",
  "Legacy",
  "Sharp",
  "Dead",
  "Mew",
  "Chuckle",
  "Bubba",
  "Bubble",
  "Sandwich",
  "Smasher",
  "Extreme",
  "Multi",
  "Universe",
  "Ultimate",
  "Death",
  "Ready",
  "Monkey",
  "Elevator",
  "Wrench",
  "Grease",
  "Head",
  "Theme",
  "Grand",
  "Cool",
  "Kid",
  "Boy",
  "Girl",
  "Vortex",
  "Paradox",
];

export function generateName() {
  return nameList[Math.floor(Math.random() * nameList.length)];
}

export function generateMessage(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const SEARCH_BY_ID =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=" +
  API_KEY +
  "&id=";

export const CHANNEL_LOGO_API =
  "https://www.googleapis.com/youtube/v3/channels?part=snippet&key=" +
  API_KEY +
  "&id=";

export const SUBSCRIBERS_COUNT =
  "https://www.googleapis.com/youtube/v3/channels?part=statistics&key=" +
  API_KEY +
  "&id=";

export const RELATED_VIDEOS_ONE =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=";

export const RELATED_VIDEOS_TWO = "&type=video&key=" + API_KEY;

export const RELATED_SEARCH =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&key=" +
  API_KEY +
  "&relatedToVideoId=";

export const COMMENTS_API =
  "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&key=" +
  API_KEY +
  "&videoId=";
//snippet%2Creplies

export const SEARCH_TEXT_API =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&key=" +
  API_KEY +
  "&q=";

export const VIEW_COUNT =
  "https://www.googleapis.com/youtube/v3/videos?part=statistics&key=" +
  API_KEY +
  "&id=";

export const buttonList = [
  "All",
  "Music",
  "Live",
  "Rain",
  "Akshay Saini",
  "React JS",
  "Computer Programming",
  "4K resolution",
  "Rockets",
  "Dramedy",
  "Cricket",
  "Bollywood Music",
  "Tourism",
  "Comedy",
  "Stock markets",
  "Motorcycling",
  "Jukebox",
  "Mixes",
  "Watched",
  "New to you",
  "Recently Uploaded",
];
