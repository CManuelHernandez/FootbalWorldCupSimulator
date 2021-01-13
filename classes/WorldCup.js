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

    

}
