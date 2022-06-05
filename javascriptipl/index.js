let csvToJson = require('convert-csv-to-json');
let matchesData = csvToJson.fieldDelimiter(',').getJsonFromCsv("matches.csv");
let deliveriesData = csvToJson.fieldDelimiter(',').getJsonFromCsv("deliveries.csv");

function findNumberOfMatchesPlayedPerYear(data) {
    let myYearObject = {};
    for (let object of data) {
        let year = object.season;
        if (year in myYearObject) {
            myYearObject[year] += 1

        }
        else {
            myYearObject[year] = 1;
        }
    }
    console.log(myYearObject);

}
findNumberOfMatchesPlayedPerYear(matchesData);

function findNumberofMatchesWonOfAllTeamsOverAllTheYearsofIPL(data) {

    let teamsObject = {}
    for (let object of data) {
        let winnerTeam = object.winner;
        if (winnerTeam in teamsObject) {
            teamsObject[winnerTeam] += 1

        }
        else {
            teamsObject[winnerTeam] = 1;
        }
    }
    console.log(teamsObject);
}
findNumberofMatchesWonOfAllTeamsOverAllTheYearsofIPL(matchesData);

function findForTheYear2016GetTheExtraRunsConcededPerTeam(matchesData, deliveriesData) {
    let extraRunsObject = {}
    let matchIds = []
    for (let object of matchesData) {

        if (object.season == 2016) {
            matchIds.push(object.id);
        }
    }
    for (let deliveryObject of deliveriesData) {
        if (matchIds.includes(deliveryObject.match_id)) {
            let team = deliveryObject.bowling_team
            let extraRuns = parseInt(deliveryObject.extra_runs)
            if (team in extraRunsObject) {
                extraRunsObject[team] += parseInt(extraRuns)
            }
            else {
                extraRunsObject[team] = parseInt(extraRuns)
            }
        }
    }
    console.log(extraRunsObject);
}
findForTheYear2016GetTheExtraRunsConcededPerTeam(matchesData,deliveriesData);
function findNumberOfTossesWonByTeams(matchesData) {
    let tossesObject = {}
    for (let object of matchesData) {
        let team = object.toss_winner;
        if (team in tossesObject) {
            tossesObject[team] += 1

        }
        else {
            tossesObject[team] = 1;
        }
    }
    console.log(tossesObject);


}
findNumberOfTossesWonByTeams(matchesData);

function findMostEconomyBowlerInTheSeason2015(matchesData, deliveriesData) {
    let EconomiesObjec = {}
    let matchIds = []
    for (let object of matchesData) {

        if (object.season == 2015) {
            matchIds.push(object.id);
        }
    }
    let bowlerBallsObject = {}
    let bowlerRunsObject = {}

    for (let deliveryObject of deliveriesData) {
        if ( matchIds.includes(deliveryObject.match_id )) {
            let bowler = deliveryObject.bowler
            let runs = parseInt(deliveryObject.total_runs)
            if (bowler in bowlerBallsObject) {
                bowlerBallsObject[bowler] += 1
                bowlerRunsObject[bowler] += runs
            }
            else {
                bowlerBallsObject[bowler] = 1
                bowlerRunsObject[bowler] = runs
            }
        }
    }
    for (let bowler1 of Object.entries(bowlerBallsObject)){
        
        let bowlerOvers=(bowler1[1]/6);
        let bowlerEconomy=bowlerRunsObject[bowler1[0]]/bowlerOvers
        EconomiesObjec[bowler1[0]]=bowlerEconomy
    }
    let economyArray=Object.entries(EconomiesObjec);
    let result=economyArray.sort((object1,object2) => object1[1]-object2[1])
    console.log(result);
}
findMostEconomyBowlerInTheSeason2015(matchesData, deliveriesData);