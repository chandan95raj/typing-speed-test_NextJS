import { todayKey, yesterdayKey } from "./typing";

const KEYS = {
  results: "tst:results",
  best: "tst:best",
  streak: "tst:streak",
  daily: "tst:daily",
  achievements: "tst:achievements",
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export const ACHIEVEMENTS = [
  { id: "first-test", title: "First Steps", description: "Complete your first typing test.", check: (c) => c.results.length >= 1 },
  { id: "ten-tests", title: "Getting Serious", description: "Complete 10 typing tests.", check: (c) => c.results.length >= 10 },
  { id: "wpm-30", title: "Warming Up", description: "Reach 30 net WPM.", check: (c) => c.result.netWpm >= 30 },
  { id: "wpm-50", title: "Steady Hands", description: "Reach 50 net WPM.", check: (c) => c.result.netWpm >= 50 },
  { id: "wpm-70", title: "Fast Fingers", description: "Reach 70 net WPM.", check: (c) => c.result.netWpm >= 70 },
  { id: "wpm-100", title: "Speed Demon", description: "Reach 100 net WPM.", check: (c) => c.result.netWpm >= 100 },
  { id: "accuracy-98", title: "Sharp Shooter", description: "Finish a test with 98% accuracy or more (20+ net WPM).", check: (c) => c.result.accuracy >= 98 && c.result.netWpm >= 20 },
  { id: "perfect", title: "Flawless", description: "Finish a test with 100% accuracy (100+ characters).", check: (c) => c.result.accuracy === 100 && c.result.typedChars >= 100 },
  { id: "marathon", title: "Marathon Typist", description: "Complete a 10 minute test.", check: (c) => c.result.minutes === 10 },
  { id: "daily-done", title: "Daily Champion", description: "Complete a daily challenge.", check: (c) => c.result.mode === "daily" },
  { id: "streak-3", title: "On a Roll", description: "Reach a 3-day streak.", check: (c) => c.streak.current >= 3 },
  { id: "streak-7", title: "Week Warrior", description: "Reach a 7-day streak.", check: (c) => c.streak.current >= 7 },
];

export function saveResult(result) {
  const today = todayKey();
  const full = {
    id: Date.now().toString(36),
    date: new Date().toISOString(),
    ...result,
  };

  const results = [...read(KEYS.results, []), full].slice(-200);
  write(KEYS.results, results);

  // Personal best
  const prevBest = read(KEYS.best, null);
  const isBest = full.netWpm > 0 && (!prevBest || full.netWpm > prevBest.netWpm);
  if (isBest) {
    write(KEYS.best, {
      netWpm: full.netWpm,
      accuracy: full.accuracy,
      date: full.date,
      label: full.label,
    });
  }

  // Daily streak
  const streak = read(KEYS.streak, { current: 0, longest: 0, lastDate: null });
  if (streak.lastDate !== today) {
    streak.current = streak.lastDate === yesterdayKey() ? streak.current + 1 : 1;
    streak.longest = Math.max(streak.longest, streak.current);
    streak.lastDate = today;
    write(KEYS.streak, streak);
  }

  // Daily challenge
  if (full.mode === "daily") {
    const done = read(KEYS.daily, []);
    if (!done.includes(today)) write(KEYS.daily, [...done, today].slice(-365));
  }

  // Achievements
  const unlocked = read(KEYS.achievements, {});
  const ctx = { result: full, results, streak };
  const newAchievements = ACHIEVEMENTS.filter(
    (a) => !unlocked[a.id] && a.check(ctx)
  );
  if (newAchievements.length) {
    newAchievements.forEach((a) => (unlocked[a.id] = full.date));
    write(KEYS.achievements, unlocked);
  }

  window.dispatchEvent(new Event("tst:updated"));
  return { isBest, streak: streak.current, newAchievements };
}

export const getResults = () => read(KEYS.results, []);
export const getBest = () => read(KEYS.best, null);
export const getUnlocked = () => read(KEYS.achievements, {});
export const getDailyDone = () => read(KEYS.daily, []);

export function getStreak() {
  const s = read(KEYS.streak, { current: 0, longest: 0, lastDate: null });
  const alive = s.lastDate === todayKey() || s.lastDate === yesterdayKey();
  return { current: alive ? s.current : 0, longest: s.longest };
}

export function clearAllData() {
  try {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  } catch {}
  window.dispatchEvent(new Event("tst:updated"));
}