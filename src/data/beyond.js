// Beyond the code — the pursuits on the About page. Add a pursuit by adding
// an object; the component cycles the card colours. Copy is first person,
// plain, and only what is true.
import padel from "@/assets/images/beyond/padel.webp";
import track from "@/assets/images/beyond/track.webp";
import coffee from "@/assets/images/beyond/coffee.webp";
import observatory from "@/assets/images/beyond/observatory.webp";
import dogs from "@/assets/images/beyond/dogs.webp";

export const pursuits = [
  {
    id: "padel",
    title: "Padel",
    blurb:
      "My new sport. It scratches the competitive itch. I play on a Series team in Madrid.",
    photo: padel,
    alt: "Two players holding padel rackets on an indoor court.",
  },
  {
    id: "track",
    title: "Track and field",
    blurb:
      "I'm retired now, but track and field is a big part of who I am today. I still follow it.",
    photo: track,
    alt: "Running alone on a stadium track.",
  },
  {
    id: "barista",
    title: "Home barista",
    blurb:
      "Amateur barista at home. Espresso and latte art, mostly for whoever is around.",
    photo: coffee,
    alt: "A latte with heart-shaped art, held in one hand.",
  },
  {
    id: "science",
    title: "Science",
    blurb:
      "Trained as a physicist, and I watch the stars when I can. For a while I ran a science outreach project.",
    photo: observatory,
    alt: "An observatory dome at sunset above a city.",
  },
  {
    id: "dogs",
    title: "The dogs",
    blurb: "Two of them, Xura and Ari. They keep me busy.",
    photo: dogs,
    alt: "Xura and Ari sharing a water bowl on the beach.",
  },
];
