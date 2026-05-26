import React, { useState, useEffect, useRef } from "react";

// -----------------------------------------------------
// DATABÁZE SLOV A ÚROVNÍ
// -----------------------------------------------------
const LEVELS = {
  1: {
    id: 1,
    name: "Úroveň 1: Začátečník 🐣",
    description: "Lehká slova bez háčků a základní čísla.",
    words: [
      "pes",
      "les",
      "oko",
      "nos",
      "mrak",
      "vlak",
      "kolo",
      "sova",
      "auto",
      "hrad",
      "strom",
      "kniha",
      "okno",
      "voda",
      "zima",
      "ruka",
      "noha",
      "ucho",
      "zub",
      "vlas",
      "den",
      "noc",
      "rak",
      "sen",
      "syn",
      "dar",
      "rok",
      "let",
      "plot",
      "byt",
      "luk",
      "had",
      "led",
      "med",
      "sud",
      "lev",
      "most",
      "kos",
      "krk",
      "vlk",
      "slon",
      "1",
      "2",
      "5",
      "10",
      "20",
      "100",
    ],
  },
  2: {
    id: 2,
    name: "Úroveň 2: Průzkumník 🦊",
    description: "Slova s háčky (bez ť, ď, ň) a větší čísla.",
    words: [
      "žába",
      "řeka",
      "žebřík",
      "nůžky",
      "hřebík",
      "počítač",
      "čokoláda",
      "pomeranč",
      "růže",
      "nůž",
      "lžíce",
      "talíř",
      "hrneček",
      "večeře",
      "město",
      "kříž",
      "kůže",
      "slunce",
      "vítr",
      "mýdlo",
      "sýr",
      "kráva",
      "pták",
      "myš",
      "léto",
      "březen",
      "září",
      "říjen",
      "škola",
      "školka",
      "žák",
      "učitel",
      "15",
      "42",
      "1000",
      "2024",
    ],
  },
  3: {
    id: 3,
    name: "Úroveň 3: Šikula 🐯",
    description: "Jednoduchá spojení 2 až 3 slov a čísla.",
    words: [
      "Pes štěká",
      "Slunce zapadá",
      "Kočka pije",
      "Táta čte",
      "Dnes je úterý",
      "Mám velký hlad",
      "Jdeme ven",
      "Auto jede rychle",
      "Venku silně prší",
      "Zelená tráva",
      "Vysoký strom",
      "Malý ptáček",
      "Bílý mrak",
      "Červené jablko",
      "Rychlý vlak",
      "Hluboká řeka",
      "Studená voda",
      "Teplý čaj",
      "Píšu úkol",
      "Čtu si knihu",
      "Máma vaří",
      "Bratr spí",
      "Sestra kreslí",
      "Děda pracuje",
      "Babička peče",
      "Běžíme domů",
      "Skáčeme vysoko",
      "Dívám se",
      "Modré nebe",
      "Jezdím na kole",
      "Je mi 10 let",
      "Kup 5 rohlíků",
      "Mám 2 psy",
    ],
  },
  4: {
    id: 4,
    name: "Úroveň 4: Spisovatel ✍️",
    description: "Věty s interpunkcí a těžší česká gramatika.",
    words: [
      "Ahoj, jak se máš?",
      "Dnes prší, viď?",
      "Pozor, jede auto!",
      "Jablka, hrušky a švestky.",
      "Kde jsi byl včera?",
      "Uf, to bylo těsné!",
      "Koupíš sýr a chléb?",
      "Viděl jsi tu labuť?",
      "Můj kůň běží rychle.",
      "Náměstí je plné lidí.",
      "Dáš si se mnou oběd?",
      "Hlemýžď se plazí.",
      "Kde je to malé štěně?",
      "Paměť mi dobře slouží.",
      "Mám novou a velkou loď.",
      "Máš chuť na čokoládu?",
      "Dej mi to nářadí!",
      "Zítra bude jistě pršet.",
      "Nezapomeň na svůj úkol!",
      "Půjdeme dnes do kina?",
      "Venku už je velká tma.",
      "Dobrou noc, mami!",
      "Tati, podívej se!",
      "To je překvapení!",
      "Koupil jsi 10 jablek?",
      "Dnes je 28. října.",
      "Vlak jede v 15 hodin.",
      "Vezmi si to s sebou!",
      "Pojď se mnou ven.",
      "Chtěl jsi mi něco říct?",
      "Zpíval jsi moc hezky.",
      "Děti si hrály na hřišti.",
      "Výjimečně se mi to líbí.",
      "Slyšel jsi tu novinu?",
    ],
  },
  5: {
    id: 5,
    name: "Úroveň 5: Hacker 💻",
    description: "Skupiny 4 znaků (písmena a jednoduché znaky).",
    words: [
      "a+B-",
      "x?Z!",
      "1@9&",
      "+A-b",
      "=1?2",
      "!.@,",
      "&*()",
      "A@b*",
      "X+y-",
      "1*2(",
      "c&D*",
      "E!f?",
      "g@H+",
      "3-4=",
      "i,J.",
      "k?L!",
      "m+N-",
      "5&6*",
      "o(P)",
      "q=R+",
      "s?T!",
      "u@V&",
      "w+X-",
      "y*Z(",
      "7@8&",
      "9-0=",
      "a.B,",
      "c!D?",
      "e(F)",
      "g*H&",
    ],
  },
  6: {
    id: 6,
    name: "Úroveň 6: Ninja klávesnice 🥷",
    description: "Skupiny 6 složitých znaků (často s AltGr).",
    words: [
      "#a${}b",
      "[c]d<e",
      ">f~g\\",
      "|h^i€",
      "§j°k#",
      "$l{m}",
      "[n<o>",
      "~p\\q|",
      "^r€s§",
      "°t#u$",
      "{v}w[",
      "]x<y>",
      "~z\\A|",
      "^B€C§",
      "°D#E$",
      "{F}G[",
      "]H<I>",
      "~J\\K|",
      "^L€M§",
      "°N#O$",
      "#1$2{3",
      "}4[5]",
      "<6>7~8",
      "\\9|0^",
      "€a§b°",
      "#X$Y{Z",
      "}A[B]",
      "<C>D~E",
      "\\F|G^",
      "§1°2#",
    ],
  },
};

const BOSS_TEXTS = [
  "Rychle napiš tohle slovo, než boss zaútočí!",
  "Temný drak chrlí oheň, braň se rychle!",
  "Kouzelník sesílá blesk, odraz ho klávesnicí!",
  "Pozor na padající meteorit, uhni!",
  "Tohle je ultimátní zkouška tvé rychlosti.",
];

// Tahák na klávesnici
const getHintForChar = (char) => {
  if (!char) return null;
  const charMap = {
    ť: [["Shift", "ˇ (vedle Backspace)", "poté", "t"]],
    ď: [["Shift", "ˇ (vedle Backspace)", "poté", "d"]],
    ň: [["Shift", "ˇ (vedle Backspace)", "poté", "n"]],
    Ť: [["Shift", "ˇ", "poté", "Shift", "T"]],
    Ď: [["Shift", "ˇ", "poté", "Shift", "D"]],
    Ň: [["Shift", "ˇ", "poté", "Shift", "N"]],
    "@": [["Pravý Alt (AltGr)", "V"]],
    "#": [["Pravý Alt (AltGr)", "X"]],
    "&": [["Pravý Alt (AltGr)", "C"]],
    "{": [["Pravý Alt (AltGr)", "B"]],
    "}": [["Pravý Alt (AltGr)", "N"]],
    "[": [["Pravý Alt (AltGr)", "F"]],
    "]": [["Pravý Alt (AltGr)", "G"]],
    "<": [["Pravý Alt (AltGr)", ","]],
    ">": [["Pravý Alt (AltGr)", "."]],
    "~": [["Pravý Alt (AltGr)", "1"]],
    "\\": [["Pravý Alt (AltGr)", "Q"]],
    "|": [["Pravý Alt (AltGr)", "W"]],
    "^": [["Pravý Alt (AltGr)", "3"]],
    "€": [["Pravý Alt (AltGr)", "E"]],
    "§": [["Klávesa pod Esc"]],
    "°": [["Pravý Alt (AltGr)", "5"]],
    $: [["Pravý Alt (AltGr)", "Ů"]],
    "?": [["Shift", ", (čárka)"]],
    "!": [["Shift", "§ (pod Esc)"]],
    "+": [["Numerická +"], ["1 (vlevo nahoře)"]],
    "-": [["Numerická -"], ["- (vedle pravého Shiftu)"]],
    "=": [["Shift", "- (vedle pravého Shiftu)"]],
    "*": [["Numerická *"], ["Pravý Alt (AltGr)", "-"]],
    "/": [["Numerická /"], ["Shift", "ú"]],
    ".": [["Numerická ."], ["Klávesa . (vedle čárky)"]],
    ",": [["Klávesa , (vedle M)"]],
    " ": [["Mezerník (nejdelší klávesa dole)"]],
    á: [["Číslo 8 (v horní řadě)"]],
    é: [["Číslo 0 (v horní řadě)"]],
    í: [["Číslo 9 (v horní řadě)"]],
    ý: [["Číslo 7 (v horní řadě)"]],
    ú: [["Klávesa vedle P"]],
    ů: [["Klávesa vedle L"]],
    š: [["Číslo 3 (v horní řadě)"]],
    č: [["Číslo 4 (v horní řadě)"]],
    ř: [["Číslo 5 (v horní řadě)"]],
    ž: [["Číslo 6 (v horní řadě)"]],
    ě: [["Číslo 2 (v horní řadě)"]],
    "(": [["Shift", "8 (v horní řadě)"]],
    ")": [["Shift", "9 (v horní řadě)"]],
  };
  if (charMap[char]) return charMap[char];
  if (/[0-9]/.test(char))
    return [[`Numerická ${char}`], ["Shift", `${char} (v horní řadě)`]];
  if (/[A-Z]/.test(char)) return [["Shift", char.toUpperCase()]];
  if (/[ÁÉÍÓÚŮÝŠČŘŽ]/.test(char)) {
    const lower = char.toLowerCase();
    if (charMap[lower]) return [["Shift", charMap[lower][0][0]]];
  }
  return [[`Klávesa ${char.toUpperCase()}`]];
};

const getExpNeeded = (level) => {
  const req = {
    1: 10,
    2: 15,
    3: 20,
    4: 25,
    5: 40,
    6: 60,
    7: 90,
    8: 140,
    9: 200,
  };
  return req[level] || 9999;
};

const getCumulativeExp = (targetLevel) => {
  if (targetLevel === 1) return 0;
  let total = 0;
  for (let i = 1; i < targetLevel; i++) {
    total += getExpNeeded(i);
  }
  return total;
};

