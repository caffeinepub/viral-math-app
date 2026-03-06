// LocalStorage leaderboard helpers

export interface LeaderboardEntry {
  name: string;
  score: number;
  total: number;
  gameType: string;
  date: string;
}

const STORAGE_KEY_PREFIX = "viral_math_leaderboard_";
const MAX_ENTRIES = 10;

function getStorageKey(gameType: string): string {
  return `${STORAGE_KEY_PREFIX}${gameType}`;
}

export function getLeaderboard(gameType: string): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(getStorageKey(gameType));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LeaderboardEntry[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (e) => e && typeof e.score === "number" && typeof e.name === "string",
      )
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_ENTRIES);
  } catch {
    return [];
  }
}

export function saveScore(entry: LeaderboardEntry): boolean {
  try {
    const current = getLeaderboard(entry.gameType);

    // Check if qualifies for top 10
    const qualifies =
      current.length < MAX_ENTRIES ||
      entry.score > (current[current.length - 1]?.score ?? 0);
    if (!qualifies) return false;

    const updated = [...current, entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_ENTRIES);

    localStorage.setItem(
      getStorageKey(entry.gameType),
      JSON.stringify(updated),
    );

    // Check if it's actually a new high score (rank 1)
    return updated[0]?.score === entry.score && updated[0]?.date === entry.date;
  } catch {
    return false;
  }
}

export function isHighScore(score: number, gameType: string): boolean {
  try {
    const current = getLeaderboard(gameType);
    if (current.length < MAX_ENTRIES) return true;
    return score > (current[current.length - 1]?.score ?? 0);
  } catch {
    return false;
  }
}
