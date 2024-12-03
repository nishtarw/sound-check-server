const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});

const upload = multer({ storage: storage });

// Artist Data
const artistData = [
  {
      "_id": "1",
      "name": "Childish Gambino",
      "image": "/images/childishgambino.jpg",
      "image_credit": "Originally by EWatson92 on Flickr, licensed under CC BY 2.0.",
      "genre": "R&B/Hip-Hop/Rock/Rap",
      "country": "America",
      "biography": "Childish Gambino is the musical persona of Donald Glover, who is a writer, actor, musician, comedian, producer, and director. He was born on September 25th, 1983, in California but moved to Atlanta at a young age. He became famous first for being a writer and an actor, but later released music as mixtapes and EPs. His first major album with a major record was called 'Camp' and was released in 2011. After that, he had more hits and released frequently, but since 'Awaken My Love!' in 2016, he has taken 4 years to release each album, one in 2020 and just released two new albums this year!",
      "discography": [
          "EP (2008)",
          "Camp (2011)",
          "I Am Just a Rapper (2010)",
          "I Am Just a Rapper 2 (2011)",
          "Because the Internet (2013)",
          "STN MTN (2014)",
          "Kauai (2014)",
          "Awaken, My Love! (2016)",
          "3.15.20 (2020)",
          "Atavista (2024)",
          "Bando Stone and The New World (2024)"
      ],
      "upcomingEvents": "No events at the moment."
  },
  {
      "_id": "2",
      "name": "Lana Del Rey",
      "image": "/images/lana.jpg",
      "image_credit": "Image by Georges Biard, licensed under CC BY-SA 3.0",
      "genre": "Indie/Alt Pop",
      "country": "America",
      "biography": "Lana Del Rey, was born as Elizabeth Woolridge Grant on June 21, 1985, in New York, is a popular artist known for her unique sound and style. She grew up singing in church, and after high school went to Fordham University to study philosophy. She started making music as a teenager but gained major recognition with her 2011 hit 'Video Games.' Her album Born to Die (2012) featured popular tracks like 'Summertime Sadness' and helped establish her career. Lana's music often focuses on themes like love and heartbreak and has a cinematic and nostalgic music.",
      "discography": [
          "Lana Del Rey (2010)",
          "Born to Die (2012)",
          "Ultraviolence (2014)",
          "Honeymoon (2015)",
          "Lust for Life (2017)",
          "Norman Fucking Rockwell! (2019)",
          "Chemtrails over the Country Club (2021)",
          "Blue Banisters (2021)",
          "Did You Know That Theres a Tunnel Under Ocean Blvd (2023)"
      ],
      "upcomingEvents": "No events at the moment."
  },
  {
      "_id": "3",
      "name": "Frank Ocean",
      "image": "/images/frank.jpg",
      "image_credit": "Originally posted at blonded.co, reviewed on Nov 3, 2023, by GRuban.",
      "genre": "R&B",
      "country": "America",
      "biography": "Frank Ocean is an American artist and producer known for his amazing vocals and lyricism. He first gained recognition with his first mixtape 'Nostalgia Ultra' before releasing his take-off with the album, Channel Orange, which features songs like 'Thinkin Bout You' and won him a Grammy award. His most recent album, Blonde, was another hit. This was also in 2016 and his last album as he has stopped making music since then, although we are hoping he'll come back. Aside from music, he is also open about his sexuality and advocates for social justice.",
      "discography": [
          "Nostalgia, Ultra (2011)",
          "Channel Orange (2012)",
          "Blonde (2016)"
      ],
      "upcomingEvents": "No events at the moment."
  },
  {
      "_id": "4",
      "name": "The Marias",
      "image": "/images/marias.jpg",
      "image_credit": "Originally by Julio Enriquez on Flickr, reviewed on June 25, 2019, under CC BY 2.0.",
      "genre": "Indie/Alt Pop",
      "country": "America",
      "biography": "Forming in 2016, the Marías are a semi-recent band with lead vocalist and guitarist María Zardoya along with Jesse Perlman, Edward James, and James Conway. Originating from Los Angeles, California, they are renowned for their Latin influence, mystical and luscious sounds, and Maria's angelic vocals. The band became well-known because of their EP Superclean, Vol. I, which had the hit song 'I Don't Know You.' With the success of their first studio album, Cinema, they gradually gained greater recognition over time. The Marías frequently tackle themes of cultural identity and romance and heartbreak.",
      "discography": [
          "EPs Superclean, Vol. I (2017)",
          "Superclean, Vol. II (2018)",
          "CINEMA (2021)",
          "Submarine (2024)"
      ],
      "upcomingEvents": "They are currently in the middle of their 'Submarine Tour'. Check out tickets on Ticketmaster!"
  },
  {
      "_id": "5",
      "name": "Travis Scott",
      "image": "/images/travis.jpg",
      "image_credit": "Image from Flickr, reviewed by ww2censor on January 29, 2017, under the stated license.",
      "genre": "Rap",
      "country": "America",
      "biography": "Travis Scott (born Jacques Berman Webster II on April 30, 1991) is a Houston-born rapper, singer, and producer known for his innovative sound and energetic live shows. He gained fame with his mixtapes Owl Pharaoh (2013) and Days Before Rodeo (2014). His debut album, Rodeo (2015), included hits like 'Antidote' and received critical acclaim. His follow-up albums, Birds in the Trap Sing McKnight (2016) and Astroworld (2018), solidified his status, with Astroworld featuring the chart-topping single 'Sicko Mode.' In addition to music, he founded Cactus Jack Records and has collaborated with brands like Nike and McDonald's, making him a major influence in both the music and fashion industries.",
      "discography": [
          "Owl Pharaoh (2013)",
          "Days Before Rodeo (2014)",
          "Rodeo (2015)",
          "Birds in the Trap Sing McKnight (2016)",
          "Rogue Waves (2016, EP)",
          "JACKBOYS (2019)",
          "ASTROWORLD (2018)",
          "UTOPIA (2023)",
          "The Jack Webster Project (2023, EP)"
      ],
      "upcomingEvents": "Travis Scott will perform at Rolling Loud on December 13, 2024, at Hard Rock Stadium in Miami, FL. Find tickets on Ticketmaster."
  },
  {
      "_id": "6",
      "name": "Steve Lacy",
      "image": "/images/steve.jpg",
      "image_credit": "Image by C Elliott Photos on Flickr (link) reviewed by FlickreviewR 2 on June 3, 2023.",
      "genre": "R&B",
      "country": "America",
      "biography": "Steve Lacy is a talented American musician and producer known for his work with The Internet and his solo projects. His music blends elements of R&B, funk, and rock, showcasing his diverse influences. Lacy gained recognition for his production work on the Grammy-nominated album Ego Death by The Internet, which features the hit song 'Girl.' He released his debut solo project, Steve Lacy's Demo, in 2017, which received critical acclaim and highlighted his unique sound and style.",
      "discography": [
          "Steve Lacy's Demo (2017)",
          "Apollo XXI (2019)",
          "Gemini Rights (2022)"
      ],
      "upcomingEvents": "No events at the moment."
  },
  {
      "_id": "7",
      "name": "Kali Uchis",
      "image": "/images/kali.jpg",
      "image_credit": "Image by rarvesen on Flickr (link) reviewed by FlickreviewR on August 1, 2016.",
      "genre": "R&B/Pop",
      "country": "America",
      "biography": "Kali Uchis is an American singer and songwriter known for her unique blend of R&B, soul, and pop. Born on July 17, 1994, in Alexandria, Virginia, she rose to fame with her debut EP, 'Por Vida' in 2015. Her music often explores themes of love, heartbreak, and empowerment. Uchis has collaborated with various artists across different genres, showcasing her versatility as an artist.",
      "discography": [
          "Por Vida (2018)",
          "Isolation (2019)",
          "Sin Miedo (del Amor y Otros Demonios) (2020)",
          "Red Moon in Venus (2023)"
      ],
      "upcomingEvents": "Kali Uchis will perform at Coachella on April 12 and April 19, 2024."
  },
  {
      "_id": "8",
      "name": "SZA",
      "image": "/images/rihanna.jpg",
      "image_credit": "Image from Flickr, reviewed by File Upload Bot on December 29, 2008, confirmed under the stated license.",
      "genre": "Pop/R&B",
      "country": "Barbados",
      "biography": "Rihanna is a Barbadian singer, actress, and businesswoman. She was born on February 20, 1988, in Saint Michael, Barbados. Rising to fame in the early 2000s with hits like 'Umbrella,' Rihanna has become one of the best-selling music artists in the world. Her musical style includes pop, R&B, reggae, and dance. Besides music, she is known for her philanthropic work and her successful beauty and fashion lines.",
      "discography": [
          "Music of the Sun (2005)",
          "A Girl Like Me (2006)",
          "Good Girl Gone Bad (2007)",
          "Rated R (2009)",
          "Loud (2010)",
          "Talk That Talk (2011)",
          "Unapologetic (2012)",
          "Anti (2016)"
      ],
      "upcomingEvents": "Rihanna will headline the Super Bowl LVIII halftime show on February 11, 2024."
  }
];

