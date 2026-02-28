import cardAbrirClareiraArt from "../assets/cards/card-abrir-clareira.png";
import cardCanalRasoArt from "../assets/cards/card-canal-raso.png";
import cardCanteiroFofoArt from "../assets/cards/card-canteiro-fofo.png";
import cardJardimMacioArt from "../assets/cards/card-jardim-macio.png";
import cardLagoEspelhadoArt from "../assets/cards/card-lago-espelhado.png";
import cardLoteFertilArt from "../assets/cards/card-lote-fertil.png";
import cardTrilhaSelvagemArt from "../assets/cards/card-trilha-selvagem.png";
import cardLibraryCatalog from "../data/card-library.json";
import type { ExpansionTileType } from "./hexGrid";

export const DECK_SIZE = 24;
export const HAND_SIZE = 4;

export type CardDefinition = {
  artAssetPath: string | null;
  coinYield: number;
  description: string;
  energyCost: number;
  id: string;
  name: string;
  purchaseCost: number;
  tileType: ExpansionTileType;
};

type CardCatalogEntry = Omit<CardDefinition, "artAssetPath"> & {
  imageAssetName: string | null;
};

export type ExpansionCard = CardDefinition & {
  instanceId: string;
};

export type OwnedCardStack = {
  cardId: string;
  quantity: number;
};

export type PrototypeDeckState = {
  discardPile: ExpansionCard[];
  drawPile: ExpansionCard[];
  hand: ExpansionCard[];
};

const CARD_ART_ASSET_MAP: Record<string, string> = {
  "card-abrir-clareira.png": cardAbrirClareiraArt,
  "card-canal-raso.png": cardCanalRasoArt,
  "card-canteiro-fofo.png": cardCanteiroFofoArt,
  "card-jardim-macio.png": cardJardimMacioArt,
  "card-lago-espelhado.png": cardLagoEspelhadoArt,
  "card-lote-fertil.png": cardLoteFertilArt,
  "card-trilha-selvagem.png": cardTrilhaSelvagemArt,
};

const CARD_LIBRARY_SOURCE = cardLibraryCatalog as CardCatalogEntry[];

const CARD_LIBRARY: CardDefinition[] = CARD_LIBRARY_SOURCE.map((cardEntry) => {
  const { imageAssetName, ...cardData } = cardEntry;

  return {
    ...cardData,
    artAssetPath: imageAssetName ? CARD_ART_ASSET_MAP[imageAssetName] ?? null : null,
  };
});

const STARTER_COLLECTION: OwnedCardStack[] = [
  { cardId: "card-field-01", quantity: 6 },
  { cardId: "card-garden-01", quantity: 6 },
  { cardId: "card-pond-01", quantity: 4 },
  { cardId: "card-wild-01", quantity: 4 },
  { cardId: "card-field-02", quantity: 5 },
  { cardId: "card-garden-02", quantity: 5 },
];

const STARTER_DECK_SELECTION = [
  "card-field-01",
  "card-field-01",
  "card-field-01",
  "card-field-01",
  "card-field-01",
  "card-garden-01",
  "card-garden-01",
  "card-garden-01",
  "card-garden-01",
  "card-garden-01",
  "card-pond-01",
  "card-pond-01",
  "card-pond-01",
  "card-pond-01",
  "card-wild-01",
  "card-wild-01",
  "card-wild-01",
  "card-wild-01",
  "card-field-02",
  "card-field-02",
  "card-field-02",
  "card-garden-02",
  "card-garden-02",
  "card-garden-02",
];

function shuffleCards(cards: ExpansionCard[]) {
  const shuffledCards = [...cards];

  for (let currentIndex = shuffledCards.length - 1; currentIndex > 0; currentIndex -= 1) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    const currentCard = shuffledCards[currentIndex];

    shuffledCards[currentIndex] = shuffledCards[randomIndex];
    shuffledCards[randomIndex] = currentCard;
  }

  return shuffledCards;
}

function drawToHand(state: PrototypeDeckState, targetHandSize = HAND_SIZE): PrototypeDeckState {
  let nextState = {
    discardPile: [...state.discardPile],
    drawPile: [...state.drawPile],
    hand: [...state.hand],
  };

  while (nextState.hand.length < targetHandSize) {
    if (nextState.drawPile.length === 0 && nextState.discardPile.length > 0) {
      nextState = {
        discardPile: [],
        drawPile: shuffleCards(nextState.discardPile),
        hand: nextState.hand,
      };
    }

    if (nextState.drawPile.length === 0) {
      break;
    }

    const [nextCard, ...remainingDrawPile] = nextState.drawPile;

    nextState = {
      ...nextState,
      drawPile: remainingDrawPile,
      hand: [...nextState.hand, nextCard],
    };
  }

  return nextState;
}

function countCardIds(cardIds: string[]) {
  return cardIds.reduce<Record<string, number>>((counts, cardId) => {
    return {
      ...counts,
      [cardId]: (counts[cardId] ?? 0) + 1,
    };
  }, {});
}

