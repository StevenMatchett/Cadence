const Ant = require('ant-plus');
const stick = new Ant.GarminStick2(); // Most common stick

const sensors = {
  started: false,
};

sensors.listeners = [];
sensors.listener = function (data) {
  let userData = {};
  userData.type = 'cadence';
  userData.value = data.CalculatedCadence;
  userData.raw = data;

  // Call all listener
  for (let listener of sensors.listeners) {
    listener(userData);
  }
};

sensors.scanAll = function () {
  try {
    sensors.cadenceScanner.scan();
  } catch (e) {
    console.log(e)
  }
};

sensors.onStart = function (callback) {
  sensors.onStartCallBack = callback;
}

sensors.addSensorsListener = function (listener) {
  sensors.listeners.push(listener);
};

sensors.start = function () {
  if (sensors.started) { // Start once
    return;
  }

  sensors.speedScanner = new Ant.SpeedScanner(stick);

  sensors.speedScanner.on('attached', () => {
    sensors.scanAll();
  });
  sensors.speedScanner.on('speedData', data => {
    console.log('speed Data')
    sensors.listener(data);
  });

  sensors.cadenceScanner = new Ant.CadenceScanner(stick);
  sensors.cadenceScanner.on('attached', () => {
    sensors.scanAll();
  });
  sensors.cadenceScanner.on('cadenceData', data => {
    sensors.listener(data);
  });

  stick.on('startup', function () {
    console.log('sensors startup');
    sensors.speedScanner.scan();
  });

  if (!stick.open()) {
    console.log('Stick not found!');
    console.log('Please use GarminStick2 compatible ANT+ USB stick.');
    console.log('More information on https://github.com/Loghorn/ant-plus');
  }
  sensors.started = true;
};

module.exports = sensors;