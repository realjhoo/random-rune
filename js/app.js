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

const four = "|||",
  five = "||" + "&#x0338" + "||";

// generate a random number between 0 and 23
// var max = randomMessages.length;
let max = 23;
let rndNum = Math.floor(Math.random() * max);
console.log(rndNum);
/* PCODE and design notes for this app
  On load, present user with simple interface
  All text in runestaves
  Random Rune at top can type or burn in
]

 Begin button
 Click - Alu fades in and out 9 times
 Fades out last time, chosen rune fades in
 Click on rune reveals additional information and guidance (English)
 Bottom of page has Hail Odin (runic)
 
*/
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

  let runic_result = document.getElementById("runic-result");
  runic_result.innerHTML = fehu;

  let title = document.getElementById("title");
  title.innerHTML = runic_title;

  let instructions = document.getElementById("instructions");
  instructions.innerHTML = directions;
}

function main() {
  console.log("It begins");
  init();
}

main();
