const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const API_URL = 'https://cashandgo.exchange/api/currencies/get_currencies_data';

// Папка для флагов
const FLAGS_DIR = path.join(__dirname, 'src', 'assets', 'flags');
if (!fs.existsSync(FLAGS_DIR)) {
  fs.mkdirSync(FLAGS_DIR, { recursive: true });
}

const FLAG_CDN = 'https://flagicons.lipis.dev/flags/4x3/';
const USDT_IMAGE = 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=029'; 

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;

    client.get(url, (response) => {
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(`Status: ${response.statusCode}`);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err.message);
    });
  });
}

(async () => {
  console.log('Получаем курсы...');
  let rates = [];

  try {
    const data = await fetch(API_URL).then(r => r.json());
    rates = data.result || [];
    console.log(`Получено ${rates.length} валют`);
  } catch (e) {
    console.log('API упало — используем заглушку');
    rates = [
      {"country_code":"ru","code":"RUB(online transfer)","buy":2.60208,"sell":2.35027},
      {"country_code":"ru","code":"RUB(cash settlement)","buy":2.880994,"sell":2.286503},
      {"country_code":"us","code":"USD","buy":31.48358,"sell":32.122093},
      {"country_code":"eu","code":"EUR","buy":36.625566,"sell":37.360036},
      {"country_code":"kz","code":"KZT","buy":16.961287,"sell":0},
      {"country_code":null,"code":"USDT","buy":30.8439,"sell":32.9161},
      {"country_code":"jp","code":"JPY","buy":0.198091,"sell":0.2114},
      {"country_code":"my","code":"MYR","buy":7.494977,"sell":7.998516},
      {"country_code":"in","code":"INR","buy":0.342545,"sell":0.365558},
      {"country_code":"ae","code":"AED","buy":8.397408,"sell":8.961575},
      {"country_code":"gb","code":"GBP","buy":41.100953,"sell":43.862258},
      {"country_code":"sg","code":"SGD","buy":23.777277,"sell":25.374716},
      {"country_code":"ch","code":"CHF","buy":38.2657,"sell":40.836522},
      {"country_code":"au","code":"AUD","buy":20.453062,"sell":21.82717},
      {"country_code":"hk","code":"HKD","buy":3.964419,"sell":4.230762},
      {"country_code":"ca","code":"CAD","buy":22.290464,"sell":23.788015},
      {"country_code":"tw","code":"TWD","buy":0.988802,"sell":1.055233},
      {"country_code":"kr","code":"KRW","buy":0.020998,"sell":0.022409},
      {"country_code":"ph","code":"PHP","buy":0.522292,"sell":0.557381},
      {"country_code":"nz","code":"NZD","buy":17.819107,"sell":19.016256},
      {"country_code":"cn","code":"CNY","buy":4.357042,"sell":4.649763},
      {"country_code":"sa","code":"SAR","buy":8.223862,"sell":8.776369},
      {"country_code":"qa","code":"QAR","buy":8.472385,"sell":9.041589},
      {"country_code":"bh","code":"BHD","buy":82.019885,"sell":87.530265}
    ];
  }

  const downloaded = new Set();

  for (const rate of rates) {
    const country = rate.country_code?.toLowerCase();
    const code = rate.code;

    if (!country) {
      if (code.includes('USDT') && !downloaded.has('usdt')) {
        const dest = path.join(FLAGS_DIR, 'usdt.png');
        try {
          await download(USDT_IMAGE, dest);
          console.log('USDT → usdt.png');
          downloaded.add('usdt');
        } catch (e) { q 
          console.log('Не удалось скачать USDT:', e);
        }
      }
      continue;
    }

    if (downloaded.has(country)) continue;

    const url = `${FLAG_CDN}${country}.svg`;
    const dest = path.join(FLAGS_DIR, `${country}.svg`);

    try {
      await download(url, dest);
      console.log(`${country.toUpperCase()} → ${country}.svg`);
      downloaded.add(country);
    } catch (e) {
      console.log(`Ошибка ${country}:`, e);
    }
  }

  console.log('ВСЕ ФЛАГИ СКАЧАНЫ В /src/assets/flags');
})();