import WorldCup from './WorldCup.js';

const LOCAL_TEAM = 0;
const AWAY_TEAM = 1;

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
    initPlayOffSchedule() {
        const playOffnumberOfMatchesPerMatchDay = this.teams.length / 2;
        const playOffmatchDay = [];  // jornada vacía
        for (let j = 0; j < playOffnumberOfMatchesPerMatchDay; j++) {
            const playOffmatch = ['Equipo local', 'Equipo visitante'];  // partido
            playOffmatchDay.push(playOffmatch);
        }
        this.playOffDaySchedule.push(playOffmatchDay);  // añadimos la ronda a la planificación
    }

    getTeamNames() {
        return this.teams.map(team => team.name);
    }

    setLocalTeams() {
        const teamNames = this.getTeamNames();
        const maxHomeTeams = this.teams.length - 2;
        let teamIndex = 0;
        this.playOffDaySchedule.forEach(matchDay => { // por cada jornada
            matchDay.forEach(match => { // por cada partido de cada jornada
                // establecer el equipo local
                match[LOCAL_TEAM] = teamNames[teamIndex];
                teamIndex++;
                if (teamIndex > maxHomeTeams) {
                    teamIndex = 0;
                }
            });
        });
    }

    setAwayTeams() {
        const teamNames = this.getTeamNames();
        const maxAwayTeams = this.teams.length - 2;
        let teamIndex = maxAwayTeams;
        this.playOffDaySchedule.forEach(matchDay => {
            let firstMatchFound = false;
            matchDay.forEach(match => {
                if (!firstMatchFound) {
                    firstMatchFound = true;
                } else {
                    match[AWAY_TEAM] = teamNames[teamIndex]
                    teamIndex--;
                    if (teamIndex < 0) {
                        teamIndex = maxAwayTeams;
                    }
                }
            });
        });
    }

    fixLastTeamSchedule() {
        let matchDayNumber = 1;
        const teamNames = this.getTeamNames();
        const lastTeamName = teamNames[teamNames.length - 1]
        this.playOffDaySchedule.forEach(matchDay => {
            const firstMatch = matchDay[0];
            if (matchDayNumber % 2 == 0) { // si jornada par -> juega en casa
                firstMatch[AWAY_TEAM] = firstMatch[LOCAL_TEAM];
                firstMatch[LOCAL_TEAM] = lastTeamName;
            } else { // jornada impar -> juega fuera
                firstMatch[AWAY_TEAM] = lastTeamName;
            }
            matchDayNumber++;
        });
    }

    generateGoals() {
        return Math.round(Math.random() * 10);
    }

    playPlayOff(match) {
        let homeGoals = this.generateGoals();
        let awayGoals = this.generateGoals();

        while (true) { // Repetir si empatan
            if (homeGoals == awayGoals) {
                homeGoals = this.generateGoals();
                awayGoals = this.generateGoals();
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

    getTeamForName(name) {
        return this.teams.find(team => team.name == name);
    };

    updatePlayOffsTeams(result) {
        // buscar el equipo por su nombre en el array de equipos
        const homeTeam = this.getTeamForName(result.homeTeam);
        const awayTeam = this.getTeamForName(result.awayTeam);
        if (homeTeam && awayTeam) { // si ecuentra ambos equipos

            if (result.homeGoals > result.awayGoals) { // gana equipo local
                homeTeam.points += this.config.pointsPerWin;
                awayTeam.points += this.config.pointsPerLose;
            } else if (result.homeGoals < result.awayGoals) { // gana equipo visitante
                homeTeam.points += this.config.pointsPerLose;
                awayTeam.points += this.config.pointsPerWin;
            } 
        }
    };

    getPlayOffStandings() {
        this.teams.sort(function(teamA, teamB) {
            if (teamA.points > teamB.points) {
                return -1;
            } else if (teamA.points < teamB.points) {
                return 1;
            } 
        });
    };
    
    PlayOffSchedule() {
        this.initPlayOffSchedule();
        this.setLocalTeams();
        this.setAwayTeams();
        this.fixLastTeamSchedule();
    }   
}