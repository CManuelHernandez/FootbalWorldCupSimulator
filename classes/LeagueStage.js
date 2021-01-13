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
            points: 0,
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
            matchDayNumber++;
        });
    };

    generateGoals() {
        return Math.round(Math.random() * 10);
    }

    play(match) {
        const homeGoals = this.generateGoals();
        const awayGoals = this.generateGoals();
        return {
            homeTeam: match[LOCAL_TEAM],
            homeGoals,
            awayTeam: match[AWAY_TEAM],
            awayGoals
        };
    };

    getTeamForName(name) {
        return this.teams.find(team => team.name == name);
    };

    updateTeams(result) {
        // buscar el equipo por su nombre en el array de equipos
        const homeTeam = this.getTeamForName(result.homeTeam);
        const awayTeam = this.getTeamForName(result.awayTeam);
        if (homeTeam && awayTeam) { // si ecuentra ambos equipos

            homeTeam.goalsFor += result.homeGoals;
            homeTeam.goalsAgainst += result.awayGoals;
            awayTeam.goalsFor += result.awayGoals;
            awayTeam.goalsAgainst += result.homeGoals;

            if (result.homeGoals > result.awayGoals) { // gana equipo local
                homeTeam.points += this.config.pointsPerWin;
                homeTeam.matchesWon += 1;
                awayTeam.points += this.config.pointsPerLose;
                awayTeam.matchesLost += 1;
            } else if (result.homeGoals < result.awayGoals) { // gana equipo visitante
                homeTeam.points += this.config.pointsPerLose;
                homeTeam.matchesLost += 1;
                awayTeam.points += this.config.pointsPerWin;
                awayTeam.matchesWon += 1;
            } else { // empate
                homeTeam.points += this.config.pointsPerDraw;
                homeTeam.matchesDrawn += 1;
                awayTeam.points += this.config.pointsPerDraw;
                awayTeam.matchesDrawn += 1;
            }
        }
    };

    getStandings() {
        this.teams.sort(function(teamA, teamB) {
            if (teamA.points > teamB.points) {
                return -1;
            } else if (teamA.points < teamB.points) {
                return 1;
            } else { // empatan a puntosç
               const goalsDiffA = teamA.goalsFor - teamA.goalsAgainst;
               const goalsDiffB = teamB.goalsFor - teamB.goalsAgainst;
               if (goalsDiffA > goalsDiffB) {
                   return -1;
               } else if (goalsDiffA < goalsDiffB) {
                   return 1;
               } else {
                   return 0;
               }
            }
        })
    };

    scheduleMatchDays() {
        this.initSchedule();
        this.setLocalTeams();
        this.setAwayTeams();
        this.fixLastTeamSchedule();
    };
}