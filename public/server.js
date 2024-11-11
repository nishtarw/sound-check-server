const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 5000;

// Sample artist data
const artistData = [
    {
        "_id": "1",
        "name": "Childish Gambino",
        "image": "/images/childishgambino.jpg",
        "image_credit": "Originally by EWatson92 on Flickr, licensed under CC BY 2.0.",
        "genre": "R&B/Hip-Hop/Rock/Rap",
        "country": "America",
        "biography": "Childish Gambino is the musical persona of Donald Glover...",
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
        "biography": "Lana Del Rey, was born as Elizabeth Woolridge Grant on June 21, 1985...",
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
        "biography": "Frank Ocean is an American artist and producer known for his amazing vocals...",
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
        "biography": "Forming in 2016, the Marías are a semi-recent band with lead vocalist and guitarist María Zardoya...",
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
        "biography": "Travis Scott (born Jacques Berman Webster II on April 30, 1991) is a Houston-born rapper...",
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
        "biography": "Steve Lacy is a talented American musician and producer known for his work with The Internet...",
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
        "biography": "Kali Uchis is an American singer and songwriter known for her unique blend of R&B, soul, and pop...",
        "discography": [
            "Por Vida (2018)",
            "Isolation (2019)",
            "Sin Miedo (del Amor y Otros Demonios) (2020)",
            "Red Moon in Venus (2023)"
        ],
        "upcomingEvents": "No events at the moment."
    },
    {
        "_id": "8",
        "name": "SZA",
        "image": "/images/sza.jpg",
        "image_credit": "Photo by Rupa Patel on Flickr, reviewed by FlickreviewR on March 19, 2020.",
        "genre": "R&B",
        "country": "America",
        "biography": "SZA is an American singer and songwriter known for her unique blend of R&B and hip-hop...",
        "discography": [
            "Z (2014)",
            "Ctrl (2017)",
            "SOS (2022)"
        ],
        "upcomingEvents": "SZA will perform at the 2024 Coachella Festival on April 12, 2024. Tickets available at the Coachella website."
    }
];

// Middleware to serve static files (like images)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to send artist data
app.get('/api/artists', (req, res) => {
    res.json(artistData);
});

// Serve the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// New route for song data
const songs = [
    {
        title: "Faith",
        artist: "The Weeknd",
        review: "Giving this song a 8/10. This song by The Weeknd is definitely one of my favorites from the album...",
        otherReviews: [
            { user: "Louiss", review: "I love this album so much, I agree, I can literally feel his lyrics." },
            { user: "Jes444", review: "5/10. I feel like it's kinda basic, I don't see what you guys are talking about." },
        ],
        image: "theweeknd3.jpg",
    },
    {
        title: "Normal Girl",
        artist: "SZA",
        review: "Giving this song a 7/10. I love the concept of the song because it feels relatable...",
        otherReviews: [
            { user: "Mayajs34", review: "10/10 for me. I've never heard something more relatable." },
        ],
        image: "sza.jpg",
    },
    {
        title: "Cry",
        artist: "Cigarettes After Sex",
        review: "10/10. This is my go-to crying song. It features the most beautiful instrumentation...",
        otherReviews: [
            { user: "mikeR334", review: "I cry to this song every day." },
            { user: "burgers50", review: "1/10, all their songs sound the same." },
        ],
        image: "cas.jpg",
    },
];

app.get('/api/songs', (req, res) => {
    res.json(songs); // Sends songs data
});
