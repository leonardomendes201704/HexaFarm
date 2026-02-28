import type { ExpansionTileType } from "./hexGrid";

export const DECK_SIZE = 24;
export const HAND_SIZE = 4;

export type CardDefinition = {
  coinYield: number;
  description: string;
  energyCost: number;
  id: string;
  name: string;
  purchaseCost: number;
  tileType: ExpansionTileType;
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

const CARD_LIBRARY: CardDefinition[] = [
  {
    coinYield: 2,
    description:
      "Abre um campo simples e confiavel. Excelente para comecar a run com renda estavel sem gastar muita energia.",
    energyCost: 1,
    id: "card-field-01",
    name: "Abrir Clareira",
    purchaseCost: 5,
    tileType: "field",
  },
  {
    coinYield: 1,
    description:
      "Cria um jardim acolhedor e barato. Serve para expandir com seguranca e manter lucro positivo desde cedo.",
    energyCost: 1,
    id: "card-garden-01",
    name: "Jardim Macio",
    purchaseCost: 5,
    tileType: "garden",
  },
  {
    coinYield: -1,
    description:
      "Abre um lago raso na borda. Ele custa manutencao diaria, mas prepara espaco para uma malha de agua e futuras sinergias.",
    energyCost: 2,
    id: "card-pond-01",
    name: "Canal Raso",
    purchaseCost: 7,
    tileType: "pond",
  },
  {
    coinYield: 1,
    description:
      "Expande a fronteira com um bosque leve. Boa carta de preenchimento para crescer o mapa sem travar sua energia.",
    energyCost: 1,
    id: "card-wild-01",
    name: "Trilha Selvagem",
    purchaseCost: 6,
    tileType: "wild",
  },
  {
    coinYield: 3,
    description:
      "Abre um lote de campo mais rentavel. Custa mais energia, mas acelera a corrida por moedas e ajuda no aluguel.",
    energyCost: 2,
    id: "card-field-02",
    name: "Lote Fertil",
    purchaseCost: 8,
    tileType: "field",
  },
  {
    coinYield: 2,
    description:
      "Transforma a borda em um canteiro mais lucrativo. Uma melhora natural para runs que querem valor constante.",
    energyCost: 1,
    id: "card-garden-02",
    name: "Canteiro Fofo",
    purchaseCost: 7,
    tileType: "garden",
  },
  {
    coinYield: 1,
    description:
      "Cria um lago mais amplo e refinado. E mais caro de jogar, mas ja se paga melhor que os lagos iniciais.",
    energyCost: 2,
    id: "card-pond-02",
    name: "Lago Espelhado",
    purchaseCost: 10,
    tileType: "pond",
  },
  {
    coinYield: 2,
    description:
      "Ergue um bosque valioso na borda. Brilha em runs mais longas, quando expandir sem perder rendimento faz diferenca.",
    energyCost: 2,
    id: "card-wild-02",
    name: "Bosque Dourado",
    purchaseCost: 10,
    tileType: "wild",
  },
  {
    coinYield: 1,
    description:
      "Adiciona um campo enxuto e barato. Ideal para fechar o deck com cartas leves e manter a curva de energia suave.",
    energyCost: 1,
    id: "card-field-03",
    name: "Terra Solta",
    purchaseCost: 9,
    tileType: "field",
  },
  {
    coinYield: 4,
    description:
      "Planta um jardim premium de alto retorno. Uma carta de valor para quem quer explodir renda no meio e fim da run.",
    energyCost: 2,
    id: "card-garden-03",
    name: "Pomar Cute",
    purchaseCost: 11,
    tileType: "garden",
  },
];

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
