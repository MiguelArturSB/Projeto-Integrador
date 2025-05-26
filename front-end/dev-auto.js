// dev-auto.js
const { networkInterfaces } = require('os');
const { exec } = require('child_process');

function getLocalIP() {
  const nets = networkInterfaces();
  const ipRanges = [
    /^10\./,              // 10.x.x.x
    /^192\.168\./,        // 192.168.x.x
    /^172\.(1[6-9]|2\d|3[01])\./ // 172.16.x.x - 172.31.x.x
  ];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        if (ipRanges.some((r) => r.test(net.address))) {
          return net.address;
        }
      }
    }
  }

  return 'localhost';
}

const ip = getLocalIP();
const cmd = `next dev --turbopack --hostname ${ip}`;

console.log(`\n🔧 Iniciando Next.js `);
console.log(`📱 Local:     http://${ip}:3000\n`);

exec(cmd, { stdio: 'inherit' });
