console.log("JostraAI Quant Pro loaded");

// Future: Deriv WebSocket connection
// const ws = new WebSocket("wss://ws.derivws.com/websockets/v3?app_id=1089");

// Example digit buffer
let digits = [];

// Add digit to memory
function addDigit(d) {
  digits.push(Number(d));

  if (digits.length > 300) {
    digits.shift();
  }
}

// Simple Over/Under logic
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

console.log("Engine ready");
