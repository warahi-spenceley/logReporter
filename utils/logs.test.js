const {
  giveReport,
  testable
} = require('./logs');

describe('test getLogs', () => {

  it('should retrieve the logs from a .log file', async () => {

    /** Set up */
    /** Note: this data is dependant on the location of the example data */
    const logFilePath = './data/example.log';
    /** Note: this data is dependant on the contents of "./data/example.log" */
    const expected = [
      '177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"',
      '168.41.191.40 - - [09/Jul/2018:10:11:30 +0200] "GET http://example.net/faq/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"',
      '168.41.191.41 - - [11/Jul/2018:17:41:30 +0200] "GET /this/page/does/not/exist/ HTTP/1.1" 404 3574 "-" "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"',
      '168.41.191.40 - - [09/Jul/2018:10:10:38 +0200] "GET http://example.net/blog/category/meta/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) RockMelt/0.9.58.494 Chrome/11.0.696.71 Safari/534.24"',
      '177.71.128.21 - - [10/Jul/2018:22:22:08 +0200] "GET /blog/2018/08/survey-your-opinion-matters/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6"',
      '168.41.191.9 - - [09/Jul/2018:23:00:42 +0200] "GET /docs/manage-users/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3"',
      '168.41.191.40 - - [09/Jul/2018:10:11:56 +0200] "GET /blog/category/community/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; ca-ad) AppleWebKit/531.2+ (KHTML, like Gecko) Safari/531.2+ Epiphany/2.30.6"',
      '168.41.191.34 - - [10/Jul/2018:22:01:17 +0200] "GET /faq/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"',
      '177.71.128.21 - - [10/Jul/2018:22:21:03 +0200] "GET /docs/manage-websites/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0"',
      '50.112.00.28 - - [11/Jul/2018:15:49:46 +0200] "GET /faq/how-to-install/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; ca-ad) AppleWebKit/531.2+ (KHTML, like Gecko) Safari/531.2+ Epiphany/2.30.6"',
      '50.112.00.11 - admin [11/Jul/2018:17:31:56 +0200] "GET /asset.js HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6"',
      '72.44.32.11 - - [11/Jul/2018:17:42:07 +0200] "GET /to-an-error HTTP/1.1" 500 3574 "-" "Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0"',
      '72.44.32.10 - - [09/Jul/2018:15:48:07 +0200] "GET / HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0" junk extra',
      '168.41.191.9 - - [09/Jul/2018:22:56:45 +0200] "GET /docs/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; Linux i686; rv:6.0) Gecko/20100101 Firefox/6.0" 456 789',
      '168.41.191.43 - - [11/Jul/2018:17:43:40 +0200] "GET /moved-permanently HTTP/1.1" 301 3574 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) RockMelt/0.9.58.494 Chrome/11.0.696.71 Safari/534.24"',
      '168.41.191.43 - - [11/Jul/2018:17:44:40 +0200] "GET /temp-redirect HTTP/1.1" 307 3574 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) RockMelt/0.9.58.494 Chrome/11.0.696.71 Safari/534.24"',
      '168.41.191.40 - - [09/Jul/2018:10:12:03 +0200] "GET /docs/manage-websites/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; Linux i686; rv:6.0) Gecko/20100101 Firefox/6.0"',
      '168.41.191.34 - - [10/Jul/2018:21:59:50 +0200] "GET /faq/how-to/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/5.0)"',
      '72.44.32.10 - - [09/Jul/2018:15:49:48 +0200] "GET /translations/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.9 Safari/536.5"',
      '79.125.00.21 - - [10/Jul/2018:20:03:40 +0200] "GET /newsletter/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/5.0)"',
      '50.112.00.11 - admin [11/Jul/2018:17:31:05 +0200] "GET /hosting/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6"',
      '72.44.32.10 - - [09/Jul/2018:15:48:20 +0200] "GET /download/counter/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86; en-US) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"',
      '50.112.00.11 - admin [11/Jul/2018:17:33:01 +0200] "GET /asset.css HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6"'
    ];

    /** Call testable function */
    const logs = await testable.getLogs(logFilePath);
    
    /** Assertions */
    expect(logs).toStrictEqual(expected);
  });

});

