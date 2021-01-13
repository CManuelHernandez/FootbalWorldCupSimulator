export default class WorldCup {

    constructor(name, teams=[], rounds=1) {
        this.name = name;
        this.teams = teams;
        this.rounds = rounds;
        this.setupTeams(teams);
    };

    setupTeams(teamNames) {
        this.teams = []
        for (const teamName of teamNames) {
            const team = {
                name: teamName,
                matchesWon: 0,
                matchesDrawn: 0,
                matchesLost: 0
            };
            this.teams.push(team);
        };
    };

    start() {
        for (const matchDay of this.matchDaySchedule) {
            for (const match of matchDay) {
                const result = this.play(match);
                this.updateTeams(result);  // actualizamos los equipos con el resultado de partido
            };
            console.log('Calcular clasificación');
            console.log('Guardar resumen de la jornada');
        }
    }

    updateTeams(result) {
        throw new Error('updateTeams method not implemented')
    }

    play(match) {
        throw new Error('play method not implented')
    }  

}
