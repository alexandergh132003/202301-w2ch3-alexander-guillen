/* eslint-disable prefer-const */
/* eslint-disable no-implicit-coercion */
/* eslint-disable no-alert */
function calculator() {
  let input = prompt();
  let arr = [];

  while (input !== null) {
    arr.push(input);
    input = prompt();
  }

  arr = arr.map((x) => x.trim());
  arr = arr.filter((y) => y !== "");
  const arrBoolean = arr.map((element) => Boolean(+element));
  const check = arrBoolean.every((value) => value);

  if (arr.length > 0) {
    if (arr.length > 1) {
      if (check) {
        arr = arr.map((index) => +index);
        const results = [];
        const signs = [" + ", " - ", " * ", " / "];
        let sum = 0;
        let deduct = arr[0];
        let mult = 1;
        let div = +arr[0] === 1 ? 1 : +arr[0] * 2;

        for (let add of arr) {
          sum += add;
        }

        for (let i = 1; i < arr.length; i++) {
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
      const result = check
        ? Number.isInteger(Math.sqrt(arr[0]))
          ? `√${arr[0]} = ${Math.sqrt(arr[0])}`
          : `√${arr[0]} = ${Math.sqrt(arr[0]).toFixed(3)}`
        : "Non numerical value";
      console.log(result);
    }
  } else {
    console.log("Missing arguments");
  }

  setTimeout(() => {
    const repeat = confirm("Would you like to add more numbers?");
    if (repeat === true) {
      calculator();
    } else {
      console.log("Goodbye");
    }
  });
}

calculator();
