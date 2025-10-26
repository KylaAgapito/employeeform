const audio = document.getElementById("audio");
const rows = document.querySelectorAll("#lyrics tr");

// Timestamps (start, end) for each row 
const timings = [
  [0, 12], //.....
  [13, 15],   // Sintang Paaralan
  [15, 18],   // Tanglaw ka ng bayan
  [18, 24],   // Pandayan ng isip ng kabataan
  [24, 29],   // Kami ay dumating ...
  [29, 35],   // Hanap na dunong ...
  [35, 41],   // Ang layunin mong ...
  [41, 47],   // Dinarangal ...
  [47, 53],   // Ang iyong aral ...
  [53, 56],   // PUP aming gabay
  [56, 62],   // Paaralang dakila
  [62, 68],   // PUP pinagpala
  [68, 74],   // Gagamitin ang karunungan
  [74, 80],   // Mula sa iyo ...
  [80, 86],   // Ang iyong aral ...
  [86, 89],   // PUP aming gabay
  [89, 95],   // Paaralang dakila
  [95, 104],  // PUP pinagpala
  [105, 113], //,...
];

let active = -1;

audio.addEventListener("timeupdate", () => {
  const t = audio.currentTime;
  
  for (let i = 0; i < timings.length; i++) {
    const [start, end] = timings[i];
    if (t >= start && t <= end) {
      if (active !== i) {
        if (active !== -1) rows[active].classList.remove("selected");
        rows[i].classList.add("selected");
        rows[i].scrollIntoView({ behavior: "smooth", block: "center" });
        active = i;
      }
      break;
    }
  }
});


//For Interactive lyrics navigation
rows.forEach((row, i) => {
  row.addEventListener("click", () => {
    const [start] = timings[i]; // get start time for that lyric
    audio.currentTime = start;  // jump to start time
    audio.play();               // play immediately

    // Remove previous highlight
    if (active !== -1) rows[active].classList.remove("selected");

    // Highlight clicked row
    row.classList.add("selected");
    active = i;

    // Center it in view
    row.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});