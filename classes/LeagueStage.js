import WorldCup from './WorldCup.js';

const LOCAL_TEAM = 0;
const AWAY_TEAM = 1;

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

    initSchedule() {
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

    getTeamNames() {
        return this.teams.map(team => team.name);
    };

    setLocalTeams() {
        const teamNames = this.getTeamNames();
        const maxHomeTeams = this.teams.length - 2;
        let teamIndex = 0;
        this.matchDaySchedule.forEach(matchDay => { // por cada jornada
            matchDay.forEach(match => { // por cada partido de cada jornada
                // establecer el equipo local
                match[LOCAL_TEAM] = teamNames[teamIndex];
                teamIndex++;
                if (teamIndex > maxHomeTeams) {
                    teamIndex = 0;
                };
            });
        });
    };

    setAwayTeams() {
        const teamNames = this.getTeamNames();
        const maxAwayTeams = this.teams.length - 2;
        let teamIndex = maxAwayTeams;
        this.matchDaySchedule.forEach(matchDay => {
            let firstMatchFound = false;
            matchDay.forEach(match => {
                if (!firstMatchFound) {
                    firstMatchFound = true;
                } else {
                    match[AWAY_TEAM] = teamNames[teamIndex];
                    teamIndex--;
                    if (teamIndex < 0) {
                        teamIndex = maxAwayTeams;
                    };
                };
            });
        });
    };

    fixLastTeamSchedule() {
        let matchDayNumber = 1;
        const teamNames = this.getTeamNames();
        const lastTeamName = teamNames[teamNames.length - 1];
        this.matchDaySchedule.forEach(matchDay => {
            const firstMatch = matchDay[0];
            if (matchDayNumber % 2 == 0) { // si jornada par -> juega en casa
                firstMatch[AWAY_TEAM] = firstMatch[LOCAL_TEAM];
                firstMatch[LOCAL_TEAM] = lastTeamName;
            } else { // jornada impar -> juega fuera
                firstMatch[AWAY_TEAM] = lastTeamName;
            }
            matchDayNumber++
        });
    };

    scheduleMatchDays() {
        this.initSchedule();
        this.setLocalTeams();
        this.setAwayTeams();
        this.fixLastTeamSchedule();
    };
}