import WorldCup from './WorldCup.js';

export default class LeagueWC extends WorldCup {
    constructor(name, teams=[], config={}) {
        super(name, teams, config);
    }

    setup(config) {
        const defaultConfig = {
            rounds: 1,
            pointsPerWin: 3,
            pointsPerDraw: 1,
            pointsPerLose: 0
        }
        this.config = Object.assign(defaultConfig, config);
    }
    
}