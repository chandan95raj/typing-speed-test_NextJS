import { PASSAGES } from "@/data/passages";

export const DURATIONS = [1, 3, 5, 10];
export const DIFFICULTIES = ["easy", "medium", "hard"];
const CHARS_PER_MINUTE = 550;

function shuffle(list, rand = Math.random) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function compose(pool, minChars, rand) {
  const parts = [];
  let length = 0;
  let queue = [];
  while (length < minChars) {
    if (queue.length === 0) queue = shuffle(pool, rand);
    const p = queue.pop();
    parts.push(p);
    length += p.length + 1;
  }
  return parts.join(" ");
}

export function buildText(difficulty, minutes) {
  return compose(PASSAGES[difficulty], minutes * CHARS_PER_MINUTE, Math.random);
}

export function todayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return todayKey(d);
}

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Same date = same passage for everyone
export function getDailyChallenge(key = todayKey()) {
  const rand = mulberry32(hashString(key));
  const difficulty = DIFFICULTIES[Math.floor(rand() * DIFFICULTIES.length)];
  return { key, difficulty, text: compose(PASSAGES[difficulty], 600, rand) };
}

export function calcStats({ typed, text, totalKeys, wrongKeys, seconds }) {
  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === text[i]) correct++;
  }
  const incorrect = typed.length - correct;
  const minutes = Math.max(seconds, 1) / 60;
  const gross = typed.length / 5 / minutes;
  const net = correct / 5 / minutes;
  const accuracy =
    totalKeys > 0 ? ((totalKeys - wrongKeys) / totalKeys) * 100 : 100;

  return {
    grossWpm: Math.round(gross),
    netWpm: Math.round(net),
    accuracy: Math.round(accuracy * 10) / 10,
    correct,
    incorrect,
    typedChars: typed.length,
    totalKeys,
    seconds: Math.round(seconds),
  };
}