let defaultNumbers = 100000000;

export const calculateRandom = (q) => {
  if (q >= 0) {
    defaultNumbers = q;
  }
  let numbers = [];
  for (let i = 0; i < defaultNumbers; i++) {
    numbers.push(Math.floor(Math.random() * 1000));
  }
  return numbers.reduce((a, d) => (a[d] ? (a[d] += 1) : (a[d] = 1), a), {});
};

process.on("message", (obj) => {
  console.log(obj.msg);
  if (obj.msg == "start") {
    console.log("Start calculo random");
    const numbers = calculateRandom(obj.cant);
    process.send(numbers);
  }
});
