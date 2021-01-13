import { worldCupContenders , groupsLetter,
    grupoA, grupoB, grupoC, grupoD, grupoE, grupoF, grupoG, grupoH} from './teams.js';
import WorldCup from './classes/WorldCup.js';
import LeagueWC from './classes/LeagueStage.js';


const groups = [
    new LeagueWC ('Group A', grupoA),
    new LeagueWC ('Group B', grupoB),
    new LeagueWC ('Group C', grupoC),
    new LeagueWC ('Group D', grupoD),
    new LeagueWC ('Group E', grupoE),
    new LeagueWC ('Group F', grupoF),
    new LeagueWC ('Group G', grupoG),
    new LeagueWC ('Group H', grupoH),
];

let numerogrupo = 0;
for (const group of groups) {

    console.log(`GRUPO ${groupsLetter[numerogrupo]}`)
    console.log('-----------------------')
    const teamNames = group.getTeamNames();
    teamNames.forEach(function(equipo) {
    console.log(equipo);
    });
    console.log('');

    group.scheduleMatchDays();
    group.start();
    
    let i = 1
    group.matchDaySchedule.forEach(matchDay => {
    console.log(`JORNADA ${i} del grupo ${groupsLetter[numerogrupo]}`)
    matchDay.forEach(match => {
        const home = match[0];
        const away = match[1];
        console.log(`${home} vs ${away}`)
    })
    i++
    console.log('');
    }); 
    numerogrupo++;
}

console.log('===============================================');
console.log('============== COMIENZA EL MUNDIAL ============');
console.log('===============================================');
console.log('');

numerogrupo = 0;
for (const group of groups) {
    // mostrar por pantalla los resultados de cada jornada y la clasificación
    let i = 1
    group.summaries.forEach(summary => {
    console.log(`RESULTADO JORNADA ${i} del grupo ${groupsLetter[numerogrupo]}`)
    summary.results.forEach(result => {
        console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam}`)
    })
    console.table(summary.standings.map(team => {
        return {
            Team: team.name,
            Points: team.points,
            PlayedMatches: team.matchesWon + team.matchesDrawn + team.matchesLost,
            Won: team.matchesWon,
            Drawn: team.matchesDrawn,
            Lost: team.matchesLost,
            GoalsFor: team.goalsFor,
            GoalsAgainst: team.goalsAgainst,
            GoalsDiff: team.goalsFor - team.goalsAgainst
        }
    }))
    i++
})
numerogrupo++;     
}
