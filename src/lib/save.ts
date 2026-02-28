import type { PrototypeTileType } from "./hexGrid";
import {
  createStarterDeckSelection,
  createStarterOwnedCollection,
  DECK_SIZE,
  getCardDefinition,
  getOwnedQuantity,
  sanitizeDeckSelection,
  type OwnedCardStack,
} from "./prototypeDeck";

const SAVE_KEY = "hexafarm.save";
const LEGACY_SAVE_KEY = "hexafarm.save.stub";
const CURRENT_SAVE_VERSION = 3;

export const PROTOTYPE_BASE_ENERGY = 3;
export const PROTOTYPE_RUN_LENGTH_DAYS = 7;
export const PROTOTYPE_INITIAL_RENT = 16;
export const PROTOTYPE_RENT_INCREMENT = 4;

type LegacySaveSnapshot = {
  createdAt: string;
  lastOpenedAt: string;
  profileName: string;
  version: number;
};

type VersionTwoSaveRunState = {
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

type VersionTwoSaveSnapshot = {
  activeRun: VersionTwoSaveRunState;
  createdAt: string;
  lastActionLabel: string;
  lastOpenedAt: string;
  profileName: string;
  sessionCount: number;
  version: number;
};

export type RunPhase = "deckbuilding" | "running" | "shop";

export type SaveMetaState = {
  collectionCoins: number;
  completedRuns: number;
  nextRentCost: number;
  ownedCards: OwnedCardStack[];
};

export type SaveRunState = {
  biomeName: string;
  day: number;
  deckCardIds: string[];
  lastRentPaid: boolean | null;
  phase: RunPhase;
  rentDue: number;
  runLengthDays: number;
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
  meta: SaveMetaState;
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

function isVersionTwoSaveRunState(candidateValue: unknown): candidateValue is VersionTwoSaveRunState {
  if (!candidateValue || typeof candidateValue !== "object") {
    return false;
  }

  const typedCandidate = candidateValue as Partial<VersionTwoSaveRunState>;
  const typedResources =
    typedCandidate.resources as Partial<VersionTwoSaveRunState["resources"]> | undefined;

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

function isVersionTwoSaveSnapshot(candidateValue: unknown): candidateValue is VersionTwoSaveSnapshot {
  if (!candidateValue || typeof candidateValue !== "object") {
    return false;
  }

  const typedCandidate = candidateValue as Partial<VersionTwoSaveSnapshot>;

  return (
    typedCandidate.version === 2 &&
    typeof typedCandidate.createdAt === "string" &&
    typeof typedCandidate.lastActionLabel === "string" &&
    typeof typedCandidate.lastOpenedAt === "string" &&
    typeof typedCandidate.profileName === "string" &&
    typeof typedCandidate.sessionCount === "number" &&
    isVersionTwoSaveRunState(typedCandidate.activeRun)
  );
}

function isOwnedCardStack(candidateValue: unknown): candidateValue is OwnedCardStack {
  if (!candidateValue || typeof candidateValue !== "object") {
    return false;
  }

  const typedCandidate = candidateValue as Partial<OwnedCardStack>;

  return typeof typedCandidate.cardId === "string" && typeof typedCandidate.quantity === "number";
}

function isSaveMetaState(candidateValue: unknown): candidateValue is SaveMetaState {
  if (!candidateValue || typeof candidateValue !== "object") {
    return false;
  }

  const typedCandidate = candidateValue as Partial<SaveMetaState>;

  return (
    typeof typedCandidate.collectionCoins === "number" &&
    typeof typedCandidate.completedRuns === "number" &&
    typeof typedCandidate.nextRentCost === "number" &&
    Array.isArray(typedCandidate.ownedCards) &&
    typedCandidate.ownedCards.every((cardStack) => isOwnedCardStack(cardStack))
  );
}

function isRunPhase(candidateValue: unknown): candidateValue is RunPhase {
  return candidateValue === "deckbuilding" || candidateValue === "running" || candidateValue === "shop";
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
    Array.isArray(typedCandidate.deckCardIds) &&
    typedCandidate.deckCardIds.every((cardId) => typeof cardId === "string") &&
    (typedCandidate.lastRentPaid === null || typeof typedCandidate.lastRentPaid === "boolean") &&
    isRunPhase(typedCandidate.phase) &&
    typeof typedCandidate.rentDue === "number" &&
    typeof typedCandidate.runLengthDays === "number" &&
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
    isSaveMetaState(typedCandidate.meta) &&
    isSaveRunState(typedCandidate.activeRun)
  );
}

function createDefaultMetaState(): SaveMetaState {
  return {
    collectionCoins: 0,
    completedRuns: 0,
    nextRentCost: PROTOTYPE_INITIAL_RENT,
    ownedCards: createStarterOwnedCollection(),
  };
}

function createDefaultRunState(
  rentDue: number,
  phase: RunPhase,
  deckCardIds = createStarterDeckSelection(),
): SaveRunState {
  return {
    biomeName: "Clareira do Inicio",
    day: 1,
    deckCardIds: [...deckCardIds],
    lastRentPaid: null,
    phase,
    rentDue,
    runLengthDays: PROTOTYPE_RUN_LENGTH_DAYS,
    seasonLabel: "Primavera",
    tilesPlaced: 1,
    waifuAffinity: 0,
    resources: {
      coins: 12,
      energy: PROTOTYPE_BASE_ENERGY,
      seeds: 4,
    },
  };
}

function createSaveSnapshotFromLegacySnapshot(legacySnapshot: LegacySaveSnapshot): SaveSnapshot {
  const defaultMeta = createDefaultMetaState();

  return {
    activeRun: createDefaultRunState(defaultMeta.nextRentCost, "deckbuilding"),
    createdAt: legacySnapshot.createdAt,
    lastActionLabel: "Migrado do save stub",
    lastOpenedAt: legacySnapshot.lastOpenedAt,
    meta: defaultMeta,
    profileName: legacySnapshot.profileName,
    sessionCount: 1,
    version: CURRENT_SAVE_VERSION,
  };
}

function createSaveSnapshotFromVersionTwoSnapshot(versionTwoSnapshot: VersionTwoSaveSnapshot): SaveSnapshot {
  const defaultMeta = createDefaultMetaState();

  return {
    activeRun: {
      ...createDefaultRunState(defaultMeta.nextRentCost, "running"),
      biomeName: versionTwoSnapshot.activeRun.biomeName,
      day: versionTwoSnapshot.activeRun.day,
      resources: {
        ...versionTwoSnapshot.activeRun.resources,
      },
      seasonLabel: versionTwoSnapshot.activeRun.seasonLabel,
      tilesPlaced: versionTwoSnapshot.activeRun.tilesPlaced,
      waifuAffinity: versionTwoSnapshot.activeRun.waifuAffinity,
    },
    createdAt: versionTwoSnapshot.createdAt,
    lastActionLabel: versionTwoSnapshot.lastActionLabel,
    lastOpenedAt: versionTwoSnapshot.lastOpenedAt,
    meta: defaultMeta,
    profileName: versionTwoSnapshot.profileName,
    sessionCount: versionTwoSnapshot.sessionCount,
    version: CURRENT_SAVE_VERSION,
  };
}

function parseStoredSnapshot(rawValue: string): SaveSnapshot | null {
  try {
    const parsedValue = JSON.parse(rawValue) as unknown;

    if (isSaveSnapshot(parsedValue)) {
      return parsedValue;
    }

    if (isVersionTwoSaveSnapshot(parsedValue)) {
      return createSaveSnapshotFromVersionTwoSnapshot(parsedValue);
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

function updateOwnedCards(ownedCards: OwnedCardStack[], cardId: string) {
  if (getOwnedQuantity(ownedCards, cardId) === 0) {
    return [...ownedCards, { cardId, quantity: 1 }];
  }

  return ownedCards.map((cardStack) =>
    cardStack.cardId === cardId
      ? { ...cardStack, quantity: cardStack.quantity + 1 }
      : { ...cardStack },
  );
}

export function getSavedRun() {
  return readSaveSnapshot();
}

export function hasSavedRun() {
  return readSaveSnapshot() !== null;
}

export function createNewSave(profileName = "Cozy Farmer") {
  const now = new Date().toISOString();
  const defaultMeta = createDefaultMetaState();
  const freshSave: SaveSnapshot = {
    activeRun: createDefaultRunState(defaultMeta.nextRentCost, "deckbuilding"),
    createdAt: now,
    lastActionLabel: "Nova jornada criada. Monte 24 cartas para iniciar a run.",
    lastOpenedAt: now,
    meta: defaultMeta,
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

export function startConfiguredRun(deckCardIds: string[]) {
  const currentSave = readSaveSnapshot();

  if (!currentSave) {
    return createNewSave();
  }

  const sanitizedDeck = sanitizeDeckSelection(deckCardIds, currentSave.meta.ownedCards);

  if (sanitizedDeck.length !== DECK_SIZE) {
    return currentSave;
  }

  const updatedSave: SaveSnapshot = {
    ...currentSave,
    activeRun: {
      ...createDefaultRunState(currentSave.meta.nextRentCost, "running", sanitizedDeck),
    },
    lastActionLabel: "Nova run iniciada com baralho configurado",
    lastOpenedAt: new Date().toISOString(),
  };

  writeSaveSnapshot(updatedSave);

  return updatedSave;
}

export function prepareNextRun(deckCardIds: string[]) {
  const currentSave = readSaveSnapshot();

  if (!currentSave) {
    return createNewSave();
  }

  const sanitizedDeck = sanitizeDeckSelection(deckCardIds, currentSave.meta.ownedCards);
  const updatedSave: SaveSnapshot = {
    ...currentSave,
    activeRun: {
      ...createDefaultRunState(currentSave.meta.nextRentCost, "deckbuilding", sanitizedDeck),
    },
    lastActionLabel: "Monte 24 cartas para a proxima run",
    lastOpenedAt: new Date().toISOString(),
  };

  writeSaveSnapshot(updatedSave);

  return updatedSave;
}

export function registerPrototypeExpansion(
  tileType: Exclude<PrototypeTileType, "home">,
  energySpent = 1,
) {
  const currentSave = readSaveSnapshot();

  if (!currentSave) {
    return createNewSave();
  }

  if (currentSave.activeRun.phase !== "running") {
    return currentSave;
  }

  const rewards = getExpansionRewards(tileType);
  const updatedSave: SaveSnapshot = {
    ...currentSave,
    activeRun: {
      ...currentSave.activeRun,
      resources: {
        coins: currentSave.activeRun.resources.coins + rewards.coins,
        energy:
          Math.max(0, currentSave.activeRun.resources.energy - energySpent) + rewards.energy,
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

export function advancePrototypeDay() {
  const currentSave = readSaveSnapshot();

  if (!currentSave) {
    return createNewSave();
  }

  if (currentSave.activeRun.phase !== "running") {
    return currentSave;
  }

  if (currentSave.activeRun.day >= currentSave.activeRun.runLengthDays) {
    const canPayRent = currentSave.activeRun.resources.coins >= currentSave.activeRun.rentDue;
    const shopCoinsEarned = canPayRent
      ? currentSave.activeRun.resources.coins - currentSave.activeRun.rentDue
      : 0;
    const updatedSave: SaveSnapshot = {
      ...currentSave,
      activeRun: {
        ...currentSave.activeRun,
        lastRentPaid: canPayRent,
        phase: "shop",
        resources: {
          ...currentSave.activeRun.resources,
          energy: 0,
        },
      },
      lastActionLabel: canPayRent
        ? `Run encerrada. Aluguel pago e ${shopCoinsEarned} moedas foram para a loja`
        : "Run encerrada. O aluguel nao foi pago e nao houve sobra para a loja",
      lastOpenedAt: new Date().toISOString(),
      meta: {
        ...currentSave.meta,
        collectionCoins: currentSave.meta.collectionCoins + shopCoinsEarned,
        completedRuns: currentSave.meta.completedRuns + 1,
        nextRentCost: currentSave.meta.nextRentCost + PROTOTYPE_RENT_INCREMENT,
      },
    };

    writeSaveSnapshot(updatedSave);

    return updatedSave;
  }

  const nextDay = currentSave.activeRun.day + 1;
  const updatedSave: SaveSnapshot = {
    ...currentSave,
    activeRun: {
      ...currentSave.activeRun,
      day: nextDay,
      resources: {
        ...currentSave.activeRun.resources,
        energy: PROTOTYPE_BASE_ENERGY,
      },
    },
    lastActionLabel: `Dia ${nextDay} iniciado`,
    lastOpenedAt: new Date().toISOString(),
  };

  writeSaveSnapshot(updatedSave);

  return updatedSave;
}

export function purchaseOwnedCard(cardId: string) {
  const currentSave = readSaveSnapshot();

  if (!currentSave) {
    return createNewSave();
  }

  const cardDefinition = getCardDefinition(cardId);

  if (!cardDefinition || currentSave.meta.collectionCoins < cardDefinition.purchaseCost) {
    return currentSave;
  }

  const updatedSave: SaveSnapshot = {
    ...currentSave,
    lastActionLabel: `${cardDefinition.name} comprado na loja`,
    lastOpenedAt: new Date().toISOString(),
    meta: {
      ...currentSave.meta,
      collectionCoins: currentSave.meta.collectionCoins - cardDefinition.purchaseCost,
      ownedCards: updateOwnedCards(currentSave.meta.ownedCards, cardId),
    },
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
