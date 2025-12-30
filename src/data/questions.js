// src/data/questions.js
const stitchImages = [
  "/img/stitchGift.gif",
  "/img/stitchHello.gif",
  "/img/stitchHi.gif",
  "/img/stitchingThinkinWithEmoji.gif",
  "/img/stitchQuistion.gif",
  "/img/stitchShock.gif",
  "/img/stitchSleepy.gif",
  "/img/stitchThinking.gif",
  "/img/stitchYourAmazing.gif",
];

export const questions = [
  {
    id: 1,
    question: "What is your favorite color?",
    voiceSrc: "/audio/q1.mp3",
    options: ["Red", "Black", "Green", "Blue"],
    picture: stitchImages,
    wrongAudio: "/audio/vw1.mp3",
    correctAnswer: "Blue",
  },
  {
    id: 2,
    question:
      "Kristine eats Frappé Matcha, Zinger Steak from KFC, and Sour Cream Fries from Potato Corner, but she never loves to eat a?",
    voiceSrc: "/audio/q2.mp3",
    options: ["Burger", "Pizza", "Beef", "Ice Cream"],
    picture: stitchImages,
    wrongAudio: "/audio/vw2.mp3",
    correctAnswer: "Beef",
  },
  {
    id: 3,
    question:
      "Get ready for a Mini Boss Level Question! Sometimes, when Kristine is hungry, she transforms into a?",
    voiceSrc: "/audio/q3.mp3",
    options: ["Monster", "Queen", "Dragon", "Chef"],
    picture: stitchImages,
    wrongAudio: "/audio/vw3.mp3",
    correctAnswer: "Dragon",
  },

  {
    id: 4,
    question:
      "Jay is inviting you on an adventure date to Lake Holon. He’s excited to start ticking off the things on your bucket lists together. Do you agree to join him on this journey?",
    voiceSrc: "/audio/q4.mp3",
    options: ["Yes, absolutely!", "Never ever", "No, thanks", "Not sure"],
    picture: stitchImages,
    wrongAudio: "/audio/vw4.mp3",
    correctAnswer: "Yes, absolutely!",
  },
  {
    id: 5,
    question:
      "Jay shared an important piece of information with me, but I forgot. He personally asked you a question a few months ago: Before 2025 ends, what are the things you want to learn?",
    voiceSrc: "/audio/q5.mp3",
    options: [
      "Calligraphy and journaling",
      "A creative hobby or talent",
      "Something for career development",
      "Something meaningful for life",
    ],
    picture: stitchImages,
    wrongAudio: "/audio/vw5.mp3",
    correctAnswer: "Calligraphy and journaling",
  },
  {
    id: 6,
    question:
      "What is the common name of the tall, yellow-petaled plant in the genus Helianthus, famous for its heliotropism—the behavior of tracking the sun across the sky?",
    voiceSrc: "/audio/q6.mp3",
    options: [
      "Daisy — cute, but no spark",
      "Sunflower — because you are my direction 🌻",
      "Marigold — warm, but not home",
      "Tulip — lovely, but not my sun",
    ],
    picture: stitchImages,
    wrongAudio: "/audio/vw6.mp3",
    correctAnswer: "Sunflower — because you are my direction 🌻",
  },
  {
    id: 7,
    question:
      "A memory only the two of you share… In which City you and Jay first meet—the place where your paths crossed, a day Jay will never forget?  choose accordingly from your memory only?",
    voiceSrc: "/audio/q7.mp3",
    options: [
      "Tagatay City",
      "Binan Laguna",
      "General Santos City",
      "BGC Taguig City",
    ],
    picture: stitchImages,
    wrongAudio: "/audio/vw7.mp3",
    correctAnswer: "General Santos City",
  },
];
