import WorldCup from './WorldCup.js';

export default class PlayOffWC extends WorldCup {
    constructor(name, teams=[], config={}) {
        super(name, teams, config);
        this.playOffDaySchedule = [];
    };

    setup(config) {
        const defaultConfig = {
            rounds: 1,
            pointsPerWin: 1,
            pointsPerLose: 0
        };
        this.config = Object.assign(defaultConfig, config);
    };

    customizeTeam(teamName) {
        const customizedTeam = super.customizeTeam(teamName);
        return {
            points: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            ...customizedTeam
        };
    };
}