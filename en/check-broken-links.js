/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const markdownLinkCheck = require('markdown-link-check');
const fs = require('fs');
const puppeteer = require('puppeteer');
const config = require('./check-broken-links-config.json');

const logFile = 'broken-links-log.txt';
const ignoredLinkPatterns = config.ignorePatterns.map(pattern => new RegExp(pattern));
const startUrl = config.liveUrl; // Live URL from config
const visitedUrls = new Set(); // Set to track visited URLs
const baseDomain = new URL(startUrl).hostname; // Get the base domain for comparison

let brokenLinksCount = 0; // Counter for broken links
let localLinksCount = 0; // Counter for local links
let externalLinksCount = 0; // Counter for external links
let isShuttingDown = false; // Flag to indicate shutdown
let spinner; // Spinner for loader

// Prepare the broken-links-log.txt file (wipes content on new run)
fs.writeFileSync(logFile, 'Broken Links Report\n====================\n\n');

// Function to check if a link should be ignored based on the patterns
function shouldIgnore(link) {
  return ignoredLinkPatterns.some(pattern => pattern.test(link));
}

// Function to log broken links
function logBrokenLink(link, sourceUrl) {
  brokenLinksCount++;
  const logEntry = `Broken Link Found on: ${sourceUrl}\nLink: ${link}\n\n`;
  fs.appendFileSync(logFile, logEntry);
}

// Function to check links on a page and crawl nested links
async function checkLinksOnPage(url, depth = 2) {
  if (isShuttingDown || depth < 0 || visitedUrls.has(url)) return; // Stop if shutting down, depth limit reached, or already visited

  visitedUrls.add(url); // Mark the URL as visited

  return new Promise((resolve) => {
    // Use Puppeteer to get links from the page
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      try {
        spinner.text = `Visiting: ${url}`;
        await page.goto(url, { waitUntil: 'networkidle2' });
        const linksWithInfo = await page.evaluate(() => {
          const anchorTags = Array.from(document.querySelectorAll('a'));
          return anchorTags.map(tag => tag.href).filter(link => link.startsWith('http'));
        });

        // Check each link
        for (const link of linksWithInfo) {
          if (shouldIgnore(link)) {
            continue; // Skip ignored links
          }

          // Check if the link is in the same domain
          const linkDomain = new URL(link).hostname;

          // Increment local or external link count
          if (linkDomain === baseDomain) {
            localLinksCount++;
          } else {
            externalLinksCount++;
          }

          // Check the link status
          markdownLinkCheck(link, { retry: true }, (err, results) => {
            if (err) {
              console.error(`Error checking ${link}:`, err);
              return;
            }

            results.forEach(result => {
              const { dead, statusCode } = result;

              if (dead || statusCode === 404) {
                logBrokenLink(link, url);
                console.log(`\n[Broken Link] Found: ${link}\n`);
              }
            });
          });

          // Recursively check nested links if they are in the same domain
          if (linkDomain === baseDomain) {
            await checkLinksOnPage(link, depth - 1);
          }
        }
      } catch (error) {
        console.error(`Error visiting ${url}:`, error);
      } finally {
        await browser.close(); // Ensure the browser is closed

        resolve();
      }
    })();
  });
}

// Function to handle termination
const handleExit = () => {
  isShuttingDown = true; // Set shutdown flag
  spinner.stop(); // Stop the spinner

  console.log(`Total Broken Links Found: ${brokenLinksCount}`);
  console.log(`Total Local Links Scanned: ${localLinksCount}`);
  console.log(`Total External Links Scanned: ${externalLinksCount}`);

  fs.appendFileSync(logFile, `\nTotal Broken Links: ${brokenLinksCount}\n`);
  fs.appendFileSync(logFile, `Total Local Links Scanned: ${localLinksCount}\n`);
  fs.appendFileSync(logFile, `Total External Links Scanned: ${externalLinksCount}\n`);

  process.exit(); // Exit the process
};

// Main function to start checking links
(async () => {
  // Handle SIGINT (Ctrl + C)
  process.on('SIGINT', handleExit);
  
  // Dynamic import of ora
  const ora = (await import('ora')).default;
  spinner = ora('Checking links...').start(); // Start the spinner

  try {
    await checkLinksOnPage(startUrl); // Start checking links
  } catch (error) {
    console.error('Error during link checking:', error);
  }

  spinner.succeed('Link checking complete!'); // Stop the spinner

  console.log(`Total Broken Links: ${brokenLinksCount}`);
  console.log(`Total Local Links Scanned: ${localLinksCount}`);
  console.log(`Total External Links Scanned: ${externalLinksCount}`);

  fs.appendFileSync(logFile, `\nTotal Broken Links: ${brokenLinksCount}\n`);
  fs.appendFileSync(logFile, `Total Local Links Scanned: ${localLinksCount}\n`);
  fs.appendFileSync(logFile, `Total External Links Scanned: ${externalLinksCount}\n`);
})();