// Song Data
let songs = [
  {
    id: 1,
    title: "Faith",
    artist: "The Weeknd",
    review: "Giving this song a 8/10. This song by The Weeknd is definitely one of my favorites from the album...",
    image: "/images/theweeknd3.jpg",
  },
  {
    id: 2,
    title: "Normal Girl",
    artist: "SZA",
    review: "Giving this song a 7/10. I love the concept of the song because it feels relatable...",
    image: "/images/sza.jpg",
  },
  {
    id: 3,
    title: "Cry",
    artist: "Cigarettes After Sex",
    review: "10/10. This song brings a sense of melancholy that I absolutely love...",
    image: "/images/cas.jpg",
  },
];

// Joi Schema for Song Validation
const songReviewSchema = Joi.object({
  title: Joi.string().min(1).required(),
  artist: Joi.string().min(1).required(),
  review: Joi.string().min(10).required(),
});

// GET All Artists
app.get("/api/artists", (req, res) => {
  res.json(artistData);
});

// GET All Songs
app.get("/api/songs", (req, res) => {
  res.json(songs);
});

// POST a New Song Review
app.post("/api/songs", upload.single("image"), (req, res) => {
  const { error } = songReviewSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Invalid data format.", details: error.details });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Image file is required." });
  }

  const newSongReview = {
    id: songs.length + 1,
    title: req.body.title,
    artist: req.body.artist,
    review: req.body.review,
    image: "/images/" + req.file.filename,
  };

  songs.push(newSongReview);
  res.status(201).json({ message: "Song review added successfully!", newSongReview });
});

// PUT (Edit) a Song Review
app.put("/api/songs/:id", upload.single("image"), (req, res) => {
  const songId = parseInt(req.params.id);
  const songIndex = songs.findIndex((song) => song.id === songId);

  if (songIndex === -1) {
    return res.status(404).json({ message: "Song not found." });
  }

  const { error } = songReviewSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Invalid data format.", details: error.details });
  }

  const updatedSong = {
    ...songs[songIndex],
    title: req.body.title,
    artist: req.body.artist,
    review: req.body.review,
    image: req.file ? "/images/" + req.file.filename : songs[songIndex].image,
  };

  songs[songIndex] = updatedSong;
  res.status(200).json({ message: "Song review updated successfully!", updatedSong });
});

// DELETE a Song Review
app.delete("/api/songs/:id", (req, res) => {
  const songId = parseInt(req.params.id);
  const songIndex = songs.findIndex((song) => song.id === songId);

  if (songIndex === -1) {
    return res.status(404).json({ message: "Song not found." });
  }

  const deletedSong = songs.splice(songIndex, 1);
  res.status(200).json({ message: "Song review deleted successfully!", deletedSong });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
