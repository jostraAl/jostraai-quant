console.log("JostraAI Quant Pro starting...");

// Store digits
let digits = [];

// Connect to Deriv WebSocket
const ws = new WebSocket("wss://ws.derivws.com/websockets/v3?app_id=1089");

ws.onopen = () => {
  console.log("Connected to Deriv ✔");

  ws.send(JSON.stringify({
    ticks: "R_100",
    subscribe: 1
  }));
};

ws.onmessage = (msg) => {
  const data = JSON.parse(msg.data);

  if (data.tick) {
    const price = data.tick.quote;
    const digit = Number(String(price).slice(-1));

    addDigit(digit);
    updateUI(digit);
  }
};

// Add digit to memory
function addDigit(d) {
  digits.push(d);
  if (digits.length > 300) digits.shift();
}

// Over/Under logic
function getSignal() {
  let over = 0;
  let under = 0;

  digits.forEach(d => {
    if ([1,2,3].includes(d)) over++;
    if ([6,7,8,9].includes(d)) under++;
  });

  if (over > under) return "OVER";
  if (under > over) return "UNDER";
  return "WAIT";
}

// Update dashboard UI
function updateUI(digit) {
  const lastDigit = document.getElementById("lastDigit");
  const signal = document.getElementById("signal");

  if (lastDigit) lastDigit.innerText = digit;
  if (signal) signal.innerText = getSignal();
}

console.log("JostraAI WebSocket Engine Ready ✔");
