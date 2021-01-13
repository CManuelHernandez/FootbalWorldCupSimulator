export default class WorldCup {

    constructor(name, teams=[], config={}) {
        this.name = name;
        this.teams = teams;
        this.setup(config);
        this.setupTeams(teams);
        this.summaries = [];
    };

    setup(config) {
        const defaultConfig = { rounds: 1 };
        this.config = Object.assign(defaultConfig, config);
    };

    setupTeams(teamNames) {
        this.teams = [];
        for (const teamName of teamNames) {
            const team = this.customizeTeam(teamName);
            this.teams.push(team)
        }
    };

    customizeTeam(teamName) {
        return {
            name: teamName,
            matchesWon: 0,
            matchesDrawn: 0,
            matchesLost: 0
        }
    }

    start() {
        for (const matchDay of this.matchDaySchedule) {
            const matchDaySummary = {
                results: [],
                standings: undefined
            }
            for (const match of matchDay) {
                const result = this.play(match);
                this.updateTeams(result);  // actualizamos los equipos con el resultado de partido
                matchDaySummary.results.push(result)
            };
            // Calcular clasificación
            this.getStandings()
            matchDaySummary.standings = this.teams.map(team => Object.assign({}, team))
            // Guardar resumen de la jornada
            this.summaries.push(matchDaySummary)
        }
    }

    getStandings() {
        throw new Error('getStandings not implemented')
    }

    updateTeams(result) {
        throw new Error('updateTeams method not implemented')
    }

    play(match) {
        throw new Error('play method not implented')
    }  

}
