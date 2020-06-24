// global define runes
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

// *** Particles ***

/* App Logic:

 x On Load - show insructions and ALU
 Click button - ALU fades in and out 9 times (annoying, right?)
 Begin button is greyed during this? Or Cancel
 Random Rune is displayed
 Begin button becomes Reset button
 Click on Rune itself revelas additional information (in Roman alphabet)
 Bottom of page has Hail Odin (runic)
 
*/

// *** Random Rune ***
// initialize the page
// ========================================================
function init() {
  const runic_title =
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

  // assemble words for easier use
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

  // show directions in rune staves
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

  // place title abd directions in the DOM
  let title = document.getElementById("title");
  title.innerHTML = runic_title;

  let instructions = document.getElementById("instructions");
  instructions.innerHTML = directions;

  let runic_result = document.getElementById("runic-result");
  runic_result.innerHTML = dot + alu;

  // set up button
  let beginButton = document.getElementById("begin-button");
  beginButton.addEventListener("click", buttonClick);
}

// ========================================================
function getRune(randomStave) {
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
function randomRune() {
  // generate a random number between 0 and 23
  // var max = randomMessages.length;
  let max = 23;
  let rndNum = Math.floor(Math.random() * max);
  return rndNum;
}

// ========================================================
function showRune() {
  console.log(getRune(randomRune()));
  let x = getRune(randomRune());

  let runic_result = document.getElementById("runic-result");
  runic_result.innerHTML = x;
}

// ========================================================
function buttonClick() {
  showRune();
}

// ========================================================
function main() {
  init();
}

main();
