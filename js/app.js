// global rune entity definitions
const fehu = "&#x16A0;",
  uruz = "&#x16A2;",
  thurisaz = "&#x16A6;",
  ansuz = "&#x16A8;",
  raido = "&#x16B1;",
  kenaz = "&#x16B2;",
  gebo = "&#x16B7;",
  wunjo = "&#x16B9;",
  hagalaz = "&#x16BA;",
  naudiz = "&#x16BE;",
  isa = "&#x16C1;",
  jera = "&#x16C3;",
  eihwaz = "&#x16C7;",
  perthro = "&#x16C8;",
  algiz = "&#x16C9;",
  sowilo = "&#x16CB;",
  tiwaz = "&#x16CF;",
  berkano = "&#x16D2;",
  ehwaz = "&#x16D6;",
  mannaz = "&#x16D7;",
  laguz = "&#x16DA;",
  ingwaz = "&#x16DD;",
  dagaz = "&#x16DE;",
  othala = "&#x16DF;",
  dot = "&#x16EB;",
  double_dot = "&#x16EC;";

// display number 9 in hash marks
const four = "|||",
  five = "||" + "&#x0338" + "||";

// * * * Particles * * *
const particles = [];

// ========================================================
function setup() {
  let canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent("canvas-container");
  canvas.style("display", "flex");
  canvas.style("z-index", "-2");

  // number of particles (higher divisor = fewer dots)
  const particlesLength = Math.floor(window.innerWidth / 4);

  // create the particles
  for (let i = 0; i < particlesLength; i++) {
    particles.push(new Particle());
  }
}

// ========================================================
function draw() {
  // set bg color
  background(32, 3, 37);
  // animate each particle
  particles.forEach((p, index) => {
    p.update();
    p.drawParticle();
    p.checkParticles(particles.slice(index));
  });
}

// create particle
// **************************
class Particle {
  constructor() {
    // Starting position
    this.pos = createVector(random(width), random(height));
    // velocity and direction
    this.vel = createVector(random(-0.4, 0.4), random(-0.4, 0.4));
    // particle size
    this.size = 4;
  }

  // update particle position
  // **************************
  update() {
    this.pos.add(this.vel);
    this.edges();
  }

  // draw single particle
  // **************************
  drawParticle() {
    noStroke();
    fill("rgba(255, 255, 255, 0.6)");
    circle(this.pos.x, this.pos.y, this.size);
  }

