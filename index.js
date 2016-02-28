import request from 'request';
import instapromise from 'instapromise';
import websiteScraper from 'website-scraper';

let count = 0;
let failures = 0;
let url = 'http://opt412.getforge.io/';

async function hitOpt412WebsiteAsync() {

  try {
    let result = await websiteScraper.promise.scrape({
      urls: [url],
      directory: '/tmp/hit412-tmp/' + Math.random() + '/',
    });
  } catch (e) {
    failures++;
    console.error("Failure " + failures + " : " + e);
    return null;
  }
  // let result = await request.promise.get(url);
  count += 1;
  console.log("Hit opt412.org " + count + " times");
  return result;
}

async function hitNTimesAsync(n) {
  let awaitables = [];
  console.log("Going to hit the website " + n + " times");
  for (let i = 0; i < n; i++) {
    awaitables.push(hitOpt412WebsiteAsync());
  }
  return await Promise.all(awaitables);
}

hitNTimesAsync(1000).then(() => {
  console.log("Completed " + count + " hits");
}, console.error);