// -----------------------------------------------------
// ZVÍŘÁTKA (PETS) SVG
// -----------------------------------------------------
const PetAvatar = ({ petId }) => {
  if (!petId) return null;

  if (petId === "dog") {
    return (
      <g transform="translate(130, 150) scale(0.6)">
        <path
          d="M 0 30 Q -10 30 -10 10 Q 0 -10 20 -10 Q 40 -10 50 10 Q 60 30 50 30 Z"
          fill="#8B4513"
          filter="url(#dropShadow)"
        />
        <path d="M -5 -5 Q -15 -15 -5 -25 Q 5 -15 5 -5 Z" fill="#5C4033" />
        <path d="M 45 -5 Q 55 -15 45 -25 Q 35 -15 35 -5 Z" fill="#5C4033" />
        <circle cx="10" cy="5" r="3" fill="#000" />
        <circle cx="30" cy="5" r="3" fill="#000" />
        <ellipse cx="20" cy="15" rx="6" ry="4" fill="#000" />
        <path
          d="M 20 20 Q 25 25 30 20"
          stroke="#000"
          strokeWidth="2"
          fill="none"
        />
      </g>
    );
  }
  if (petId === "cat") {
    return (
      <g transform="translate(135, 145) scale(0.5)">
        <path
          d="M 0 30 Q -10 30 -10 10 Q 0 -10 20 -10 Q 40 -10 50 10 Q 60 30 50 30 Z"
          fill="#2F4F4F"
          filter="url(#dropShadow)"
        />
        <polygon points="-10,0 -20,-20 0,-10" fill="#2F4F4F" />
        <polygon points="50,0 60,-20 40,-10" fill="#2F4F4F" />
        <circle cx="10" cy="5" r="4" fill="#FFD700" />
        <circle cx="10" cy="5" r="1.5" fill="#000" />
        <circle cx="30" cy="5" r="4" fill="#FFD700" />
        <circle cx="30" cy="5" r="1.5" fill="#000" />
        <polygon points="17,15 23,15 20,18" fill="#FF69B4" />
        <path
          d="M 50 20 Q 80 0 70 -20"
          stroke="#2F4F4F"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          className="animate-[wind_2s_infinite]"
        />
      </g>
    );
  }
  if (petId === "owl") {
    return (
      <g
        transform="translate(140, 60) scale(0.5)"
        className="animate-[float_2s_infinite]"
      >
        <ellipse
          cx="20"
          cy="20"
          rx="25"
          ry="30"
          fill="#A9A9A9"
          filter="url(#dropShadow)"
        />
        <circle cx="5" cy="10" r="10" fill="#FFF" />
        <circle cx="5" cy="10" r="4" fill="#000" />
        <circle cx="35" cy="10" r="10" fill="#FFF" />
        <circle cx="35" cy="10" r="4" fill="#000" />
        <polygon points="15,20 25,20 20,30" fill="#FFA500" />
        <path d="M -5 20 Q -20 30 -5 40 Z" fill="#808080" />
        <path d="M 45 20 Q 60 30 45 40 Z" fill="#808080" />
      </g>
    );
  }
  if (petId === "dragon") {
    return (
      <g
        transform="translate(130, 40) scale(0.6)"
        className="animate-[float_1.5s_infinite]"
      >
        <path
          d="M 10 30 Q -10 10 10 -10 Q 30 -30 50 -10 Q 70 10 50 30 Z"
          fill="#8B0000"
          filter="url(#dropShadow)"
        />
        <circle cx="20" cy="0" r="3" fill="#FFD700" filter="url(#superGlow)" />
        <circle cx="40" cy="0" r="3" fill="#FFD700" filter="url(#superGlow)" />
        <polygon points="10,-20 0,-30 20,-15" fill="#FFA500" />
        <polygon points="50,-20 60,-30 40,-15" fill="#FFA500" />
        <path
          d="M -10 10 Q -30 -10 -10 -30 Q -5 -10 10 10 Z"
          fill="#DC143C"
          className="animate-[wind_0.5s_infinite]"
        />
        <path
          d="M 70 10 Q 90 -10 70 -30 Q 65 -10 50 10 Z"
          fill="#DC143C"
          className="animate-[wind_0.5s_infinite]"
        />
        <circle
          cx="30"
          cy="20"
          r="15"
          fill="url(#fireGlow)"
          className="animate-pulse"
          opacity="0.8"
        />
      </g>
    );
  }
  return null;
};

