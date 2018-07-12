export interface INavigation {
    page: string;
}

export interface IGameState {
    framesPerSecond: number
    nav: INavigation
}

export const GameState: IGameState = {
    framesPerSecond: 30,
    nav: {
        page: "buildings"
    }
};
