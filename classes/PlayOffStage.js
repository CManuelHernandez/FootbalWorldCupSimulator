import WorldCup from './WorldCup.js';
import { LOCAL_TEAM, AWAY_TEAM } from '../teams.js';

export default class PlayOffWC extends WorldCup {
    constructor(name, teams=[], config={}) {
        super(name, teams, config);
    };

    playPlayOff(match) {
        let homeGoals = super.generateGoals();
        let awayGoals = super.generateGoals();

        while (true) { // Repetir si empatan
            if (homeGoals == awayGoals) {
                homeGoals = super.generateGoals();
                awayGoals = super.generateGoals();
            } else {
                break;
            }
        }

        return {
            homeTeam: match[LOCAL_TEAM],
            homeGoals,
            awayTeam: match[AWAY_TEAM],
            awayGoals
        };
    };
}