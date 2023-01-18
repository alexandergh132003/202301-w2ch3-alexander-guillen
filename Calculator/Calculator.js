function calculator() {
  let arr = [prompt(), prompt()];
  arr = arr.filter((m) => m !== null);
  arr = arr.map((x) => x.trim());
  arr = arr.filter((y) => y !== "");
  let arrBoolean = arr.map((element) => Boolean(+element)),
    check = arrBoolean.every((value) => value);

  if (arr.length > 0) {
    if (arr.length > 1) {
      if (check) {
        arr = arr.map((index) => +index);
        let results = [];
        let signs = [" + ", " - ", " * ", " / "];
        let sum = 0,
          deduct = arr[0],
          mult = 1,
          div = +arr[0] == 1 ? 1 : +arr[0] * 2;
        for (let add of arr) {
          sum += add;
        }

        for (i = 1; i < arr.length; i++) {
          deduct -= arr[i];
        }

        for (let rept of arr) {
          mult *= rept;
        }
        for (let fract of arr) {
          div /= fract;
        }
        results.push(sum, deduct, mult, div);

        for (let s = 0; s < signs.length; s++) {
          console.log(
            `${arr.join(signs[s])} = ${
              Number.isInteger(results[s]) ? results[s] : results[s].toFixed(3)
            }`
          );
        }
      } else {
        console.log("Non numerical value");
      }
    } else {
      check
        ? Number.isInteger(Math.sqrt(arr[0]))
          ? console.log(`√${arr[0]} = ${Math.sqrt(arr[0])}`)
          : console.log(`√${arr[0]} = ${Math.sqrt(arr[0]).toFixed(3)}`)
        : console.log("Non numerical value");
    }
  } else {
    console.log("Missing arguments");
  }
}
