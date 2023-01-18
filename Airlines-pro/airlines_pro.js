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

let welcomeMessage = () => {
  let userName = prompt("Please, enter your name."), greeting = "Welcome to ISDI Coders Airlines, ";
  userName === null || userName.trim() === "" ? alert(greeting + "stranger.") : alert(greeting + userName.trim() + ".");
}

welcomeMessage()

let averageFlightCost = () => {
  let costSum = 0;
  for (let z = 0; z < flights.length; z++) {
    costSum += flights[z].cost;
  }
  alert(`The average cost of flights is ${costSum / flights.length}€.`)
}

let stopoverFlights = () => {
  let stopoverSum = 0;
  for (let b = 0; b < flights.length;  b++) {
    stopoverSum += flights[b].scale === true ? 1 : 0;
  }
  alert(`In total, there are ${stopoverSum} flights with stopovers.`);
}

let lastFiveDestinations = () => {
  let lastFive = flights.slice(-5), statement = "The destinations of the last 5 flights are ";
  for (let m = 0; m < lastFive.length; m++) {
    statement += m < lastFive.length - 1 ? `${lastFive[m].to}, ` : `and ${lastFive[m].to}.`
  }
  alert(statement);
}

let availableFlights = () => {
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
        determineUserType();
    }  
}, 1000); 
 
}

availableFlights();

let promptWithType = (str, type) => {
  let input = prompt(str);
  if (input !== null) {
    if (input.trim() === "") {
      alert("Missing arguments");
      return promptWithType(str, type);
    } else if (type === "number") {
      if (/^[0-9]+$/.test(input.trim())) {
        return +input.trim();
      } else {
        alert("Enter only numbers.")
        return promptWithType(str, type);
      }
    } else if (type === "string") {
      if (/^[A-Za-z\s]*$/.test(input.trim())) {
        return input.trim();
      } else {
        alert("Enter only letters.");
        return promptWithType(str, type);
      }
    }
  } else {
    return input;
  }
}

let determineUserType = () => {
  
 let showFlights = () => {
  alert("The list of flights will be alerted. ");
  let departures = []
  for (let flight of flights) {
    departures.push(`${flight.from} to ${flight.to} at a cost of ${flight.cost} ${flight.scale === false ? "without scale" : "with scale"} and and ID of ${flight.id}`)
  }
  alert(departures.join("\n"))
}
 
 let updateIds = () => {
  for (let ids = 0; ids < flights.length; ids++) {
    flights[ids].id = ids;
  }
}
  
 let createFlight = () => {
  showFlights();
  let id = flights.length;
  let to = promptWithType("Enter the destination of the flight:", "string");
  let from = promptWithType("Enter the origin of the flight:", "string");
  let cost = promptWithType("Enter the cost of the flight:", "number");
  let scale = confirm("Does the flight have a layover?");
  flights.push({ id, to, from, cost, scale });
  let index = flights.length - 1; 
  alert(`The flight with departure: ${flights[index].from}, and destination: ${flights[index].to}, which has a cost of ${flights[index].cost}€ and ${flights[index].scale == false ? "does not make any stopover." : "makes a stopover."}, have been added succesfully.`);
   updateIds();
   showFlights();
}

let deleteFlight = () => {
  showFlights();
  let id = promptWithType("Enter the ID of the flight you want to delete:", "number");
  let index = flights.findIndex(flight => flight.id === id);
  if (index === -1) {
    alert("Flight not found");
    deleteFlight();
  } else {
    let message = `The flight with departure: ${flights[index].from}, and destination: ${flights[index].to}, which has a cost of ${flights[index].cost}€ and ${flights[index].scale == false ? "does not make any stopover." : "makes a stopover."}, have been deleted succesfully.`;
    flights.splice(index, 1);
    alert(message);
    updateIds();
    showFlights();
  }
}

  let userType = promptWithType("Are you ADMIN or USER?", "string");
  if (userType === null) {alert("Goodbye");}
  else if (userType !== "ADMIN" && userType !== "USER") {
    alert("Invalid input. Please enter ADMIN or USER.");
    determineUserType();
  } else {
    if (userType === "USER") {
      let search = true;
      while (search) {
        let price = promptWithType("Enter a price to search for flights:", "number");
        let matchingFlights = flights.filter(flight => flight.cost <= price);
        if (matchingFlights.length > 0) {
          let flightStrings = [];
          for (const flight of matchingFlights) {
          flightStrings.push(`${flight.from} to ${flight.to} for ${flight.cost}€`);
        }
      alert(`Flights with a price of ${price}€ or less:\n\n${flightStrings.join("\n")}`);
    } else {
      alert("There are no flights with that price or less.");
    }
    search = confirm("Do you want to search for more flights?");
  } 
  alert("Goodbye!");
}  else if (userType === "ADMIN") {
  while (true) {
  let action = promptWithType("What do you want to do? (create/delete)", "string");
  if (action === "create") {
    if (flights.length > 15) {
      alert("Cannot add more flights.\You will be redirected to the flight deletion module.");
      deleteFlight();
    } else {createFlight();}
  } else if (action === "delete") {
    if (flights.length === 0) {
      alert("Cannot delete more flights.\nYou will be redirected to the flight creation module.");
      createFlight();
    } else {deleteFlight();}
  } else if (action === null) {
    alert("Goodbye");
    break;
  } else {
    alert("Invalid action");
  }
}

 }
    }
  }