const flights = [
  { id: 00, to: "New York", from: "Barcelona", cost: 700, scale: false },
  { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },
  { id: 02, to: "Paris", from: "Barcelona", cost: 210, scale: false },
  { id: 03, to: "Roma", from: "Barcelona", cost: 150, scale: false },
  { id: 04, to: "London", from: "Madrid", cost: 200, scale: false },
  { id: 05, to: "Madrid", from: "Barcelona", cost: 90, scale: false },
  { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },
  { id: 07, to: "Shangai", from: "Barcelona", cost: 800, scale: true },
  { id: 08, to: "Sydney", from: "Barcelona", cost: 150, scale: true },
  { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false },
];

function welcomeMessage() {
  let userName = prompt("Please, enter your name."), greeting = "Welcome to ISDI Coders Airlines, ";
  userName === null || userName.trim() === "" ? alert(greeting + "stranger.") : alert(greeting + userName.trim() + ".");
}

welcomeMessage()

function averageFlightCost() {
  let costSum = 0;
  for (let z = 0; z < flights.length; z++) {
    costSum += flights[z].cost;
  }
  alert(`The average cost of flights is ${costSum / flights.length}€.`)
}

function stopoverFlights() {
  let stopoverSum = 0;
  for (let b = 0; b < flights.length;  b++) {
    stopoverSum += flights[b].scale === true ? 1 : 0;
  }
  alert(`In total, there are ${stopoverSum} flights with stopovers.`);
}

function lastFiveDestinations () {
  let lastFive = flights.slice(-5), statement = "The destinations of the last 5 flights are ";
  for (let m = 0; m < lastFive.length; m++) {
    statement += m < lastFive.length - 1 ? `${lastFive[m].to}, ` : `and ${lastFive[m].to}.`
  }
  alert(statement);
}

function availableFlights() {
  let departures = ["Available flights today:"];
  for (let i = 0; i < flights.length; i++) {
    departures.push(`The flight with departure: ${flights[i].from}, and destination: ${flights[i].to} has a cost of ${flights[i].cost}€ and ${flights[i].scale == false ? "does not make any stopover." : "makes a stopover."}`)
    
  }
 let win = window.open("about:blank", null, "width=400,height=300"), doc = win.document;
 doc.open("text/html");
 doc.write(departures.join("<br><br>"));
  let timer = setInterval(function() {   
    if(win.closed) {  
        clearInterval(timer);  
        averageFlightCost(); 
        stopoverFlights();
        lastFiveDestinations();
    }  
}, 1000); 
 
}

availableFlights();
