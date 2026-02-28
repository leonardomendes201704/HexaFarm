import type { PrototypeTileType } from "./hexGrid";

const SAVE_KEY = "hexafarm.save";
const LEGACY_SAVE_KEY = "hexafarm.save.stub";
const CURRENT_SAVE_VERSION = 2;

type LegacySaveSnapshot = {
  createdAt: string;
  lastOpenedAt: string;
  profileName: string;
  version: number;
};

export type SaveRunState = {
  biomeName: string;
  day: number;
  seasonLabel: string;
  tilesPlaced: number;
  waifuAffinity: number;
  resources: {
    coins: number;
    energy: number;
    seeds: number;
  };
};

export type SaveSnapshot = {
  activeRun: SaveRunState;
  createdAt: string;
  lastActionLabel: string;
  lastOpenedAt: string;
  profileName: string;
  sessionCount: number;
  version: number;
};

function isLegacySaveSnapshot(candidateValue: unknown): candidateValue is LegacySaveSnapshot {
  if (!candidateValue || typeof candidateValue !== "object") {
    return false;
  }

  const typedCandidate = candidateValue as Partial<LegacySaveSnapshot>;

  return (
    typeof typedCandidate.createdAt === "string" &&
    typeof typedCandidate.lastOpenedAt === "string" &&
    typeof typedCandidate.profileName === "string" &&
    typeof typedCandidate.version === "number"
  );
}

function isSaveRunState(candidateValue: unknown): candidateValue is SaveRunState {
  if (!candidateValue || typeof candidateValue !== "object") {
    return false;
  }

  const typedCandidate = candidateValue as Partial<SaveRunState>;
  const typedResources = typedCandidate.resources as Partial<SaveRunState["resources"]> | undefined;

  return (
    typeof typedCandidate.biomeName === "string" &&
    typeof typedCandidate.day === "number" &&
    typeof typedCandidate.seasonLabel === "string" &&
    typeof typedCandidate.tilesPlaced === "number" &&
    typeof typedCandidate.waifuAffinity === "number" &&
    !!typedResources &&
    typeof typedResources.coins === "number" &&
    typeof typedResources.energy === "number" &&
    typeof typedResources.seeds === "number"
  );
}

function isSaveSnapshot(candidateValue: unknown): candidateValue is SaveSnapshot {
  if (!candidateValue || typeof candidateValue !== "object") {
    return false;
  }

  const typedCandidate = candidateValue as Partial<SaveSnapshot>;

  return (
    typedCandidate.version === CURRENT_SAVE_VERSION &&
    typeof typedCandidate.createdAt === "string" &&
    typeof typedCandidate.lastActionLabel === "string" &&
    typeof typedCandidate.lastOpenedAt === "string" &&
    typeof typedCandidate.profileName === "string" &&
    typeof typedCandidate.sessionCount === "number" &&
    isSaveRunState(typedCandidate.activeRun)
  );
}

function createDefaultRunState(): SaveRunState {
  return {
    biomeName: "Clareira do Inicio",
    day: 1,
    seasonLabel: "Primavera",
    tilesPlaced: 1,
    waifuAffinity: 0,
    resources: {
      coins: 12,
      energy: 3,
      seeds: 4,
    },
  };
}

function createSaveSnapshotFromLegacySnapshot(legacySnapshot: LegacySaveSnapshot): SaveSnapshot {
  return {
    activeRun: createDefaultRunState(),
    createdAt: legacySnapshot.createdAt,
    lastActionLabel: "Migrado do save stub",
    lastOpenedAt: legacySnapshot.lastOpenedAt,
    profileName: legacySnapshot.profileName,
    sessionCount: 1,
    version: CURRENT_SAVE_VERSION,
  };
}

function parseStoredSnapshot(rawValue: string): SaveSnapshot | null {
  try {
    const parsedValue = JSON.parse(rawValue) as unknown;

    if (isSaveSnapshot(parsedValue)) {
      return parsedValue;
    }

    if (isLegacySaveSnapshot(parsedValue)) {
      return createSaveSnapshotFromLegacySnapshot(parsedValue);
    }

    return null;
  } catch {
    return null;
  }
}

