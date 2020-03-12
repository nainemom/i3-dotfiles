const process = require('process');
const { execSync, exec } = require('child_process');

const run = (command, async = false) => {
  try {
    async && exec(command);
    return !async && execSync(command).toString();
  } catch (e) {
    return '';
  }
}

const notif = (title, body) => {
  run(`notify-send "${title}" "${body}"`);
}

const ask = (title, options = [], getIndex = false, preSelected = undefined) => {
  try {
    let selectedRow = 0;
    if (preSelected && options.length) {
      selectedRow = options.indexOf(preSelected);
    }
    const response = run(`${options.length ? `echo "${options.join("\n")}" | ` : ''}rofi -dmenu -p "${title}:" -selected-row ${selectedRow}`).toString().trim();
    return getIndex ? options.indexOf(response) : response
  } catch(e) {
    return getIndex ? -1 : '';
  }
}

const arg = (index) => {
  return process.argv[index + 2] || undefined;
}

const respondWith = (str) => process.stdout.write(str) && process.exit();

function refreshI3Block(number) {
  run(`pkill -SIGRTMIN+${number} i3blocks`, true);
}

module.exports.run = run;
module.exports.ask = ask;
module.exports.arg = arg;
module.exports.respondWith = respondWith;
module.exports.notif = notif;
module.exports.refreshI3Block = refreshI3Block;
