const fs = require('fs');
const util = require('util');

/**
 * 
 * @param {string} filePath The path of the log file. 
 * @returns {string[]} The logs.
 */
const getLogs = async (filePath) => {
  if (!filePath) return;

  try {
    /** Convert fs.readFile into Promise version of same */
    const readFile = util.promisify(fs.readFile);
    /** Extract data from file path */
    const data = await readFile(filePath, 'utf-8');
    /** Return logs as an array of strings */
    return data.split(/\r?\n/);
  } catch (error) {
    console.error(`Failed to get logs from file path: ${filePath}. Reason: `, error);
  }
}

/**
 * 
 * @param {string[]} logs The logs. 
 * @returns {string[]} All IP addresses.
 */
const getIpAddresses = (logs) => {
  if (!logs) return;

  const regexIpAddressExpression = new RegExp(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/);

  try {
    const ipAddresses = logs.map(log => log.match(regexIpAddressExpression)[0]);
    return ipAddresses;
  } catch (error) {
    console.error(`Failed to get the IP addresses from logs: ${logs}. Reason: `, error);
  }
}

/**
 * 
 * @param {string[]} logs The logs. 
 * @returns {string[]} All URLs.
 */
const getUrls = (logs) => {
  if (!logs) return;
  
  const httpMethods = [
    'POST',
    'GET',
    'PUT',
    'PATCH',
    'DELETE',
  ];
  const urls = [];

  try {
    httpMethods.map(method => {
      logs.map(log => {
        /** Get URLs from logs by extracting everything between a HTTP method and a space character */
        if (log.includes(method)) urls.push(log.split(`${method} `).pop().split(' ')[0]);
      });
    });
    return urls;
  } catch (error) {
    console.error(`Failed to get the URLs from logs: ${logs}. Reason: `, error);
  };
}

/**
 * 
 * Gets the most frequent items in an array.
 * @param {*[]} items The items. 
 * @param {number} [returnCount] The number of frequent items to be returned, in order of most frequent. If not provided the default value will be 1.
 * @returns {string[]} The most frequent item(s) in order.
 */
const getMostFrequentItems = (items = [], returnCount = 1) => {
  if (!items) return

  const map = {};
  let keys = [];

  try {
    for (let i = 0; i < items.length; i++) {
      if (map[items[i]]) {
        map[items[i]]++;
      } else {
        map[items[i]] = 1;
      }
    }
    for (let i in map) {
      keys.push(i);
    }
    keys = keys.sort((a, b) => {
  
      if (map[a] === map[b]) {

        if (a > b) {
          return 1;
        } else {
          return -1;
        }
      }
      else {
        return map[b] - map[a];
      }
    })
    .slice(0, returnCount);
    return keys;

  } catch (error) {
    console.error(`Failed to get the ${returnCount} most frequent item(s) for items: ${items}. Reason: `, error);
  }
};

/**
 * 
 * Console logs a log file report of the following:
 * - The number of unique IP addresses
 * - The top 3 most visited URLs
 * - The top 3 most active IP addresses
 * @param {string} logFilePath The path of the log file.
 * @returns 
 */
const giveReport = async (logFilePath) => {
  if (!logFilePath) {
    console.log('Please provide the path to a log file');
    return;
  }

  console.log(`Reading log file: ${logFilePath} ...`);

  const logs = await getLogs(logFilePath);

  const ipAddresses = getIpAddresses(logs);
  const urls = getUrls(logs);

  const uniqueIpAddressesCount = [...new Set(ipAddresses)].length;
  const threeMostVisitedUrls = getMostFrequentItems(urls, 3);
  const threeMostActiveIpAddresses = getMostFrequentItems(ipAddresses, 3);

  console.log(`There are ${uniqueIpAddressesCount} unique IP addresses.`);
  console.log(`The top 3 most visited URLs are: ${threeMostVisitedUrls[0]}, ${threeMostVisitedUrls[1]}, and ${threeMostVisitedUrls[2]}`);
  console.log(`The top 3 most active IP addresses are: ${threeMostActiveIpAddresses[0]}, ${threeMostActiveIpAddresses[1]}, and ${threeMostActiveIpAddresses[2]}`);
}

module.exports = {
  giveReport,
  /** Internal functions that should be called in unit tests only */
  testable: {
    getLogs,
    getIpAddresses,
    getUrls,
    getMostFrequentItems,
  }
}