function writeSaveSnapshot(snapshot: SaveSnapshot) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SAVE_KEY, JSON.stringify(snapshot));
  window.localStorage.removeItem(LEGACY_SAVE_KEY);
}

function readSaveSnapshot(): SaveSnapshot | null {
  if (typeof window === "undefined") {
    return null;
  }

  const currentValue = window.localStorage.getItem(SAVE_KEY);

  if (currentValue) {
    const parsedCurrentSnapshot = parseStoredSnapshot(currentValue);

    if (parsedCurrentSnapshot) {
      writeSaveSnapshot(parsedCurrentSnapshot);
      return parsedCurrentSnapshot;
    }
  }

  const legacyValue = window.localStorage.getItem(LEGACY_SAVE_KEY);

  if (!legacyValue) {
    return null;
  }

  const migratedSnapshot = parseStoredSnapshot(legacyValue);

  if (!migratedSnapshot) {
    return null;
  }

  writeSaveSnapshot(migratedSnapshot);

  return migratedSnapshot;
}

export function getSavedRun() {
  return readSaveSnapshot();
}

export function hasSavedRun() {
  return readSaveSnapshot() !== null;
}

export function createNewSave(profileName = "Cozy Farmer") {
  const now = new Date().toISOString();
  const freshSave: SaveSnapshot = {
    activeRun: createDefaultRunState(),
    createdAt: now,
    lastActionLabel: "Nova jornada criada",
    lastOpenedAt: now,
    profileName,
    sessionCount: 1,
    version: CURRENT_SAVE_VERSION,
  };

  writeSaveSnapshot(freshSave);

  return freshSave;
}

export function continueSavedRun() {
  const currentSave = readSaveSnapshot();

  if (!currentSave) {
    return createNewSave();
  }

  const updatedSave: SaveSnapshot = {
    ...currentSave,
    lastActionLabel: "Run retomada pela tela de continuar",
    lastOpenedAt: new Date().toISOString(),
    sessionCount: currentSave.sessionCount + 1,
  };

  writeSaveSnapshot(updatedSave);

  return updatedSave;
}

function getExpansionRewards(tileType: Exclude<PrototypeTileType, "home">) {
  switch (tileType) {
    case "field":
      return { coins: 2, energy: 0, seeds: 1, waifuAffinity: 0 };
    case "garden":
      return { coins: 3, energy: 0, seeds: 0, waifuAffinity: 1 };
    case "pond":
      return { coins: 1, energy: 1, seeds: 0, waifuAffinity: 0 };
    case "wild":
      return { coins: 1, energy: 0, seeds: 1, waifuAffinity: 1 };
    default:
      return { coins: 0, energy: 0, seeds: 0, waifuAffinity: 0 };
  }
}

export function registerPrototypeExpansion(tileType: Exclude<PrototypeTileType, "home">) {
  const currentSave = readSaveSnapshot();

  if (!currentSave) {
    return createNewSave();
  }

  const rewards = getExpansionRewards(tileType);
  const updatedSave: SaveSnapshot = {
    ...currentSave,
    activeRun: {
      ...currentSave.activeRun,
      resources: {
        coins: currentSave.activeRun.resources.coins + rewards.coins,
        energy: currentSave.activeRun.resources.energy + rewards.energy,
        seeds: currentSave.activeRun.resources.seeds + rewards.seeds,
      },
      tilesPlaced: currentSave.activeRun.tilesPlaced + 1,
      waifuAffinity: currentSave.activeRun.waifuAffinity + rewards.waifuAffinity,
    },
    lastActionLabel: `Tile ${tileType} adicionado ao prototipo`,
    lastOpenedAt: new Date().toISOString(),
  };

  writeSaveSnapshot(updatedSave);

  return updatedSave;
}

export function clearSavedRun() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SAVE_KEY);
  window.localStorage.removeItem(LEGACY_SAVE_KEY);
}