  // detect edges and bounce particle
  // **************************
  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }

    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  // draw connecting fialment
  // **************************
  checkParticles(particles) {
    particles.forEach((particle) => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

      if (d < 120) {
        stroke("rgba(255, 255, 255, 0.1)");
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
} // end Class

// * * * Random Rune Starts Here * * *
// initialize the page
// ========================================================
function init() {
  // put the title together in Futhark
  const runicTitle =
    double_dot +
    raido +
    ansuz +
    naudiz +
    dagaz +
    othala +
    mannaz +
    dot +
    raido +
    uruz +
    naudiz +
    sowilo +
    double_dot;

  // assemble words using Futhark for easier use
  const hold = double_dot + hagalaz + othala + laguz + dagaz + dot,
    your = jera + uruz + raido + dot,
    question =
      kenaz + wunjo + ehwaz + sowilo + tiwaz + isa + othala + naudiz + dot,
    iin = isa + naudiz + dot,
    mind = mannaz + jera + naudiz + dagaz + dot,
    wwhile = wunjo + jera + laguz + dot,
    silently =
      sowilo + eihwaz + laguz + isa + naudiz + tiwaz + laguz + eihwaz + dot,
    repeating = raido + ehwaz + perthro + ehwaz + tiwaz + isa + ingwaz + dot,
    alu = ansuz + laguz + uruz + dot,
    nine = four + five + dot,
    // nine = naudiz + eihwaz + naudiz + dot,
    times = tiwaz + eihwaz + mannaz + ansuz + sowilo + double_dot;

  // cat up the directions
  const directions =
    hold +
    your +
    question +
    iin +
    your +
    mind +
    wwhile +
    silently +
    repeating +
    alu +
    nine +
    times;

  // place title and directions in the DOM
  const title = document.getElementById("title");
  title.innerHTML = runicTitle;

  // insert the directions in the DOM
  const instructions = document.getElementById("instructions");
  instructions.innerHTML = directions;

  // place holder for result spot
  const runic_result = document.getElementById("runic-result");
  runic_result.innerHTML = " ";

  // set up the button event listener
  const beginButton = document.getElementById("begin-button");
  beginButton.addEventListener("click", buttonClick);
}

// ========================================================
function buttonClick() {
  pulse();
}

// ========================================================
async function pulse() {
  const alu = ansuz + laguz + uruz;
  const runic_result = document.getElementById("runic-result");
  runic_result.innerHTML = double_dot + alu + double_dot;

  // disable the button during process
  const button = document.getElementById("begin-button");
  button.disabled = true;

  // show the alu
  aluPulseIn();

  // pulse the alu 9 times
  for (let i = 0; i < 9; i++) {
    await sleep(2000);
    aluPulseOut();
    await sleep(2000);
    aluPulseIn();
  }

  // show the rune and reenable the button
  showRune();
  button.disabled = false;
}

// ========================================================
function aluPulseIn() {
  // fade in
  const result = document.querySelector("#runic-result");
  result.className = "visible";
}

// ========================================================
function aluPulseOut() {
  // fade out
  const result = document.querySelector("#runic-result");
  result.className = "invisible";
}

// This is a great javascript sleep function!
// call with await sleep(time); // with time in milliseconds
// ========================================================
function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// ========================================================
function showRune() {
  // store random number for showing rune cast
  let random = randomRune();
  let runeStave = getRune(random);

  const runicResult = document.getElementById("runic-result");
  runicResult.innerHTML = runeStave;

  showMessage(random);
}

// ========================================================
function randomRune() {
  // generate a random number between 0 and 23
  let max = 23;
  let randomNumber = Math.floor(Math.random() * max);
  return randomNumber;
}

// ========================================================
function getRune(randomStave) {
  // associate the runes with their numbers
  rune = {
    0: fehu,
    1: uruz,
    2: thurisaz,
    3: ansuz,
    4: raido,
    5: kenaz,
    6: gebo,
    7: wunjo,
    8: hagalaz,
    9: naudiz,
    10: isa,
    11: jera,
    12: eihwaz,
    13: perthro,
    14: algiz,
    15: sowilo,
    16: tiwaz,
    17: berkano,
    18: ehwaz,
    19: mannaz,
    20: laguz,
    21: ingwaz,
    22: dagaz,
    23: othala,
  };

  return rune[randomStave];
}

// ========================================================
function showMessage(rndRune) {
  // the text for the associated message
  runeCast = {
    0: "Fehu: |F| (Domestic cattle, wealth) Wealth. Possessions won or earned, earned income. Luck. Abundance, financial strength in the present or near future. Hope and plenty, success and happiness. Social success.",
    1: "Uruz: |U| (Aurochs; European wild ox) Physical strength and speed, untamed potential. A time of great energy and health. Freedom, action, courage, strength, tenacity, understanding, wisdom. Sudden or unexpected changes (usually for the better).",
    2: "Thurisaz: |Unvoiced TH| (Thorn, thurses) Protection. Reactive force of destruction and defense. Instinctual will, regenerative catalyst. A tendency toward change. Catharsis, purging, cleansing fire. Male sexuality. Mjollinir.",
    3: "Ansuz: |Short A| (Os, i.e. Odin) A revealing message or insight, dreams, teaching. Communication. Signals, inspiration, enthusiasm, speech, true vision, power of words and naming. Blessings. Taking of advice. Sacred 3.",
    4: "Raido: |R| (Wagon or chariot) A journey, both real and metaphorical. A change of place or setting. Seeing a larger perspective. The journey, the road and the vehicle.",
    5: "Kenaz: |K| (Torch) Vision, revelation, knowledge, creativity, inspiration, technical ability. Fire of life, transformation and regeneration. Power to create reality Passion.",
    6: "Gebo: |Hard G| (Gift) Giving and recieving gifts. Balance. A new or strengthened friendship. Reciprocity.",
    7: "Wunjo: |W or V| (Joy) Joy, comfort, pleasure. Fellowship, harmony, prosperity, spiritual reward, recognition of worth.",
    8: "Hagalaz: |H| (Hailstone) Transformation. Wrath of nature, destructive, uncontrolled forces, possibly the weather or in the mind. Tempering, testing, trial. Controlled crisis. Be cautious and wait for the hailstones to return to water. Sacred 9.",
    9: "Naudiz: |N| (Need) Delays, restriction, powerlessness. Sacred need-fire (self-reliance). Resistance leading to strength, innovation. Distress, confusion, conflict, and the power of will to overcome. Endurance, survival, determination. A time to exercise patience. Major self-initiated change. Facing your fears.",
    10: "Isa: |Long E| (Ice) Standstill, stasis, constraint. Slow progress. Blockage. Frozen. A time to wait. A challenge or frustration. Psychological blocks to thought or activity. This rune reinforces runes around it.",
    11: "Jera: |Y or soft G| (Year, good harvest.) The results of earlier efforts are realized. A time of peace and happiness, fruitful season. The promise of success earned. Cycle of life, cyclical pattern. Change in its own time.",
    12: "Eihwaz: |Long I| (Yew tree) Strength, reliability, dependability, trustworthiness. Enlightenment, endurance. Defense, protection. Strong and flexible. Achievable goals. An honest man who can be relied upon",
    13: "Perthro: |P| (Dice cup, vagina) A secret matter, a mystery, hidden things. Initiation, knowledge of one's destiny, knowledge of future matters, determining the future or your path. Luck. Feminine mysteries. Evolutionary change.",
    14: "Algiz: |Z| (Elk) Powerful protection, a shield. The protective urge to shelter oneself or others. Defense, warding off of evil, shield, guardian. Connection with the gods, awakening, higher life. It can be used to channel energies appropriately. Follow your instincts. Keep hold of success or maintain a position won or earned. ",
    15: "Sowilo: |S| (Sun) Success, goals achieved, honor. The life-force, health. A time of positive change. Victory of light over darkness. Health and success. Purifying light.",
    16: "Tiwaz: |T| (Tyr) Honor, justice, leadership and authority. Analysis, rationality. Knowing your own strength. Self-sacrifice. Victory and success in competition. Justice in legal matters.",
    17: "Berkano: |B| (Berchta, the birch-goddess) Birth, fertility, mental and physical personal growth. Liberation. Spring, renewal, new beginnings, new growth. Arousal of desire. A love affair or new birth. The prospering of an enterprise or venture. The desir.",
    18: "Ehwaz: |Short E| (Horse) Transportation. Any form of transportation such as a horse, car, plane, boat or other vehicle. Gradual development and steady progress are indicated. Strength, teamwork, trust, loyalty. (18th rune; sacred double 9).",
    19: "Mannaz: |M|  (Mankind, Mani, the moon-god) The self, the individual or the human race. Your attitude toward others and their attitudes towards you. Friends and enemies, social order. Intelligence, forethought, creativity, skill, ability. Measure your time. Time is cyclical.",
    20: "Laguz: |L| (Lake or leek) Water, sea, fertility, healing power. Life energy, organic growth. Imagination. Dreams, fantasies, mysteries, the unknown, the hidden, the deep, the underworld. Success in travel or acquisition, but with the possibility of loss.",
    21: "Ingwaz: |NG| (Ingui Frey, Lord Ing) Male fertility, gestation, internal growth. Common virtues, common sense, simple strengths, family love, caring, human warmth, the home. Rest, a time of relief, of no anxiety. A time when all loose strings are tied and you are free to move in a new direction. Trust your intuition.",
    22: "Dagaz: |D or voiced TH| (Day) Breakthrough, enlightenment, awakening, awareness. Clarity of daylight. A time to plan or embark. The power of change and transformation. Hope, happiness, security and certainty. Growth and release.",
    23: "Othala: |Long O| (Ancestral property.) Inherited property or possessions or home. What is truly important. Family prosperity. Land of birth and heritage (spiritual and physical). Increasing abundance.",
  };

  const runeData = document.getElementById("rune-data");
  runeData.innerHTML = runeCast[rndRune];
}

// ========================================================
function main() {
  init();
}

main();
