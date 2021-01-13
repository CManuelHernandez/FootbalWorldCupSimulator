import WorldCup from './WorldCup.js';

export default class LeagueWC extends WorldCup {
    constructor(name, teams=[], config={}) {
        super(name, teams, config);
        this.matchDaySchedule = [];
    };

    setup(config) {
        const defaultConfig = {
            rounds: 1,
            pointsPerWin: 3,
            pointsPerDraw: 1,
            pointsPerLose: 0
        };
        this.config = Object.assign(defaultConfig, config);
    };
    
    customizeTeam(teamName) {
        const customizedTeam = super.customizeTeam(teamName);
        return {
            goints: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            ...customizedTeam
        };
    };

    scheduleMatchDays() {
        const numberOfMatchDays = this.teams.length - 1;
        const numberOfMatchesPerMatchDay = this.teams.length / 2;
        for (let i = 0; i < numberOfMatchDays; i++) {
            const matchDay = [];  // jornada vacía
            for (let j = 0; j < numberOfMatchesPerMatchDay; j++) {
                const match = ['Equipo local', 'Equipo visitante'];  // partido
                matchDay.push(match);
            };
            // una vez añadidos todos los partidos a la jornada
            this.matchDaySchedule.push(matchDay);  // añadimos la jornada a la planificación
        };
    };
}