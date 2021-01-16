import WorldCup from './WorldCup.js';
import { LOCAL_TEAM, AWAY_TEAM } from '../teams.js';

export default class LeagueWC extends WorldCup {
    constructor(name, teams=[], config={}) {
        super(name, teams, config);
    };

    play(match) {
        const homeGoals = super.generateGoals();
        const awayGoals = super.generateGoals();
        return {
            homeTeam: match[LOCAL_TEAM],
            homeGoals,
            awayTeam: match[AWAY_TEAM],
            awayGoals
        };
    };

}