describe('test getIpAddresses', () => {

  it('should retrieve all the IP addresses from the logs', async () => {

    /** Set up */
    /** Note: this data is dependant on the location of the example data */
    const logFilePath = './data/example.log';
    const logs = await testable.getLogs(logFilePath);
    /** Note: this data is dependant on the contents of "./data/example.log" */
    const expected = [
      "177.71.128.21",
      "168.41.191.40",
      "168.41.191.41",
      "168.41.191.40",
      "177.71.128.21",
      "168.41.191.9",
      "168.41.191.40",
      "168.41.191.34",
      "177.71.128.21",
      "50.112.00.28",
      "50.112.00.11",
      "72.44.32.11",
      "72.44.32.10",
      "168.41.191.9",
      "168.41.191.43",
      "168.41.191.43",
      "168.41.191.40",
      "168.41.191.34",
      "72.44.32.10",
      "79.125.00.21",
      "50.112.00.11",
      "72.44.32.10",
      "50.112.00.11",
    ];

    /** Call testable function */
    const ipAddresses = testable.getIpAddresses(logs);

    /** Assertions */
    expect(ipAddresses).toStrictEqual(expected);
  });

});

describe('test getUrls', () => {

  it('should retrieve all the URLs from the logs', async () => {

    /** Set up */
    /** Note: this data is dependant on the location of the example data */
    const logFilePath = './data/example.log';
    const logs = await testable.getLogs(logFilePath);
    /** Note: this data is dependant on the contents of "./data/example.log" */
    const expected = [
      "/intranet-analytics/",
      "http://example.net/faq/",
      "/this/page/does/not/exist/",
      "http://example.net/blog/category/meta/",
      "/blog/2018/08/survey-your-opinion-matters/",
      "/docs/manage-users/",
      "/blog/category/community/",
      "/faq/",
      "/docs/manage-websites/",
      "/faq/how-to-install/",
      "/asset.js",
      "/to-an-error",
      "/",
      "/docs/",
      "/moved-permanently",
      "/temp-redirect",
      "/docs/manage-websites/",
      "/faq/how-to/",
      "/translations/",
      "/newsletter/",
      "/hosting/",
      "/download/counter/",
      "/asset.css",
    ];

    /** Call testable function */
    const urls = testable.getUrls(logs);

    /** Assertions */
    expect(urls).toStrictEqual(expected);
  });

});

describe('test getMostFrequestItems', () => {

  /** Set up */
  const items = [
    "http://example.net/faq/",
    "/this/page/does/not/exist/",
    "http://example.net/blog/category/meta/",
    "/blog/2018/08/survey-your-opinion-matters/",
    "http://example.net/faq/",
    "/this/page/does/not/exist/",
    "http://example.net/faq/",
    333,
    333,
    333,
    "555",
    666,
    "http://example.net/faq/",
  ];

  it('should retrieve the 4 most frequent items ordered by most frequent', async () => {

    /** Set up */
    const expected = [
      "http://example.net/faq/",
      "333",
      "/this/page/does/not/exist/",
      "/blog/2018/08/survey-your-opinion-matters/"
    ];

    /** Call testable function */
    const fourMostFrequentItems = testable.getMostFrequentItems(items, 4);

    /** Assertions */
    expect(fourMostFrequentItems).toStrictEqual(expected);
  });

  it('should retrieve the most frequent item', async () => {

    /** Set up */
    const expected = [
      "http://example.net/faq/",
    ];

    /** Call testable function */
    const fourMostFrequentItems = testable.getMostFrequentItems(items);

    /** Assertions */
    expect(fourMostFrequentItems).toStrictEqual(expected);
  });

});

describe('test giveReport', () => {

  /** Set up */
  beforeEach(() => {
    jest.clearAllMocks();
  });
  console.log = jest.fn();

  it('should console log a suggestion if no file path is provided', async () => {
    
    /** Call testable function */
    await giveReport();
    
    /** Assertions */
    expect(console.log.mock.calls[0][0]).toBe("Please provide the path to a log file");
  });

  it('should console log a report of findings from a log file', async () => {
    
    /** Set up */
    /** Note: this data is dependant on the location of the example data */
    const logFilePath = './data/example.log';
    
    /** Call testable function */
    await giveReport(logFilePath);

    /** Assertions */
    /** Note: what is consoled here is dependant on the contents of "./data/example.log" */
    expect(console.log.mock.calls[0][0]).toBe("Reading log file: ./data/example.log ...");
    expect(console.log.mock.calls[1][0]).toBe("There are 11 unique IP addresses.");
    expect(console.log.mock.calls[2][0]).toBe("The top 3 most visited URLs are: /docs/manage-websites/, /, and /asset.css");
    expect(console.log.mock.calls[3][0]).toBe("The top 3 most active IP addresses are: 168.41.191.40, 177.71.128.21, and 50.112.00.11");
  });

});