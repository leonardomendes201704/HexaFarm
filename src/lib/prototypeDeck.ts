import type { ExpansionTileType } from "./hexGrid";

export type ExpansionCard = {
  description: string;
  id: string;
  name: string;
  tileType: ExpansionTileType;
};

export type PrototypeDeckState = {
  discardPile: ExpansionCard[];
  drawPile: ExpansionCard[];
  hand: ExpansionCard[];
};

const HAND_SIZE = 3;

const INITIAL_EXPANSION_CARDS: ExpansionCard[] = [
  {
    description: "Cria um campo basico para expandir sua producao inicial.",
    id: "card-field-01",
    name: "Abrir Clareira",
    tileType: "field",
  },
  {
    description: "Adiciona um jardim acolhedor e aumenta a afinidade visual da run.",
    id: "card-garden-01",
    name: "Jardim Macio",
    tileType: "garden",
  },
  {
    description: "Abre um lago raso para apoiar irrigacao e rotas futuras.",
    id: "card-pond-01",
    name: "Canal Raso",
    tileType: "pond",
  },
  {
    description: "Expande a borda com um bosque leve e utilitario.",
    id: "card-wild-01",
    name: "Trilha Selvagem",
    tileType: "wild",
  },
  {
    description: "Adiciona mais espaco fertil para cultivar cedo.",
    id: "card-field-02",
    name: "Lote Fertil",
    tileType: "field",
  },
  {
    description: "Transforma a borda em uma area floral mais charmosa.",
    id: "card-garden-02",
    name: "Canteiro Fofo",
    tileType: "garden",
  },
];

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
        drawPile: [...nextState.discardPile],
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

export function createInitialExpansionDeck() {
  return drawToHand({
    discardPile: [],
    drawPile: [...INITIAL_EXPANSION_CARDS],
    hand: [],
  });
}

export function playExpansionCard(deckState: PrototypeDeckState, cardId: string) {
  const playedCard = deckState.hand.find((card) => card.id === cardId);

  if (!playedCard) {
    return {
      nextState: deckState,
      playedCard: null,
    };
  }

  const remainingHand = deckState.hand.filter((card) => card.id !== cardId);
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