export function getCardDefinition(cardId: string) {
  return CARD_LIBRARY.find((card) => card.id === cardId) ?? null;
}

export function getCardLibrary() {
  return [...CARD_LIBRARY];
}

export function formatCoinYield(coinYield: number) {
  return `${coinYield >= 0 ? "+" : ""}${coinYield}`;
}

export function getCoinYieldLabel(coinYield: number) {
  return `${formatCoinYield(coinYield)}/dia`;
}

function createCardInstance(cardDefinition: CardDefinition, index: number): ExpansionCard {
  return {
    ...cardDefinition,
    instanceId: `${cardDefinition.id}::${index}`,
  };
}

export function createStarterOwnedCollection() {
  return STARTER_COLLECTION.map((cardStack) => ({ ...cardStack }));
}

export function createStarterDeckSelection() {
  return [...STARTER_DECK_SELECTION];
}

export function getOwnedQuantity(ownedCards: OwnedCardStack[], cardId: string) {
  return ownedCards.find((cardStack) => cardStack.cardId === cardId)?.quantity ?? 0;
}

export function getSelectedQuantity(deckCardIds: string[], cardId: string) {
  return deckCardIds.filter((selectedCardId) => selectedCardId === cardId).length;
}

export function addCardToDeckSelection(
  deckCardIds: string[],
  ownedCards: OwnedCardStack[],
  cardId: string,
) {
  if (deckCardIds.length >= DECK_SIZE) {
    return deckCardIds;
  }

  const ownedQuantity = getOwnedQuantity(ownedCards, cardId);
  const selectedQuantity = getSelectedQuantity(deckCardIds, cardId);

  if (ownedQuantity === 0 || selectedQuantity >= ownedQuantity) {
    return deckCardIds;
  }

  return [...deckCardIds, cardId];
}

export function removeCardFromDeckSelection(deckCardIds: string[], cardId: string) {
  const removalIndex = deckCardIds.lastIndexOf(cardId);

  if (removalIndex === -1) {
    return deckCardIds;
  }

  return deckCardIds.filter((_, index) => index !== removalIndex);
}

export function sanitizeDeckSelection(deckCardIds: string[], ownedCards: OwnedCardStack[]) {
  const ownedCounts = countCardIds(
    ownedCards.flatMap((cardStack) => Array.from({ length: cardStack.quantity }, () => cardStack.cardId)),
  );
  const selectedCounts: Record<string, number> = {};
  const sanitizedDeck = deckCardIds.filter((cardId) => {
    const nextSelectedQuantity = (selectedCounts[cardId] ?? 0) + 1;
    const canKeepCard = nextSelectedQuantity <= (ownedCounts[cardId] ?? 0);

    if (canKeepCard) {
      selectedCounts[cardId] = nextSelectedQuantity;
    }

    return canKeepCard;
  });

  if (sanitizedDeck.length >= DECK_SIZE) {
    return sanitizedDeck.slice(0, DECK_SIZE);
  }

  let nextDeck = [...sanitizedDeck];

  for (const cardStack of ownedCards) {
    while (getSelectedQuantity(nextDeck, cardStack.cardId) < cardStack.quantity && nextDeck.length < DECK_SIZE) {
      nextDeck = [...nextDeck, cardStack.cardId];
    }

    if (nextDeck.length >= DECK_SIZE) {
      break;
    }
  }

  return nextDeck;
}

export function createDeckStateFromSelection(deckCardIds: string[]) {
  const cards = deckCardIds
    .map((cardId) => getCardDefinition(cardId))
    .filter((card): card is CardDefinition => card !== null)
    .map((cardDefinition, index) => createCardInstance(cardDefinition, index));

  return drawToHand({
    discardPile: [],
    drawPile: shuffleCards(cards),
    hand: [],
  });
}

export function playExpansionCard(deckState: PrototypeDeckState, instanceId: string) {
  const playedCard = deckState.hand.find((card) => card.instanceId === instanceId);

  if (!playedCard) {
    return {
      nextState: deckState,
      playedCard: null,
    };
  }

  const remainingHand = deckState.hand.filter((card) => card.instanceId !== instanceId);
  const afterDiscard: PrototypeDeckState = {
    discardPile: [...deckState.discardPile, playedCard],
    drawPile: [...deckState.drawPile],
    hand: remainingHand,
  };

  return {
    nextState: drawToHand(afterDiscard),
    playedCard,
  };
}

export function discardHandAndRefill(deckState: PrototypeDeckState) {
  const afterDiscard: PrototypeDeckState = {
    discardPile: [...deckState.discardPile, ...deckState.hand],
    drawPile: [...deckState.drawPile],
    hand: [],
  };

  return drawToHand(afterDiscard);
}

export function getShopOffers(completedRuns: number) {
  return Array.from({ length: 3 }, (_, index) => {
    const libraryIndex = (completedRuns * 2 + index) % CARD_LIBRARY.length;

    return CARD_LIBRARY[libraryIndex];
  });
}
