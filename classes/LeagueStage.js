import WorldCup from './WorldCup.js';

export default class LeagueWC extends WorldCup {
    constructor(name, teams=[], rounds=1, pointsPerWin=3, pointsPerDraw=1, pointsPerLose=0) {
        super(name, teams, rounds)
        this.pointsPerWin = pointsPerWin
        this.pointsPerDraw = pointsPerDraw
        this.pointsPerLose = pointsPerLose
    }
}