const SAVE_KEY = "hexafarm.save.stub";

export type SaveSnapshot = {
  createdAt: string;
  lastOpenedAt: string;
  profileName: string;
  version: number;
};

function isValidSaveSnapshot(candidateValue: unknown): candidateValue is SaveSnapshot {
  if (!candidateValue || typeof candidateValue !== "object") {
    return false;
  }

  const typedCandidate = candidateValue as Partial<SaveSnapshot>;

  return (
    typeof typedCandidate.createdAt === "string" &&
    typeof typedCandidate.lastOpenedAt === "string" &&
    typeof typedCandidate.profileName === "string" &&
    typeof typedCandidate.version === "number"
  );
}

function readSaveSnapshot(): SaveSnapshot | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = window.localStorage.getItem(SAVE_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(storedValue) as unknown;

    return isValidSaveSnapshot(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
}

function writeSaveSnapshot(snapshot: SaveSnapshot) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SAVE_KEY, JSON.stringify(snapshot));
}

export function hasSavedRun() {
  return readSaveSnapshot() !== null;
}

export function createNewSave() {
  const now = new Date().toISOString();
  const freshSave: SaveSnapshot = {
    createdAt: now,
    lastOpenedAt: now,
    profileName: "Cozy Farmer",
    version: 1,
  };

  writeSaveSnapshot(freshSave);

  return freshSave;
}

export function touchSave() {
  const currentSave = readSaveSnapshot();

  if (!currentSave) {
    return createNewSave();
  }

  const updatedSave: SaveSnapshot = {
    ...currentSave,
    lastOpenedAt: new Date().toISOString(),
  };

  writeSaveSnapshot(updatedSave);

  return updatedSave;
}

