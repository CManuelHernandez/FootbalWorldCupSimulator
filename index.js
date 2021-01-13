import { worldCupContenders , 
    grupoA, grupoB, grupoC, grupoD, grupoE, grupoF, grupoG, grupoH} from './teams.js';
import WorldCup from './classes/WorldCup.js';
import LeagueWC from './classes/LeagueStage.js';


const groups = new LeagueWC ('Group A', grupoA);

const teamNames = groups.teams.map(team => team.name);

teamNames.forEach(function(equipo) {
    console.log(equipo);
})

groups.scheduleMatchDays();

let i = 1;
groups.matchDaySchedule.forEach(matchDay => {
    console.log(`JORNADA ${i}`)
    matchDay.forEach(match => {
        console.log(match.join(' vs '));
    })
    i++;
});

// Comenzamos la liga
groups.start();

// mostrar por pantalla los resultados de cada jornada y la clasificación
i = 1
groups.summaries.forEach(summary => {
    console.log(`RESUMEN JORNADA ${i}`)
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
    }));
    i++
})