// -----------------------------------------------------
// EXTRÉMNÍ SVG GRAFIKA
// -----------------------------------------------------
const AdvancedHeroAvatar = ({
  level,
  hitAnim,
  healAnim,
  levelUpAnim,
  size = "normal",
  activePet,
}) => {
  const svgDefs = (
    <defs>
      <linearGradient id="gradSteel" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="25%" stopColor="#ced4da" />
        <stop offset="50%" stopColor="#868e96" />
        <stop offset="80%" stopColor="#495057" />
        <stop offset="100%" stopColor="#212529" />
      </linearGradient>
      <linearGradient id="gradGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff3cd" />
        <stop offset="20%" stopColor="#ffea00" />
        <stop offset="50%" stopColor="#f5b700" />
        <stop offset="80%" stopColor="#d08c00" />
        <stop offset="100%" stopColor="#995800" />
      </linearGradient>
      <linearGradient id="gradBlade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#e9ecef" />
        <stop offset="30%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#dee2e6" />
        <stop offset="100%" stopColor="#adb5bd" />
      </linearGradient>
      <linearGradient id="gradWood" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7f4f24" />
        <stop offset="50%" stopColor="#b08968" />
        <stop offset="100%" stopColor="#432818" />
      </linearGradient>
      <linearGradient id="gradCyber" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4a4e69" />
        <stop offset="40%" stopColor="#22223b" />
        <stop offset="100%" stopColor="#0b090a" />
      </linearGradient>
      <radialGradient id="fireGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffea00" stopOpacity="1" />
        <stop offset="30%" stopColor="#ff7b00" stopOpacity="0.9" />
        <stop offset="70%" stopColor="#d00000" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#370617" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="neonCyan" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#e0ffff" stopOpacity="1" />
        <stop offset="30%" stopColor="#00ffff" stopOpacity="0.8" />
        <stop offset="70%" stopColor="#0077b6" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#03045e" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="godAura" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="25%" stopColor="#fff3cd" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#f5b700" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="glowMagic" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="30%" stopColor="#00f5d4" stopOpacity="0.8" />
        <stop offset="70%" stopColor="#9b5de5" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffe5d9" />
        <stop offset="60%" stopColor="#ffcad4" />
        <stop offset="100%" stopColor="#f4acb7" />
      </linearGradient>
      <linearGradient id="capeGradRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff4d6d" />
        <stop offset="50%" stopColor="#c9184a" />
        <stop offset="100%" stopColor="#590d22" />
      </linearGradient>
      <linearGradient id="robeGradBlue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#5a189a" />
        <stop offset="50%" stopColor="#3c096c" />
        <stop offset="100%" stopColor="#10002b" />
      </linearGradient>
      <pattern id="strawHat" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="#e9c46a" />
        <path
          d="M 0 4 Q 4 -2 8 4 Q 4 10 0 4 Z"
          fill="#f4a261"
          stroke="#e76f51"
          strokeWidth="0.5"
        />
      </pattern>
      <pattern id="plaid" width="16" height="16" patternUnits="userSpaceOnUse">
        <rect width="16" height="16" fill="#c1121f" />
        <path
          d="M 0 8 L 16 8 M 8 0 L 8 16"
          stroke="#780000"
          strokeWidth="4"
          opacity="0.8"
        />
        <path
          d="M 0 4 L 16 4 M 4 0 L 4 16"
          stroke="#fff"
          strokeWidth="1"
          opacity="0.4"
        />
      </pattern>
      <pattern
        id="chainmail"
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
      >
        <rect width="8" height="8" fill="#495057" />
        <circle
          cx="4"
          cy="4"
          r="3"
          fill="none"
          stroke="#ced4da"
          strokeWidth="1.5"
        />
        <circle
          cx="0"
          cy="0"
          r="3"
          fill="none"
          stroke="#6c757d"
          strokeWidth="1"
        />
      </pattern>
      <pattern
        id="dragonScales"
        width="14"
        height="14"
        patternUnits="userSpaceOnUse"
      >
        <rect width="14" height="14" fill="#370617" />
        <path
          d="M 0 7 Q 7 -3 14 7 Q 7 17 0 7 Z"
          fill="#9d0208"
          stroke="#dc2f02"
          strokeWidth="1.5"
        />
        <circle cx="7" cy="5" r="1.5" fill="#ffba08" opacity="0.3" />
      </pattern>
      <pattern
        id="cyberCircuit"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <rect width="20" height="20" fill="url(#gradCyber)" />
        <path
          d="M 10 0 L 10 20 M 0 10 L 20 10"
          stroke="#00ffff"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <circle cx="10" cy="10" r="1" fill="#00ffff" />
      </pattern>
      <filter id="ultraShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow
          dx="2"
          dy="10"
          stdDeviation="8"
          floodColor="#000"
          floodOpacity="0.6"
        />
      </filter>
      <filter id="superGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="bladeGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );

  let CharConfig = {
    name: "Neznámý",
    bgAura: null,
    backCape: null,
    body: null,
    head: null,
    face: null,
    accessory: null,
    frontArm: null,
    weapon: null,
  };

  const baseHead = (
    <g filter="url(#ultraShadow)">
      <circle cx="100" cy="70" r="28" fill="url(#skinGrad)" />
      <circle
        cx="100"
        cy="70"
        r="28"
        fill="black"
        opacity="0.05"
        transform="translate(3,3)"
      />
      <circle cx="70" cy="70" r="6" fill="url(#skinGrad)" />
      <circle cx="130" cy="70" r="6" fill="url(#skinGrad)" />
    </g>
  );

  const baseEyes = (
    <g>
      <ellipse cx="88" cy="65" rx="5" ry="6" fill="#ffffff" />
      <ellipse cx="112" cy="65" rx="5" ry="6" fill="#ffffff" />
      <circle cx="88" cy="65" r="3" fill="#457b9d" />
      <circle cx="88" cy="65" r="1.5" fill="#000000" />
      <circle cx="112" cy="65" r="3" fill="#457b9d" />
      <circle cx="112" cy="65" r="1.5" fill="#000000" />
      <circle cx="86" cy="63" r="1.2" fill="#ffffff" />
      <circle cx="89" cy="66" r="0.5" fill="#ffffff" />
      <circle cx="110" cy="63" r="1.2" fill="#ffffff" />
      <circle cx="113" cy="66" r="0.5" fill="#ffffff" />
    </g>
  );

  if (level === 1) {
    CharConfig.name = "Rolník";
    CharConfig.body = (
      <g filter="url(#ultraShadow)">
        <path
          d="M 75 90 L 125 90 L 135 160 Q 100 175 65 160 Z"
          fill="#b08968"
        />
        <path
          d="M 75 90 L 125 90 L 128 110 Q 100 120 72 110 Z"
          fill="#ddb892"
        />
        <rect
          x="80"
          y="135"
          width="18"
          height="18"
          fill="#7f5539"
          transform="rotate(-5, 87, 142)"
        />
        <path
          d="M 82 135 L 96 152 M 96 135 L 82 152"
          stroke="#000"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M 70 125 Q 100 135 130 125 L 132 135 Q 100 145 68 135 Z"
          fill="#7f4f24"
        />
        <rect x="85" y="160" width="12" height="25" fill="#7f5539" />
        <rect x="103" y="160" width="12" height="25" fill="#7f5539" />
        <path d="M 78 185 L 97 185 Q 97 175 87 175 Z" fill="#432818" />
        <path d="M 103 185 L 122 185 Q 122 175 112 175 Z" fill="#432818" />
      </g>
    );
    CharConfig.head = baseHead;
    CharConfig.face = (
      <g>
        {baseEyes}
        <path
          d="M 90 82 Q 100 92 110 82"
          stroke="#9c6644"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    );
    CharConfig.accessory = (
      <g filter="url(#ultraShadow)">
        <ellipse cx="100" cy="45" rx="48" ry="14" fill="url(#strawHat)" />
        <path d="M 72 45 Q 100 -8 128 45 Z" fill="url(#strawHat)" />
        <path
          d="M 76 40 Q 100 52 124 40"
          fill="none"
          stroke="#e76f51"
          strokeWidth="5"
        />
      </g>
    );
    CharConfig.frontArm = (
      <path
        d="M 125 95 Q 140 110 135 135"
        fill="none"
        stroke="url(#skinGrad)"
        strokeWidth="13"
        strokeLinecap="round"
        filter="url(#ultraShadow)"
      />
    );
    CharConfig.weapon = (
      <g filter="url(#ultraShadow)">
        <rect
          x="139"
          y="30"
          width="8"
          height="140"
          fill="url(#gradWood)"
          rx="4"
        />
        <path
          d="M 131 40 L 155 40 L 155 55 L 147 55 L 147 47 L 139 47 L 139 55 L 131 55 Z"
          fill="url(#gradSteel)"
        />
        <circle cx="143" cy="115" r="8" fill="url(#skinGrad)" />
      </g>
    );
  } else if (level === 2) {
    CharConfig.name = "Dřevorubec";
    CharConfig.body = (
      <g filter="url(#ultraShadow)">
        <path
          d="M 75 140 L 125 140 L 125 185 L 105 185 L 105 155 L 95 155 L 95 185 L 75 185 Z"
          fill="#1d3557"
        />
        <path d="M 75 90 L 125 90 L 132 145 L 68 145 Z" fill="url(#plaid)" />
        <rect x="83" y="90" width="8" height="55" fill="#582f0e" />
        <rect x="109" y="90" width="8" height="55" fill="#582f0e" />
        <rect
          x="81"
          y="133"
          width="12"
          height="8"
          fill="url(#gradGold)"
          rx="1"
        />
        <rect
          x="107"
          y="133"
          width="12"
          height="8"
          fill="url(#gradGold)"
          rx="1"
        />
        <path d="M 70 185 L 100 185 L 95 170 L 75 170 Z" fill="#212529" />
        <path d="M 100 185 L 130 185 L 125 170 L 105 170 Z" fill="#212529" />
      </g>
    );
    CharConfig.head = baseHead;
    CharConfig.face = (
      <g>
        {baseEyes}
        <path
          d="M 78 58 L 95 63 M 122 58 L 105 63"
          stroke="#3e2723"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 70 75 Q 100 130 130 75 Q 115 95 100 95 Q 85 95 70 75 Z"
          fill="#4e342e"
          filter="url(#ultraShadow)"
        />
      </g>
    );
    CharConfig.accessory = (
      <path
        d="M 72 35 Q 100 10 128 35 Q 100 48 72 35 Z"
        fill="#2a9d8f"
        filter="url(#ultraShadow)"
      />
    );
    CharConfig.frontArm = (
      <path
        d="M 125 95 Q 150 110 138 140"
        fill="none"
        stroke="url(#plaid)"
        strokeWidth="16"
        strokeLinecap="round"
        filter="url(#ultraShadow)"
      />
    );
    CharConfig.weapon = (
      <g filter="url(#ultraShadow)">
        <rect
          x="133"
          y="40"
          width="12"
          height="120"
          fill="url(#gradWood)"
          rx="5"
        />
        <path
          d="M 133 90 L 145 95 M 133 100 L 145 105 M 133 110 L 145 115"
          stroke="#9c6644"
          strokeWidth="3"
        />
        <path
          d="M 120 55 L 158 55 L 175 80 L 175 105 L 158 130 L 120 130 L 103 105 L 103 80 Z"
          fill="url(#gradSteel)"
        />
        <path
          d="M 158 55 L 175 80 L 175 105 L 158 130 Z"
          fill="url(#gradBlade)"
        />
        <path
          d="M 120 55 L 103 80 L 103 105 L 120 130 Z"
          fill="url(#gradBlade)"
        />
        <circle cx="139" cy="120" r="9" fill="url(#skinGrad)" />
      </g>
    );
  } else if (level === 3) {
    CharConfig.name = "Strážný";
    CharConfig.body = (
      <g filter="url(#ultraShadow)">
        <rect x="85" y="150" width="12" height="35" fill="#212529" />
        <rect x="103" y="150" width="12" height="35" fill="#212529" />
        <path
          d="M 73 90 L 127 90 L 130 155 L 70 155 Z"
          fill="url(#chainmail)"
        />
        <path
          d="M 78 90 L 122 90 L 118 135 Q 100 148 82 135 Z"
          fill="url(#gradSteel)"
          stroke="#6c757d"
          strokeWidth="3"
        />
        <path d="M 95 105 L 105 105 L 100 118 Z" fill="url(#gradGold)" />
        <rect x="73" y="125" width="54" height="14" fill="#111" />
        <rect
          x="91"
          y="122"
          width="18"
          height="20"
          fill="url(#gradGold)"
          rx="3"
        />
      </g>
    );
    CharConfig.head = baseHead;
    CharConfig.accessory = (
      <g filter="url(#ultraShadow)">
        <path
          d="M 66 65 Q 100 15 134 65 L 134 82 Q 100 95 66 82 Z"
          fill="url(#gradSteel)"
        />
        <path d="M 75 65 L 125 65 L 115 82 L 85 82 Z" fill="#212529" />
        <rect x="80" y="68" width="40" height="3" fill="url(#gradSteel)" />
        <rect x="83" y="75" width="34" height="3" fill="url(#gradSteel)" />
        <rect x="98" y="65" width="4" height="17" fill="url(#gradSteel)" />
      </g>
    );
    CharConfig.frontArm = (
      <g filter="url(#ultraShadow)">
        <path
          d="M 122 95 Q 148 100 142 125"
          fill="none"
          stroke="url(#chainmail)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M 115 85 Q 138 80 148 105 Q 130 118 115 105 Z"
          fill="url(#gradSteel)"
          stroke="#ced4da"
          strokeWidth="3"
        />
      </g>
    );
    CharConfig.weapon = (
      <g filter="url(#ultraShadow)">
        <rect x="140" y="10" width="10" height="170" fill="#212529" rx="3" />
        <path d="M 134 10 L 156 10 L 145 -10 Z" fill="url(#gradSteel)" />
        <path
          d="M 150 20 Q 175 20 175 50 Q 158 60 150 38 Z"
          fill="url(#gradBlade)"
        />
        <circle cx="145" cy="120" r="9" fill="url(#gradSteel)" />
      </g>
    );
  } else if (level === 4) {
    CharConfig.name = "Šermíř";
    CharConfig.backCape = (
      <path
        d="M 60 90 Q 20 160 30 210 L 130 195 Z"
        fill="url(#capeGradRed)"
        filter="url(#ultraShadow)"
        className="animate-[wind_3s_ease-in-out_infinite]"
      />
    );
    CharConfig.body = (
      <g filter="url(#ultraShadow)">
        <rect x="83" y="150" width="16" height="35" fill="url(#gradSteel)" />
        <rect x="101" y="150" width="16" height="35" fill="url(#gradSteel)" />
        <path
          d="M 68 90 L 132 90 L 138 145 L 100 168 L 62 145 Z"
          fill="url(#gradSteel)"
        />
        <path
          d="M 80 90 L 120 90 L 115 135 L 100 152 L 85 135 Z"
          fill="url(#gradGold)"
        />
        <path
          d="M 98 100 L 112 118 L 100 135 L 88 118 Z"
          fill="#d90429"
          filter="url(#superGlow)"
        />
      </g>
    );
    CharConfig.head = baseHead;
    CharConfig.face = baseEyes;
    CharConfig.accessory = (
      <g filter="url(#ultraShadow)">
        <path
          d="M 65 60 Q 100 5 135 60 L 128 85 L 72 85 Z"
          fill="url(#gradSteel)"
        />
        <path
          d="M 100 25 L 100 50 M 88 35 L 112 35 M 93 45 L 107 45"
          stroke="url(#gradGold)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 100 10 Q 125 -15 150 15 Q 135 35 100 15 Z"
          fill="url(#capeGradRed)"
          filter="url(#ultraShadow)"
          className="animate-[wind_2s_ease-in-out_infinite]"
        />
      </g>
    );
    CharConfig.frontArm = (
      <g filter="url(#ultraShadow)">
        <path
          d="M 50 95 L 98 95 L 98 140 Q 74 180 50 140 Z"
          fill="url(#gradSteel)"
        />
        <path
          d="M 55 100 L 93 100 L 93 135 Q 74 170 55 135 Z"
          fill="url(#capeGradRed)"
        />
        <path
          d="M 70 105 L 78 105 L 78 150 L 70 150 M 58 120 L 90 120 L 90 128 L 58 128"
          fill="url(#gradGold)"
          filter="url(#superGlow)"
        />
      </g>
    );
    CharConfig.weapon = (
      <g filter="url(#ultraShadow)">
        <rect x="135" y="65" width="12" height="90" fill="url(#gradBlade)" />
        <path d="M 135 65 L 141 45 L 147 65 Z" fill="url(#gradBlade)" />
        <rect
          x="120"
          y="155"
          width="42"
          height="10"
          fill="url(#gradGold)"
          rx="3"
        />
        <circle
          cx="141"
          cy="160"
          r="6"
          fill="#ff0000"
          filter="url(#superGlow)"
        />
        <rect x="136" y="165" width="10" height="22" fill="#212529" />
        <circle cx="141" cy="188" r="8" fill="url(#gradGold)" />
        <circle cx="141" cy="160" r="10" fill="url(#gradSteel)" />
      </g>
    );
  } else if (level === 5) {
    CharConfig.name = "Ninja";
    CharConfig.body = (
      <g filter="url(#ultraShadow)">
        <path d="M 72 90 L 128 90 L 122 165 L 78 165 Z" fill="#0b090a" />
        <rect x="72" y="132" width="56" height="14" fill="#d90429" />
        <path
          d="M 82 90 L 105 132 M 118 90 L 95 132"
          stroke="#161a1d"
          strokeWidth="4"
        />
        <rect x="83" y="165" width="14" height="35" fill="#0b090a" />
        <rect x="103" y="165" width="14" height="35" fill="#0b090a" />
        <path
          d="M 83 175 L 97 180 M 83 185 L 97 190 M 103 175 L 117 180 M 103 185 L 117 190"
          stroke="#d90429"
          strokeWidth="3"
        />
        <path
          d="M 95 139 L 100 132 L 105 139 L 112 139 L 107 144 L 109 151 L 100 146 L 91 151 L 93 144 L 88 139 Z"
          fill="url(#gradSteel)"
          filter="url(#superGlow)"
        />
      </g>
    );
    CharConfig.head = (
      <circle
        cx="100"
        cy="70"
        r="28"
        fill="#0b090a"
        filter="url(#ultraShadow)"
      />
    );
    CharConfig.face = (
      <g>
        <ellipse cx="100" cy="65" rx="24" ry="10" fill="url(#skinGrad)" />
        <circle
          cx="90"
          cy="65"
          r="5"
          fill="#ff0000"
          filter="url(#superGlow)"
          className="animate-[pulse_1s_infinite]"
        />
        <circle
          cx="110"
          cy="65"
          r="5"
          fill="#ff0000"
          filter="url(#superGlow)"
          className="animate-[pulse_1s_infinite]"
        />
        <path
          d="M 82 58 L 95 62 M 118 58 L 105 62"
          stroke="#0b090a"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>
    );
    CharConfig.backCape = (
      <g
        className="animate-[wind_2s_ease-in-out_infinite]"
        filter="url(#ultraShadow)"
      >
        <path d="M 75 50 Q 20 60 10 110 Q 35 85 75 65 Z" fill="#d90429" />
        <path d="M 75 55 Q 10 85 0 140 Q 25 105 75 70 Z" fill="#9a031e" />
      </g>
    );
    CharConfig.frontArm = (
      <g filter="url(#ultraShadow)">
        <path
          d="M 122 95 Q 150 100 138 138"
          fill="none"
          stroke="#0b090a"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 127 112 L 142 118 M 130 123 L 144 129"
          stroke="#d90429"
          strokeWidth="3"
        />
      </g>
    );
    CharConfig.weapon = (
      <g filter="url(#ultraShadow)">
        <path
          d="M 135 135 Q 165 85 175 30 L 167 25 Q 152 80 130 125 Z"
          fill="url(#gradBlade)"
          filter="url(#bladeGlow)"
        />
        <rect
          x="125"
          y="123"
          width="22"
          height="6"
          fill="url(#gradGold)"
          transform="rotate(40, 136, 126)"
        />
        <rect
          x="117"
          y="132"
          width="16"
          height="8"
          fill="#d90429"
          transform="rotate(40, 125, 136)"
        />
        <circle cx="132" cy="130" r="8" fill="url(#skinGrad)" />
      </g>
    );
  } else if (level === 6) {
    CharConfig.name = "Mág";
    CharConfig.bgAura = (
      <g>
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="url(#glowMagic)"
          className="animate-[pulse_3s_infinite]"
        />
        <circle
          cx="100"
          cy="100"
          r="110"
          stroke="url(#glowMagic)"
          strokeWidth="2"
          fill="none"
          className="animate-[spin-slow_10s_linear_infinite]"
          strokeDasharray="20 10 5 10"
        />
      </g>
    );
    CharConfig.body = (
      <g filter="url(#ultraShadow)">
        <path
          d="M 70 90 L 130 90 L 150 190 L 50 190 Z"
          fill="url(#robeGradBlue)"
        />
        <path
          d="M 90 90 L 110 90 L 125 190 L 75 190 Z"
          fill="#00f5d4"
          opacity="0.3"
        />
        <rect x="75" y="130" width="50" height="12" fill="url(#gradGold)" />
        <circle
          cx="85"
          cy="150"
          r="3"
          fill="#fff"
          filter="url(#superGlow)"
          className="animate-pulse"
        />
        <circle cx="115" cy="170" r="2" fill="#fff" className="animate-ping" />
        <circle
          cx="100"
          cy="110"
          r="4"
          fill="#fee440"
          filter="url(#superGlow)"
        />
        <rect
          x="60"
          y="135"
          width="22"
          height="30"
          fill="#3c096c"
          rx="2"
          transform="rotate(15, 60, 135)"
        />
        <rect
          x="64"
          y="137"
          width="14"
          height="26"
          fill="#fff"
          transform="rotate(15, 60, 135)"
        />
        <circle
          cx="71"
          cy="150"
          r="3"
          fill="#00f5d4"
          filter="url(#superGlow)"
          transform="rotate(15, 60, 135)"
        />
      </g>
    );
    CharConfig.head = baseHead;
    CharConfig.face = (
      <g>
        {baseEyes}
        <path
          d="M 72 75 Q 100 170 128 75 Q 112 98 100 98 Q 88 98 72 75 Z"
          fill="#e9ecef"
          filter="url(#ultraShadow)"
        />
      </g>
    );
    CharConfig.accessory = (
      <g filter="url(#ultraShadow)">
        <ellipse cx="100" cy="55" rx="45" ry="12" fill="#10002b" />
        <path
          d="M 70 55 Q 85 -5 135 -15 Q 110 25 130 55 Z"
          fill="url(#robeGradBlue)"
        />
        <path
          d="M 78 45 Q 100 55 122 45"
          stroke="url(#gradGold)"
          strokeWidth="5"
          fill="none"
        />
        <circle
          cx="130"
          cy="-10"
          r="4"
          fill="#00f5d4"
          filter="url(#superGlow)"
        />
      </g>
    );
    CharConfig.frontArm = (
      <path
        d="M 120 95 Q 145 100 148 125"
        fill="none"
        stroke="url(#robeGradBlue)"
        strokeWidth="16"
        strokeLinecap="round"
        filter="url(#ultraShadow)"
      />
    );
    CharConfig.weapon = (
      <g
        className="animate-[float_3s_ease-in-out_infinite]"
        filter="url(#ultraShadow)"
      >
        <rect
          x="144"
          y="50"
          width="10"
          height="140"
          fill="url(#gradWood)"
          rx="5"
        />
        <path d="M 136 50 L 162 50 L 154 38 L 144 38 Z" fill="url(#gradGold)" />
        <polygon
          points="149,0 164,25 149,50 134,25"
          fill="#00f5d4"
          filter="url(#superGlow)"
        />
        <circle cx="149" cy="25" r="28" fill="url(#glowMagic)" />
        <circle cx="149" cy="125" r="8" fill="url(#skinGrad)" />
      </g>
    );
  } else if (level === 7) {
    CharConfig.name = "Paladin";
    CharConfig.bgAura = (
      <g>
        <circle
          cx="100"
          cy="100"
          r="100"
          fill="url(#godAura)"
          className="animate-[pulse_3s_infinite]"
        />
        <path
          d="M 100 10 L 105 100 L 100 190 L 95 100 Z"
          fill="#ffffff"
          opacity="0.5"
          filter="url(#superGlow)"
        />
        <path
          d="M 10 100 L 100 105 L 190 100 L 100 95 Z"
          fill="#ffffff"
          opacity="0.5"
          filter="url(#superGlow)"
        />
      </g>
    );
    CharConfig.backCape = (
      <g
        className="animate-[wind_3s_ease-in-out_infinite]"
        filter="url(#ultraShadow)"
      >
        <path d="M 55 90 Q 10 150 0 210 L 80 200 Z" fill="#ffffff" />
        <path d="M 145 90 Q 190 150 200 210 L 120 200 Z" fill="#ffffff" />
      </g>
    );
    CharConfig.body = (
      <g filter="url(#ultraShadow)">
        <rect x="83" y="150" width="16" height="38" fill="url(#gradSteel)" />
        <rect x="101" y="150" width="16" height="38" fill="url(#gradSteel)" />
        <path
          d="M 62 90 L 138 90 L 132 155 Q 100 175 68 155 Z"
          fill="url(#gradSteel)"
        />
        <path
          d="M 75 90 L 125 90 L 120 145 Q 100 160 80 145 Z"
          fill="#ffffff"
        />
        <path
          d="M 100 100 L 115 118 L 100 135 L 85 118 Z"
          fill="url(#gradGold)"
          filter="url(#superGlow)"
        />
        <path d="M 100 105 L 110 118 L 100 130 L 90 118 Z" fill="#fff" />
      </g>
    );
    CharConfig.head = baseHead;
    CharConfig.face = baseEyes;
    CharConfig.accessory = (
      <g filter="url(#ultraShadow)">
        <path
          d="M 66 60 Q 100 5 134 60 L 128 80 L 72 80 Z"
          fill="url(#gradSteel)"
        />
        <path
          d="M 72 60 Q 40 20 10 30 Q 40 65 68 75 Z"
          fill="url(#gradGold)"
          filter="url(#superGlow)"
        />
        <path
          d="M 128 60 Q 160 20 190 30 Q 160 65 132 75 Z"
          fill="url(#gradGold)"
          filter="url(#superGlow)"
        />
        <path
          d="M 100 20 L 100 50 M 88 35 L 112 35"
          stroke="url(#gradGold)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
    );
    CharConfig.frontArm = (
      <path
        d="M 125 95 Q 148 105 142 135"
        fill="none"
        stroke="url(#gradSteel)"
        strokeWidth="18"
        strokeLinecap="round"
        filter="url(#ultraShadow)"
      />
    );
    CharConfig.weapon = (
      <g
        filter="url(#ultraShadow)"
        className="animate-[float_2s_ease-in-out_infinite]"
      >
        <rect x="136" y="50" width="10" height="100" fill="#212529" />
        <path
          d="M 120 25 L 162 25 L 155 60 L 127 60 Z"
          fill="url(#gradGold)"
          filter="url(#superGlow)"
        />
        <circle
          cx="141"
          cy="20"
          r="12"
          fill="#ffffff"
          filter="url(#superGlow)"
          className="animate-pulse"
        />
        <path
          d="M 115 35 L 167 35 M 141 10 L 141 50"
          stroke="#fff"
          strokeWidth="4"
        />
        <circle cx="141" cy="140" r="11" fill="url(#gradSteel)" />
      </g>
    );
  } else if (level === 8) {
    CharConfig.name = "Drakobijec";
    CharConfig.backCape = (
      <path
        d="M 60 90 Q 20 160 30 210 L 120 195 Z"
        fill="#370617"
        filter="url(#ultraShadow)"
        className="animate-[wind_2s_ease-in-out_infinite]"
      />
    );
    CharConfig.body = (
      <g filter="url(#ultraShadow)">
        <rect x="83" y="150" width="16" height="38" fill="#370617" />
        <rect x="101" y="150" width="16" height="38" fill="#370617" />
        <path
          d="M 62 90 L 138 90 L 132 155 Q 100 175 68 155 Z"
          fill="url(#dragonScales)"
        />
        <path
          d="M 85 90 L 115 90 L 115 135 Q 100 150 85 135 Z"
          fill="#0b090a"
        />
        <polygon
          points="100,105 112,125 88,125"
          fill="#ffea00"
          filter="url(#superGlow)"
        />
        <polygon points="100,110 106,122 94,122" fill="#ff7b00" />
      </g>
    );
    CharConfig.head = baseHead;
    CharConfig.face = (
      <g>
        {baseEyes}
        <path
          d="M 78 52 L 95 78 M 74 58 L 91 84"
          stroke="#9d0208"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    );
    CharConfig.accessory = (
      <g filter="url(#ultraShadow)">
        <path d="M 66 65 Q 100 15 134 65 L 128 82 L 72 82 Z" fill="#0b090a" />
        <path d="M 72 50 Q 40 0 20 5 Q 45 35 66 65 Z" fill="#e9ecef" />
        <path d="M 128 50 Q 160 0 180 5 Q 155 35 134 65 Z" fill="#e9ecef" />
        <path
          d="M 88 65 L 112 65 M 100 65 L 100 82"
          stroke="#d00000"
          strokeWidth="5"
        />
      </g>
    );
    CharConfig.frontArm = (
      <path
        d="M 125 95 Q 148 105 142 135"
        fill="none"
        stroke="url(#dragonScales)"
        strokeWidth="18"
        strokeLinecap="round"
        filter="url(#ultraShadow)"
      />
    );
    CharConfig.weapon = (
      <g filter="url(#ultraShadow)">
        <circle
          cx="140"
          cy="80"
          r="50"
          fill="url(#fireGlow)"
          className="animate-[pulse_0.5s_infinite]"
        />
        <path
          d="M 128 75 Q 140 0 152 75 L 146 155 L 134 155 Z"
          fill="url(#gradSteel)"
        />
        <path
          d="M 140 20 L 138 70 L 142 100 L 140 140"
          fill="none"
          stroke="#ffea00"
          strokeWidth="2"
          filter="url(#superGlow)"
          className="animate-pulse"
        />
        <path d="M 112 155 L 168 155 L 155 168 L 125 168 Z" fill="#0b090a" />
        <rect x="136" y="168" width="8" height="22" fill="#370617" />
        <circle cx="140" cy="140" r="11" fill="#0b090a" />
      </g>
    );
  } else if (level === 9) {
    CharConfig.name = "Kyborg";
    CharConfig.bgAura = (
      <g>
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="url(#neonCyan)"
          className="animate-[pulse_1.5s_infinite]"
        />
        <circle
          cx="100"
          cy="100"
          r="115"
          fill="none"
          stroke="#00ffff"
          strokeWidth="1"
          opacity="0.5"
          strokeDasharray="5 15"
          className="animate-[spin-slow_5s_linear_infinite]"
        />
      </g>
    );
    CharConfig.body = (
      <g filter="url(#ultraShadow)">
        <rect x="83" y="150" width="16" height="38" fill="url(#cyberCircuit)" />
        <rect
          x="101"
          y="150"
          width="16"
          height="38"
          fill="url(#cyberCircuit)"
        />
        <path
          d="M 62 90 L 138 90 L 132 155 L 68 155 Z"
          fill="url(#cyberCircuit)"
        />
        <path
          d="M 80 90 L 100 135 L 120 90 M 65 145 L 135 145"
          stroke="#00ffff"
          strokeWidth="3"
          fill="none"
          filter="url(#superGlow)"
        />
        <circle
          cx="100"
          cy="115"
          r="10"
          fill="#00ffff"
          filter="url(#superGlow)"
          className="animate-pulse"
        />
        <circle cx="100" cy="115" r="4" fill="#ffffff" />
      </g>
    );
    CharConfig.head = baseHead;
    CharConfig.face = (
      <g>
        <ellipse cx="88" cy="65" rx="5" ry="6" fill="#ffffff" />
        <circle cx="88" cy="65" r="3" fill="#457b9d" />
        <rect x="104" y="58" width="16" height="14" fill="#0b090a" rx="2" />
        <circle
          cx="112"
          cy="65"
          r="5"
          fill="#ff0000"
          filter="url(#superGlow)"
        />
        <rect
          x="106"
          y="64"
          width="12"
          height="2"
          fill="#ffffff"
          className="animate-pulse"
        />
        <path
          d="M 112 55 L 112 75 M 102 65 L 122 65"
          stroke="#00ffff"
          strokeWidth="1"
          opacity="0.7"
        />
      </g>
    );
    CharConfig.accessory = (
      <g filter="url(#ultraShadow)">
        <path
          d="M 95 40 L 140 40 L 140 85 L 128 85 L 128 52 L 95 52 Z"
          fill="url(#gradSteel)"
        />
        <circle
          cx="134"
          cy="46"
          r="3"
          fill="#00ffff"
          filter="url(#superGlow)"
        />
      </g>
    );
    CharConfig.frontArm = (
      <g filter="url(#ultraShadow)">
        <path
          d="M 125 95 L 142 118 L 138 145"
          fill="none"
          stroke="url(#gradSteel)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <circle
          cx="142"
          cy="118"
          r="9"
          fill="#00ffff"
          filter="url(#superGlow)"
        />
        <path d="M 134 118 L 150 118" stroke="#0b090a" strokeWidth="2" />
      </g>
    );
    CharConfig.weapon = (
      <g filter="url(#ultraShadow)">
        <rect
          x="135"
          y="0"
          width="10"
          height="135"
          fill="#00ffff"
          filter="url(#neonGlow)"
        />
        <rect
          x="137"
          y="0"
          width="6"
          height="135"
          fill="#ffffff"
          filter="url(#superGlow)"
        />
        <rect x="139" y="0" width="2" height="135" fill="#ffffff" />
        <rect
          x="131"
          y="135"
          width="18"
          height="35"
          fill="url(#gradSteel)"
          rx="3"
        />
        <rect x="131" y="140" width="18" height="5" fill="#0b090a" />
        <rect x="131" y="148" width="18" height="5" fill="#0b090a" />
        <circle cx="140" cy="150" r="11" fill="url(#gradSteel)" />
      </g>
    );
  } else {
    CharConfig.name = "Pán Klávesnice";
    CharConfig.bgAura = (
      <g>
        <circle
          cx="100"
          cy="100"
          r="105"
          fill="url(#godAura)"
          className="animate-[pulse_2s_infinite]"
        />
        <circle
          cx="100"
          cy="100"
          r="125"
          stroke="url(#gradGold)"
          strokeWidth="3"
          fill="none"
          className="animate-[spin-slow_15s_linear_infinite]"
          strokeDasharray="30 15 5 15"
        />
      </g>
    );
    CharConfig.backCape = (
      <g
        className="animate-[float_4s_ease-in-out_infinite]"
        filter="url(#superGlow)"
      >
        <rect
          x="15"
          y="30"
          width="28"
          height="28"
          fill="url(#gradGold)"
          rx="5"
          transform="rotate(15, 30, 45)"
        />
        <text
          x="22"
          y="50"
          fill="#fff"
          fontSize="16"
          fontWeight="bold"
          transform="rotate(15, 30, 45)"
        >
          W
        </text>
        <rect
          x="160"
          y="50"
          width="28"
          height="28"
          fill="url(#gradGold)"
          rx="5"
          transform="rotate(-25, 175, 65)"
        />
        <text
          x="166"
          y="70"
          fill="#fff"
          fontSize="16"
          fontWeight="bold"
          transform="rotate(-25, 175, 65)"
        >
          ⌘
        </text>
        <rect
          x="5"
          y="110"
          width="40"
          height="25"
          fill="url(#gradGold)"
          rx="5"
          transform="rotate(-15, 25, 122)"
        />
        <text
          x="12"
          y="128"
          fill="#fff"
          fontSize="14"
          fontWeight="bold"
          transform="rotate(-15, 25, 122)"
        >
          ESC
        </text>
        <rect
          x="155"
          y="130"
          width="40"
          height="25"
          fill="url(#gradGold)"
          rx="5"
          transform="rotate(20, 175, 142)"
        />
        <text
          x="162"
          y="148"
          fill="#fff"
          fontSize="14"
          fontWeight="bold"
          transform="rotate(20, 175, 142)"
        >
          ALT
        </text>
      </g>
    );
    CharConfig.body = (
      <g filter="url(#ultraShadow)">
        <path d="M 60 90 L 140 90 L 145 190 L 55 190 Z" fill="#ffffff" />
        <path
          d="M 55 180 L 145 180 L 145 190 L 55 190 Z"
          fill="url(#gradGold)"
          filter="url(#superGlow)"
        />
        <path
          d="M 75 90 L 125 90 L 100 135 Z"
          fill="url(#gradGold)"
          filter="url(#superGlow)"
          opacity="0.8"
        />
        <circle
          cx="100"
          cy="115"
          r="8"
          fill="#ffffff"
          filter="url(#superGlow)"
        />
      </g>
    );
    CharConfig.head = baseHead;
    CharConfig.face = (
      <g>
        <ellipse
          cx="88"
          cy="65"
          rx="8"
          ry="9"
          fill="#ffffff"
          filter="url(#superGlow)"
          className="animate-pulse"
        />
        <ellipse
          cx="112"
          cy="65"
          rx="8"
          ry="9"
          fill="#ffffff"
          filter="url(#superGlow)"
          className="animate-pulse"
        />
        <path
          d="M 85 80 Q 100 135 115 80 Q 100 98 85 80 Z"
          fill="#ffffff"
          filter="url(#superGlow)"
        />
      </g>
    );
    CharConfig.accessory = (
      <g
        filter="url(#ultraShadow)"
        className="animate-[float_2s_ease-in-out_infinite]"
      >
        <ellipse
          cx="100"
          cy="15"
          rx="45"
          ry="12"
          fill="none"
          stroke="url(#gradGold)"
          strokeWidth="6"
          filter="url(#superGlow)"
        />
        <ellipse
          cx="100"
          cy="15"
          rx="45"
          ry="12"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <text
          x="65"
          y="10"
          fill="#ffffff"
          fontSize="10"
          fontWeight="bold"
          filter="url(#superGlow)"
        >
          0 1 0 1 1 0 1 0 1 1
        </text>
        <text
          x="75"
          y="25"
          fill="#ffffff"
          fontSize="10"
          fontWeight="bold"
          filter="url(#superGlow)"
        >
          1 1 0 0 1 1 0
        </text>
      </g>
    );
    CharConfig.frontArm = (
      <path
        d="M 125 100 Q 155 110 142 145"
        fill="none"
        stroke="#ffffff"
        strokeWidth="18"
        strokeLinecap="round"
        filter="url(#superGlow)"
      />
    );
    CharConfig.weapon = (
      <g
        filter="url(#ultraShadow)"
        className="animate-[float_3s_ease-in-out_infinite]"
      >
        <rect
          x="135"
          y="35"
          width="12"
          height="120"
          fill="url(#gradGold)"
          rx="6"
          filter="url(#superGlow)"
        />
        <circle
          cx="141"
          cy="35"
          r="18"
          fill="#ffffff"
          filter="url(#superGlow)"
          className="animate-pulse"
        />
        <path
          d="M 130 15 L 160 15 L 160 45 L 148 45 L 148 33 L 130 33 Z"
          fill="#ffea00"
          stroke="#ffffff"
          strokeWidth="3"
          filter="url(#superGlow)"
        />
        <text x="135" y="27" fill="#000" fontSize="10" fontWeight="bold">
          ENT
        </text>
        <circle
          cx="141"
          cy="140"
          r="11"
          fill="#ffffff"
          filter="url(#superGlow)"
        />
      </g>
    );
  }

  let filterClass = "";
  if (hitAnim) filterClass = "drop-shadow-[0_0_40px_rgba(239,68,68,1)]";
  else if (healAnim) filterClass = "drop-shadow-[0_0_40px_rgba(34,197,94,1)]";
  else if (levelUpAnim)
    filterClass = "drop-shadow-[0_0_60px_rgba(234,179,8,1)]";

  const sizeClasses =
    size === "small"
      ? "w-28 h-28 sm:w-36 sm:h-36 border-4"
      : "w-56 h-56 md:w-72 md:h-72 border-8 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)]";

  return (
    <div className="flex flex-col items-center">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shakeHero { 0%, 100% { transform: translateX(0) scale(1); } 25% { transform: translateX(-12px) rotate(-8deg) scale(0.95); } 75% { transform: translateX(12px) rotate(8deg) scale(0.95); } }
        @keyframes breatheHero { 0%, 100% { transform: translateY(0) scaleY(1); } 50% { transform: translateY(-5px) scaleY(1.03); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes wind { 0%, 100% { transform: skewX(0deg); } 50% { transform: skewX(20deg); } }
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
      `,
        }}
      />

      <div
        className={`${sizeClasses} rounded-full bg-gradient-to-b from-indigo-100 to-indigo-300 overflow-hidden flex items-end justify-center transition-all duration-300 relative ${filterClass} ${
          hitAnim ? "animate-[shakeHero_0.3s_ease-in-out]" : ""
        } ${levelUpAnim ? "animate-bounce" : ""}`}
      >
        <div
          className={`absolute bottom-[-20px] w-3/4 h-1/4 bg-black opacity-30 rounded-full ${
            size === "small" ? "blur-md" : "blur-2xl"
          }`}
        ></div>

        <svg
          viewBox="0 0 200 200"
          className={`w-full h-full relative ${
            size === "small" ? "top-2" : "top-6"
          }`}
        >
          {svgDefs}
          {CharConfig.bgAura}
          {CharConfig.backCape}
          <g
            className="animate-[breatheHero_3s_ease-in-out_infinite]"
            style={{ transformOrigin: "100px 150px" }}
          >
            {CharConfig.body}
            {CharConfig.head}
            {CharConfig.face}
            {CharConfig.accessory}
            {CharConfig.frontArm}
          </g>
          {CharConfig.weapon}
          {activePet && <PetAvatar petId={activePet} />}
        </svg>
      </div>

      {size !== "small" && (
        <div className="mt-8 text-center bg-white px-10 py-4 rounded-2xl shadow-2xl border-4 border-indigo-100 transform hover:scale-105 transition-transform">
          <h2 className="text-3xl md:text-4xl font-black text-indigo-900 tracking-tight leading-tight">
            Lvl {level}:{" "}
            <span className="text-indigo-600 drop-shadow-sm">
              {CharConfig.name}
            </span>
          </h2>
          {levelUpAnim && (
            <p className="text-amber-500 font-extrabold text-xl uppercase animate-pulse mt-2 tracking-widest">
              👑 Evoluce! 👑
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// -----------------------------------------------------
// HLAVNÍ APLIKACE A LOGIKA
// -----------------------------------------------------
const SAVE_KEY = "klavesnicovy_mistr_save_v1";

export default function App() {
  const [appMode, setAppMode] = useState(null);
  const [gameState, setGameState] = useState("mode_select"); // mode_select, level_select, playing, game_over, handbook, shop
  const [currentLevel, setCurrentLevel] = useState(null);
  const [currentWord, setCurrentWord] = useState("");
  const [typedText, setTypedText] = useState("");

  // Statistiky & Čas
  const [score, setScore] = useState(0);
  const [skips, setSkips] = useState(0);
  const [correctStrokes, setCorrectStrokes] = useState(0);
  const [wrongStrokes, setWrongStrokes] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [canSkip, setCanSkip] = useState(true);
  const [showHint, setShowHint] = useState(false);

  // Herní RPG mechaniky a Ukládání
  const [hp, setHp] = useState(100);
  const [charLevel, setCharLevel] = useState(1);
  const [exp, setExp] = useState(0);

  const [gold, setGold] = useState(0);
  const [potions, setPotions] = useState(0);
  const [ownedPets, setOwnedPets] = useState([]);
  const [activePet, setActivePet] = useState(null);

  // Boss Fighty
  const [wordsTypedCounter, setWordsTypedCounter] = useState(0);
  const [isBossFight, setIsBossFight] = useState(false);
  const [bossTimeLeft, setBossTimeLeft] = useState(0);

  const [levelUpAnim, setLevelUpAnim] = useState(false);
  const [hitAnim, setHitAnim] = useState(false);
  const [healAnim, setHealAnim] = useState(false);

  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef(null);
  const inputRef = useRef(null);
  const recentHistoryRef = useRef([]);

  // Automatické načtení Tailwind CSS (aby to fungovalo v CodeSandboxu)
  useEffect(() => {
    if (!document.getElementById("tailwind-cdn")) {
      const script = document.createElement("script");
      script.id = "tailwind-cdn";
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
  }, []);

  // --- NAČÍTÁNÍ A UKLÁDÁNÍ (LocalStorage) ---
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.charLevel) setCharLevel(data.charLevel);
        if (data.exp) setExp(data.exp);
        if (data.gold) setGold(data.gold);
        if (data.potions) setPotions(data.potions);
        if (data.ownedPets) setOwnedPets(data.ownedPets);
        if (data.activePet) setActivePet(data.activePet);
      }
    } catch (e) {
      console.error("Nepodařilo se načíst uložená data", e);
    }
  }, []);

  useEffect(() => {
    try {
      const dataToSave = {
        charLevel,
        exp,
        gold,
        potions,
        ownedPets,
        activePet,
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error("Nepodařilo se uložit data", e);
    }
  }, [charLevel, exp, gold, potions, ownedPets, activePet]);

  const expNeededForNextLevel = getExpNeeded(charLevel);

  // Level Up kontrola
  useEffect(() => {
    if (appMode === "game" && exp >= expNeededForNextLevel && charLevel < 10) {
      setCharLevel((prev) => prev + 1);
      setExp((prev) => prev - expNeededForNextLevel);
      setLevelUpAnim(true);
      playSound("levelup");
      setTimeout(() => setLevelUpAnim(false), 3000);
    }
  }, [exp, charLevel, appMode, expNeededForNextLevel]);

  // Časovač rychlosti
  useEffect(() => {
    let timer;
    if (gameState === "playing" && startTime && !isBossFight) {
      timer = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, startTime, isBossFight]);

  // Boss Fight Časovač
  useEffect(() => {
    let timer;
    if (gameState === "playing" && isBossFight && bossTimeLeft > 0) {
      timer = setInterval(() => {
        setBossTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isBossFight && bossTimeLeft === 0) {
      // Čas vypršel -> Boss zaútočí
      playSound("error");
      setHitAnim(true);
      setHp((prev) => {
        const newHp = prev - 30; // Brutální dmg od bosse
        if (newHp <= 0) setGameState("game_over");
        return newHp;
      });
      setTimeout(() => setHitAnim(false), 500);
      setIsBossFight(false);
      advanceToNextWord();
    }
    return () => clearInterval(timer);
  }, [gameState, isBossFight, bossTimeLeft]);

  const currentCpm =
    elapsedSeconds > 0 ? Math.round((correctStrokes / elapsedSeconds) * 60) : 0;
  const totalStrokes = correctStrokes + wrongStrokes;
  const accuracy =
    totalStrokes > 0 ? Math.round((correctStrokes / totalStrokes) * 100) : 100;

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const toggleSound = () => {
    if (!soundEnabled) initAudio();
    setSoundEnabled(!soundEnabled);
  };

  const playSound = (type) => {
    if (!soundEnabled || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    if (type === "hit") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === "error") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === "heal") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "levelup") {
      osc.type = "square";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554.37, now + 0.15);
      osc.frequency.setValueAtTime(659.25, now + 0.3);
      osc.frequency.setValueAtTime(880, now + 0.45);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.8);
      osc.start(now);
      osc.stop(now + 0.8);
    } else if (type === "boss_warn") {
      osc.type = "square";
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.setValueAtTime(150, now + 0.2);
      osc.frequency.setValueAtTime(200, now + 0.4);
      osc.frequency.setValueAtTime(150, now + 0.6);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.8);
      osc.start(now);
      osc.stop(now + 0.8);
    } else if (type === "buy") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(1000, now);
      osc.frequency.setValueAtTime(1500, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  };

  const pickRandomWord = (levelId) => {
    const levelWords = LEVELS[levelId].words;
    let availableWords = levelWords.filter(
      (w) => !recentHistoryRef.current.includes(w)
    );
    if (availableWords.length === 0) availableWords = levelWords;
    return availableWords[Math.floor(Math.random() * availableWords.length)];
  };

  const triggerBoss = () => {
    setIsBossFight(true);
    playSound("boss_warn");
    setBossTimeLeft(15); // 15 vteřin na boss fight
    setTypedText("");
    setCurrentWord(BOSS_TEXTS[Math.floor(Math.random() * BOSS_TEXTS.length)]);
  };

  const advanceToNextWord = () => {
    const nextWord = pickRandomWord(currentLevel);
    setCurrentWord(nextWord);
    recentHistoryRef.current.push(nextWord);
    if (recentHistoryRef.current.length > 10) recentHistoryRef.current.shift();
    setShowHint(false);
  };

  const selectMode = (mode) => {
    setAppMode(mode);
    setGameState("level_select");
  };

  const startGame = (levelId) => {
    setCurrentLevel(levelId);
    setScore(0);
    setSkips(0);
    setCorrectStrokes(0);
    setWrongStrokes(0);
    setStartTime(null);
    setElapsedSeconds(0);
    setCanSkip(true);
    setTypedText("");
    setShowHint(false);
    setIsBossFight(false);
    setWordsTypedCounter(0);

    if (appMode === "game") {
      setHp(100);
      // exp a charLevel se načítají z localStorage
    }

    recentHistoryRef.current = [];
    const firstWord = pickRandomWord(levelId);
    setCurrentWord(firstWord);
    recentHistoryRef.current.push(firstWord);
    setGameState("playing");
  };

  const usePotion = () => {
    if (potions > 0 && hp < 100) {
      setPotions((p) => p - 1);
      setHp((prev) => Math.min(100, prev + 50));
      playSound("heal");
      setHealAnim(true);
      setTimeout(() => setHealAnim(false), 400);
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    if (!startTime) setStartTime(Date.now());

    if (value.length > typedText.length) {
      const expectedPrefix = currentWord.substring(0, value.length);
      const isCorrect = value === expectedPrefix;

      if (isCorrect) {
        setCorrectStrokes((p) => p + 1);
        playSound("hit");
      } else {
        setWrongStrokes((p) => p + 1);
        playSound("error");
        if (appMode === "game") {
          setHp((prevHp) => {
            const newHp = prevHp - 5;
            if (newHp <= 0) setGameState("game_over");
            return newHp;
          });
          setHitAnim(true);
          setTimeout(() => setHitAnim(false), 300);
        }
      }
    }

    setTypedText(value);

    if (value === currentWord) {
      setTimeout(() => {
        setScore((prev) => prev + 1);
        setCanSkip(true);

        if (appMode === "game") {
          if (isBossFight) {
            // Poražení Bosse
            setIsBossFight(false);
            setHp((prev) => Math.min(100, prev + 20));
            setExp((prev) => prev + 20); // Bonus za bosse
            setGold((prev) => prev + 50); // Bonus goldy
            playSound("levelup");
          } else {
            // Normální slovo
            let bonusGold = activePet === "dog" ? 2 : 0;
            let bonusExp = activePet === "dragon" ? 1 : 0;
            let healAmount = activePet === "cat" ? 3 : 1;

            setHp((prev) => Math.min(100, prev + healAmount));
            setExp((prev) => prev + LEVELS[currentLevel].id + bonusExp);
            setGold((prev) => prev + currentWord.length + bonusGold);
            setHealAnim(true);
            playSound("heal");
          }
          setTimeout(() => setHealAnim(false), 400);

          const newCounter = wordsTypedCounter + 1;
          setWordsTypedCounter(newCounter);

          // Trigger boss fight every 15 words
          if (newCounter % 15 === 0 && !isBossFight) {
            triggerBoss();
            return; // advanceToNextWord handles by triggerBoss
          }
        }

        setTypedText("");
        if (!isBossFight) advanceToNextWord();
      }, 200);
    }
  };

  const handleSkip = () => {
    if (!canSkip || isBossFight) return; // Bosse nelze přeskočit
    setSkips((prev) => prev + 1);
    setCanSkip(false);
    setTypedText("");
    advanceToNextWord();
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {
    if (gameState === "playing" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState, currentWord, showHint]);

  const buyItem = (itemType, price, id) => {
    if (gold >= price) {
      setGold((g) => g - price);
      playSound("buy");
      if (itemType === "potion") {
        setPotions((p) => p + 1);
      } else if (itemType === "pet") {
        setOwnedPets([...ownedPets, id]);
        setActivePet(id);
      }
    } else {
      playSound("error"); // Nedostatek zlaťáků
    }
  };

  const renderWordLetters = () => {
    return currentWord.split("").map((char, index) => {
      let colorClass = "text-gray-700";
      let bgClass = "";

      if (index < typedText.length) {
        if (typedText[index] === char) {
          colorClass = "text-green-500 font-bold";
        } else {
          colorClass = "text-red-500 font-bold";
          bgClass = "bg-red-100 rounded-sm";
        }
      }
      if (char === " ")
        return (
          <span
            key={index}
            className={`inline-block w-3 sm:w-5 mx-1 ${bgClass}`}
          >
            &nbsp;
          </span>
        );
      return (
        <span key={index} className={`inline-block ${colorClass} ${bgClass}`}>
          {char}
        </span>
      );
    });
  };

  let mismatchIndex = typedText.length;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] !== currentWord[i]) {
      mismatchIndex = i;
      break;
    }
  }
  const expectedChar = currentWord[mismatchIndex];
  const hintData = expectedChar ? getHintForChar(expectedChar) : null;

  // --- OBRAZOVKY ---

  if (gameState === "shop") {
    return (
      <div className="min-h-screen bg-indigo-50 flex flex-col items-center justify-start p-4 md:p-8 font-sans text-gray-800 overflow-y-auto relative">
        <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl p-8 border-4 border-indigo-200 mt-12 md:mt-0 relative">
          <button
            onClick={() => setGameState("mode_select")}
            className="absolute top-6 left-6 text-indigo-500 font-bold hover:bg-indigo-100 p-3 rounded-xl transition-colors"
          >
            ← Zpět
          </button>

          <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold text-indigo-600 mb-4">
              🛒 Tajemný Obchod
            </h1>
            <div className="bg-amber-100 text-amber-900 inline-block px-8 py-3 rounded-full font-black text-2xl border-4 border-amber-300 shadow-sm">
              Tvé zlaťáky: {gold} 🪙
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Lektvary */}
            <div className="bg-red-50 p-6 rounded-3xl border-4 border-red-200 flex flex-col items-center">
              <div className="text-6xl mb-4">🧪</div>
              <h2 className="text-2xl font-bold text-red-800 mb-2">
                Lektvar Zdraví
              </h2>
              <p className="text-red-600 text-center mb-4">
                Doplní ti 50 HP. Můžeš ho vypít přímo v boji!
              </p>
              <p className="font-bold text-lg mb-6">Máš u sebe: {potions}x</p>
              <button
                onClick={() => buyItem("potion", 50, null)}
                className={`px-8 py-4 rounded-full font-black text-xl shadow-md transition-all ${
                  gold >= 50
                    ? "bg-amber-400 hover:bg-amber-500 text-white transform hover:scale-105"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Koupit za 50 🪙
              </button>
            </div>

            {/* Zvířátka */}
            <div className="bg-green-50 p-6 rounded-3xl border-4 border-green-200 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                Magická Zvířátka
              </h2>
              <p className="text-green-700 text-center mb-6">
                Pomohou ti v tréninku. Můžeš mít vybavené jen jedno.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {[
                  {
                    id: "dog",
                    icon: "🐕",
                    name: "Pes",
                    bonus: "+2 zlaťáky navíc",
                    price: 200,
                  },
                  {
                    id: "cat",
                    icon: "🐈",
                    name: "Kočka",
                    bonus: "+3 životy (heal)",
                    price: 300,
                  },
                  {
                    id: "owl",
                    icon: "🦉",
                    name: "Sova",
                    bonus: "Jen vypadá chytře",
                    price: 400,
                  },
                  {
                    id: "dragon",
                    icon: "🐉",
                    name: "Dráček",
                    bonus: "+1 EXP za slovo",
                    price: 1000,
                  },
                ].map((pet) => {
                  const isOwned = ownedPets.includes(pet.id);
                  const isActive = activePet === pet.id;
                  return (
                    <div
                      key={pet.id}
                      className={`p-4 rounded-xl border-2 flex flex-col items-center ${
                        isActive
                          ? "bg-green-200 border-green-500"
                          : "bg-white border-green-300"
                      }`}
                    >
                      <div className="text-4xl mb-2">{pet.icon}</div>
                      <div className="font-bold">{pet.name}</div>
                      <div className="text-xs text-green-700 text-center mb-3 h-8">
                        {pet.bonus}
                      </div>
                      {isOwned ? (
                        <button
                          onClick={() => {
                            setActivePet(pet.id);
                            playSound("buy");
                          }}
                          className={`px-4 py-2 rounded-lg font-bold text-sm w-full ${
                            isActive
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 hover:bg-green-100 text-gray-700"
                          }`}
                        >
                          {isActive ? "Vybaveno" : "Vybrat"}
                        </button>
                      ) : (
                        <button
                          onClick={() => buyItem("pet", pet.price, pet.id)}
                          className={`px-4 py-2 rounded-lg font-bold text-sm w-full ${
                            gold >= pet.price
                              ? "bg-amber-400 hover:bg-amber-500 text-white"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {pet.price} 🪙
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "handbook") {
    return (
      <div className="min-h-screen bg-indigo-50 flex flex-col items-center justify-start p-4 md:p-8 font-sans text-gray-800 overflow-y-auto">
        <div className="max-w-7xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center border-4 border-indigo-200 relative mt-12 md:mt-0">
          <div className="absolute top-6 left-6 flex gap-4">
            <button
              onClick={() => setGameState("mode_select")}
              className="text-indigo-500 font-bold hover:bg-indigo-100 p-3 rounded-xl transition-colors"
            >
              ← Zpět
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600 mb-4 tracking-tight">
            📖 Příručka Hrdinů
          </h1>
          <p className="text-xl text-gray-500 mb-10">
            Zde vidíš všechny legendární formy! Začínáš od nuly a potřebuješ{" "}
            <strong className="text-amber-600">600 EXP</strong> k dosažení
            vrcholu.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lvl) => (
              <div
                key={lvl}
                className="flex flex-col items-center bg-gray-50 p-6 rounded-3xl border-4 border-gray-200 hover:border-indigo-400 transition-all shadow-md hover:shadow-xl transform hover:-translate-y-2"
              >
                <AdvancedHeroAvatar level={lvl} size="small" />
                <div className="mt-6 bg-amber-100 text-amber-900 px-5 py-2 rounded-full font-black text-base border-2 border-amber-300 shadow-sm w-full text-center tracking-wide">
                  {lvl === 1
                    ? "START"
                    : `POTŘEBA: ${getCumulativeExp(lvl)} EXP`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "mode_select") {
    return (
      <div className="min-h-screen bg-indigo-50 flex flex-col items-center justify-center p-4 font-sans text-gray-800 relative">
        <button
          onClick={toggleSound}
          className="absolute top-6 right-6 bg-white text-indigo-600 font-bold hover:bg-indigo-50 p-4 rounded-2xl transition-colors shadow-md border-2 border-indigo-200 text-lg z-10"
        >
          {soundEnabled ? "🔊 Zvuky zapnuty" : "🔇 Zvuky vypnuty"}
        </button>
        <div className="max-w-5xl w-full text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold text-indigo-600 mb-6 tracking-tight drop-shadow-sm">
            Klávesnicový Mistr
          </h1>
          <p className="text-2xl text-gray-600 mb-12">
            Vyber si, jak chceš dnes trénovat!
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <button
              onClick={() => selectMode("basic")}
              className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl border-4 border-blue-200 hover:border-blue-500 transition-all transform hover:-translate-y-2 group text-left relative overflow-hidden"
            >
              <div className="text-7xl mb-6">🏫</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                Tréninkový mód
              </h2>
              <p className="text-gray-500 text-lg">
                Bez stresu a životů. Sleduj svou rychlost a přesnost v
                detailních statistikách!
              </p>
            </button>

            <button
              onClick={() => selectMode("game")}
              className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl border-4 border-amber-200 hover:border-amber-500 transition-all transform hover:-translate-y-2 group text-left relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 bg-amber-400 text-white font-black py-1 px-8 rounded-bl-3xl shadow-md rotate-12">
                HRA!
              </div>
              <div className="text-7xl mb-6">⚔️</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
                Dobrodružství
              </h2>
              <p className="text-gray-500 text-lg">
                Leveluj svou postavu. Ukládá se tvůj postup! <br />
                <strong className="text-amber-500">
                  Máš nahráno: Lvl {charLevel}, Zlaťáky: {gold}
                </strong>
              </p>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => setGameState("handbook")}
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-black py-4 px-8 rounded-full border-4 border-indigo-300 transition-all shadow-md hover:scale-105 text-xl tracking-wide flex-grow max-w-sm"
            >
              📖 Příručka Hrdinů
            </button>
            <button
              onClick={() => setGameState("shop")}
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-black py-4 px-8 rounded-full border-4 border-amber-300 transition-all shadow-md hover:scale-105 text-xl tracking-wide flex-grow max-w-sm"
            >
              🛒 Otevřít Obchod
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "level_select") {
    return (
      <div className="min-h-screen bg-indigo-50 flex flex-col items-center justify-center p-4 font-sans text-gray-800">
        <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl p-8 text-center border-4 border-indigo-200 relative">
          <div className="absolute top-6 left-6 flex gap-4">
            <button
              onClick={() => setGameState("mode_select")}
              className="text-indigo-500 font-bold hover:bg-indigo-100 p-3 rounded-xl transition-colors"
            >
              ← Zpět na výběr módu
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600 mb-4 tracking-tight mt-12 md:mt-0">
            {appMode === "game"
              ? "🌍 Mapa Dobrodružství"
              : "📚 Tréninkové Lekce"}
          </h1>
          <p className="text-xl text-gray-500 mb-10">
            Vyber si ze 6 úrovní obtížnosti textu.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(LEVELS).map((level) => (
              <button
                key={level.id}
                onClick={() => startGame(level.id)}
                className="flex flex-col items-center p-6 bg-gray-50 hover:bg-indigo-100 border-2 border-gray-200 hover:border-indigo-400 rounded-2xl transition-all shadow-sm hover:shadow-lg text-center transform hover:-translate-y-1 relative overflow-hidden"
              >
                {appMode === "game" && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-bl-xl shadow-sm">
                    {level.id} EXP
                  </div>
                )}
                <span className="text-2xl font-bold text-gray-800 mb-2 mt-4">
                  {level.name}
                </span>
                <span className="text-sm text-gray-600 leading-tight">
                  {level.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "game_over") {
    return (
      <div className="min-h-screen bg-red-900 flex flex-col items-center justify-center p-4 font-sans text-white">
        <div className="max-w-2xl w-full bg-red-800 rounded-3xl shadow-2xl p-10 text-center border-4 border-red-500">
          <div className="text-8xl mb-6">💀</div>
          <h1 className="text-5xl font-black mb-4">Konec hry!</h1>
          <p className="text-xl mb-8">
            Došly ti životy. Ale získané zkušenosti a zlaťáky ti zůstávají!
          </p>

          <div className="bg-red-950 rounded-xl p-8 mb-8 text-left grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-red-400 mb-3 uppercase tracking-wider border-b-2 border-red-800 pb-2">
                Vývoj Hrdiny:
              </h3>
              <p className="text-lg mb-2">
                Dosažený level:{" "}
                <strong className="text-amber-400 text-xl">
                  {charLevel} / 10
                </strong>
              </p>
              <p className="text-lg">
                Zlaťáky celkem:{" "}
                <strong className="text-amber-400 text-xl">{gold}</strong>
              </p>
            </div>
            <div>
              <h3 className="font-bold text-red-400 mb-3 uppercase tracking-wider border-b-2 border-red-800 pb-2">
                Tvoje Statistiky:
              </h3>
              <p className="text-lg mb-2">
                Úseky správně:{" "}
                <strong className="text-green-400 text-xl">{score}</strong>
              </p>
              <p className="text-lg mb-2">
                Chyby (překlepy):{" "}
                <strong className="text-red-400 text-xl">{wrongStrokes}</strong>
              </p>
              <p className="text-lg mb-2">
                Přesnost:{" "}
                <strong className="text-white text-xl">{accuracy} %</strong>
              </p>
              <p className="text-lg">
                Rychlost:{" "}
                <strong className="text-amber-400 text-xl">
                  {currentCpm} úhozů/min
                </strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setGameState("mode_select")}
            className="w-full bg-white text-red-900 font-bold py-5 rounded-2xl text-2xl hover:bg-red-100 transition-colors shadow-lg"
          >
            Návrat do menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isBossFight ? "bg-red-950" : "bg-indigo-50"
      } flex flex-col items-center justify-center p-2 sm:p-4 font-sans transition-colors duration-500`}
    >
      <div className="max-w-7xl w-full">
        {appMode === "game" && (
          <div
            className={`${
              isBossFight
                ? "bg-red-900 border-red-500 animate-[shakeHero_0.5s_infinite]"
                : "bg-white border-indigo-200"
            } rounded-3xl shadow-2xl border-4 mb-6 p-8 flex flex-col md:flex-row items-center justify-center md:justify-around gap-12 transition-all duration-500`}
          >
            <div className="relative">
              {isBossFight && (
                <div className="absolute -top-10 text-white font-black text-3xl animate-pulse text-center w-full z-10">
                  BOSS ÚTOČÍ!
                </div>
              )}
              <AdvancedHeroAvatar
                level={charLevel}
                hitAnim={hitAnim || isBossFight}
                healAnim={healAnim}
                levelUpAnim={levelUpAnim}
                activePet={activePet}
              />
            </div>

            <div className="flex-grow max-w-xl w-full flex flex-col gap-8">
              <div className="relative">
                <div className="flex mb-3 items-center justify-between">
                  <span
                    className={`text-base font-black inline-block py-2 px-5 uppercase rounded-full ${
                      isBossFight
                        ? "bg-red-950 text-white"
                        : "text-red-700 bg-red-100 border-2 border-red-200"
                    } shadow-sm`}
                  >
                    ❤️ Životy (HP)
                  </span>
                  <span
                    className={`text-2xl font-black inline-block ${
                      isBossFight ? "text-white" : "text-red-600"
                    }`}
                  >
                    {hp} / 100
                  </span>
                </div>
                <div className="overflow-hidden h-10 text-xs flex rounded-full bg-red-100 border-4 border-red-200 shadow-inner">
                  <div
                    style={{ width: `${hp}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 transition-all duration-300"
                  ></div>
                </div>
              </div>

              <div className="relative flex items-center justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex mb-3 items-center justify-between">
                    <span
                      className={`text-base font-black inline-block py-2 px-5 uppercase rounded-full ${
                        isBossFight
                          ? "bg-blue-900 text-white"
                          : "text-blue-700 bg-blue-100 border-2 border-blue-200"
                      } shadow-sm`}
                    >
                      ⭐ Zkušenosti (EXP)
                    </span>
                    <span
                      className={`text-2xl font-black inline-block ${
                        isBossFight ? "text-white" : "text-blue-600"
                      }`}
                    >
                      {charLevel >= 10
                        ? "MAX LEVEL"
                        : `${exp} / ${expNeededForNextLevel}`}
                    </span>
                  </div>
                  <div className="overflow-hidden h-10 text-xs flex rounded-full bg-blue-100 border-4 border-blue-200 shadow-inner relative">
                    <div
                      style={{
                        width:
                          charLevel >= 10
                            ? "100%"
                            : `${Math.min(
                                100,
                                (exp / expNeededForNextLevel) * 100
                              )}%`,
                      }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        charLevel >= 10 ? "bg-amber-500" : "bg-blue-500"
                      } transition-all duration-700`}
                    >
                      <div
                        className="absolute inset-0 bg-white opacity-20 w-full animate-[wind_2s_linear_infinite]"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Lektvar Zdraví Tlačítko */}
                <button
                  onClick={usePotion}
                  disabled={potions <= 0 || hp >= 100}
                  className={`flex-none flex flex-col items-center justify-center p-3 rounded-2xl border-4 transition-transform ${
                    potions > 0 && hp < 100
                      ? "bg-red-100 border-red-300 hover:scale-110 cursor-pointer shadow-md"
                      : "bg-gray-200 border-gray-300 opacity-50 cursor-not-allowed"
                  }`}
                  title="Vypít lektvar zdraví (+50 HP)"
                >
                  <span className="text-3xl">🧪</span>
                  <span className="font-bold text-red-800 text-sm mt-1">
                    {potions}x
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Panel se statistikami */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center mb-6 p-5 rounded-2xl shadow-md border-2 gap-6 ${
            isBossFight
              ? "bg-red-800 border-red-600 text-white"
              : "bg-white border-indigo-100 text-gray-800"
          }`}
        >
          <div className="flex gap-4">
            <button
              onClick={() => setGameState("level_select")}
              className={`${
                isBossFight
                  ? "bg-red-900 text-white hover:bg-red-700"
                  : "bg-gray-100 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              } font-black px-5 py-3 rounded-xl transition-colors flex items-center text-lg`}
            >
              <span className="mr-2">←</span> Odejít
            </button>
            <button
              onClick={toggleSound}
              className={`${
                isBossFight
                  ? "bg-red-900 text-white hover:bg-red-700"
                  : "bg-gray-100 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              } font-black px-5 py-3 rounded-xl transition-colors flex items-center text-lg`}
            >
              {soundEnabled ? "🔊" : "🔇"}
            </button>
            <div
              className={`text-2xl font-black items-center hidden lg:flex border-l-4 pl-5 uppercase tracking-wide ${
                isBossFight ? "border-red-600" : "border-gray-200 text-gray-700"
              }`}
            >
              {isBossFight ? "BOSS FIGHT" : LEVELS[currentLevel].name}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 font-bold text-lg md:text-xl">
            {appMode === "game" && !isBossFight && (
              <div className="bg-amber-100 text-amber-900 px-5 py-2 rounded-xl border-2 border-amber-300 shadow-sm flex items-center gap-2">
                <span className="text-2xl">🪙</span> Zlaťáky: {gold}
              </div>
            )}
            <div
              className={`${
                isBossFight
                  ? "bg-red-950 text-red-200 border-red-700"
                  : "bg-blue-100 text-blue-800 border-blue-200"
              } px-5 py-2 rounded-xl border-2 shadow-sm flex items-center gap-2`}
            >
              <span className="text-2xl">⚡</span> {currentCpm} ú/m
            </div>
            {isBossFight && (
              <div className="bg-white text-red-600 px-5 py-2 rounded-xl border-4 border-red-600 shadow-lg flex items-center gap-2 font-black text-2xl animate-pulse">
                ⏳ Čas: {bossTimeLeft} s
              </div>
            )}
          </div>
        </div>

        {/* Herní plocha */}
        <div
          className={`${
            isBossFight
              ? "bg-red-100 border-red-500"
              : "bg-white border-indigo-200"
          } rounded-3xl shadow-2xl p-6 sm:p-12 text-center border-b-8 relative transition-colors duration-500`}
        >
          <button
            onClick={() => setShowHint(!showHint)}
            className={`absolute top-6 right-6 sm:top-8 sm:right-8 font-bold py-3 px-6 rounded-full border-2 transition-colors shadow-sm flex items-center gap-2 z-10 text-lg ${
              isBossFight
                ? "bg-red-200 text-red-800 hover:bg-red-300 border-red-400"
                : "bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-300"
            }`}
          >
            💡 <span className="hidden sm:inline">Potřebuji poradit</span>
          </button>

          <div
            className={`font-black text-xl sm:text-2xl mb-8 uppercase tracking-widest mt-12 sm:mt-0 ${
              isBossFight ? "text-red-600 animate-pulse" : "text-gray-400"
            }`}
          >
            {isBossFight
              ? "Poraz ho rychlým napsáním tohoto textu:"
              : "Napiš přesně tento text:"}
          </div>

          <div
            className={`text-5xl sm:text-6xl md:text-7xl font-black mb-12 tracking-wide break-words leading-tight min-h-[90px] ${
              isBossFight && "drop-shadow-md"
            }`}
          >
            {renderWordLetters()}
          </div>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 max-w-5xl mx-auto">
            <input
              ref={inputRef}
              type="text"
              value={typedText}
              onChange={handleInput}
              className={`flex-grow text-center text-4xl sm:text-5xl font-bold p-6 sm:p-8 border-4 focus:border-indigo-500 rounded-3xl outline-none transition-colors shadow-inner
                ${
                  isBossFight
                    ? "bg-red-50 border-red-400 text-red-900 focus:border-red-600"
                    : "bg-gray-50 border-gray-300"
                }
                ${
                  appMode === "game" &&
                  typedText.length > 0 &&
                  typedText !== currentWord &&
                  !currentWord.startsWith(typedText)
                    ? "border-red-500 bg-red-100"
                    : ""
                }
              `}
              placeholder={startTime ? "Pokračuj..." : "Začni psát sem..."}
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />

            <button
              onClick={handleSkip}
              disabled={!canSkip || isBossFight}
              className={`flex-none px-8 py-6 rounded-3xl font-black text-2xl transition-all shadow-md flex items-center justify-center uppercase tracking-wide
                ${
                  canSkip && !isBossFight
                    ? "bg-orange-400 hover:bg-orange-500 text-white cursor-pointer active:scale-95"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
              title={
                isBossFight
                  ? "Bosse nelze přeskočit!"
                  : "Přeskočit na další (Započítá se chyba)"
              }
            >
              {isBossFight ? "🔒 ZAMČENO" : "⏭️ Přeskočit"}
            </button>
          </div>

          {showHint && hintData && (
            <div
              className={`mt-10 max-w-3xl mx-auto border-4 rounded-3xl p-8 text-left shadow-inner animate-fade-in ${
                isBossFight
                  ? "bg-red-50 border-red-300"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              {mismatchIndex < typedText.length && (
                <div className="text-red-600 font-black mb-4 text-center text-xl">
                  ⚠️ Máš tam překlep! Smaž chybu (Backspace) a zkus to znovu.
                </div>
              )}
              <div className="text-2xl text-gray-700 text-center mb-6">
                Pro napsání znaku{" "}
                <strong
                  className={`text-4xl bg-white px-4 py-2 rounded-xl border-4 mx-3 shadow-sm ${
                    isBossFight
                      ? "text-red-600 border-red-300"
                      : "text-blue-600 border-blue-300"
                  }`}
                >
                  {expectedChar === " " ? "MEZERA" : expectedChar}
                </strong>{" "}
                zmáčkni:
              </div>
              <div className="flex flex-col gap-6 items-center justify-center">
                {hintData.map((combo, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap items-center justify-center gap-3"
                  >
                    {idx > 0 && (
                      <span className="text-gray-400 font-black mx-4 text-xl">
                        NEBO
                      </span>
                    )}
                    {combo.map((key, keyIdx) => (
                      <React.Fragment key={keyIdx}>
                        {keyIdx > 0 && key !== "poté" && (
                          <span className="text-blue-400 font-black text-3xl">
                            +
                          </span>
                        )}
                        {key === "poté" ? (
                          <span className="text-gray-500 font-black mx-3 uppercase tracking-widest text-lg">
                            potom
                          </span>
                        ) : (
                          <kbd className="px-5 py-3 bg-white border-2 border-b-8 border-gray-300 rounded-2xl font-black text-gray-800 text-2xl shadow-sm transform transition-transform hover:-translate-y-1">
                            {key}
                          </kbd>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            className={`mt-10 h-10 font-bold text-lg ${
              isBossFight ? "text-red-700" : "text-gray-500"
            }`}
          >
            {isBossFight &&
              "POZOR: Pokud to nestihneš včas, Boss zaútočí a sebere ti 30 životů!"}
            {!isBossFight &&
              !startTime &&
              "Časomíra (rychlost) se spustí tvým prvním úhozem."}
            {!isBossFight &&
              startTime &&
              !canSkip &&
              "Slovo lze přeskočit pouze jednou za sebou. Nyní musíš text napsat správně."}
          </div>
        </div>
      </div>
    </div>
  );
}
