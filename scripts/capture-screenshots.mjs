// scripts/capture-screenshots.mjs
// Captures real screenshots of the running EcoSort Campus app for documentation

import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'http://localhost:3000';
const OUT_DIR = path.join(__dirname, '..', 'docs', 'screenshots');

async function ensureDir(dir) {
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  await ensureDir(OUT_DIR);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1.5 });

  console.log('📸 Capturing homepage...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await wait(1500);
  await page.screenshot({ path: path.join(OUT_DIR, '01_homepage.png'), fullPage: false });
  console.log('  ✓ homepage');

  // Scroll to show bin legend
  await page.evaluate(() => window.scrollTo(0, 250));
  await wait(500);
  await page.screenshot({ path: path.join(OUT_DIR, '02_hero_bins.png'), fullPage: false });
  console.log('  ✓ hero with bins');

  // Trigger classification - PET bottle (blue)
  console.log('📸 Classifying: Crushed PET soft drink bottle...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(300);
  const input = await page.$('input[id="waste-input"]');
  await input.click({ clickCount: 3 });
  await input.type('Crushed PET soft drink bottle');
  await wait(300);
  const btn = await page.$('button[type="submit"]');
  await btn.click();
  await wait(3000);
  await page.evaluate(() => window.scrollTo(0, 500));
  await wait(500);
  await page.screenshot({ path: path.join(OUT_DIR, '03_result_pet_bottle.png'), fullPage: false });
  console.log('  ✓ PET bottle result (blue)');

  // Trigger classification - battery (red/hazardous)
  console.log('📸 Classifying: Electronics lab 9V dead battery...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(300);
  await input.click({ clickCount: 3 });
  await input.type('Electronics lab 9V dead battery');
  await wait(300);
  await btn.click();
  await wait(3000);
  await page.evaluate(() => window.scrollTo(0, 500));
  await wait(500);
  await page.screenshot({ path: path.join(OUT_DIR, '04_result_battery_hazardous.png'), fullPage: false });
  console.log('  ✓ Battery result (red/hazardous)');

  // Trigger classification - broken glass (black)
  console.log('📸 Classifying: Broken glass chemistry beaker...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(300);
  await input.click({ clickCount: 3 });
  await input.type('Broken glass chemistry beaker');
  await wait(300);
  await btn.click();
  await wait(3000);
  await page.evaluate(() => window.scrollTo(0, 500));
  await wait(500);
  await page.screenshot({ path: path.join(OUT_DIR, '05_result_broken_glass_black.png'), fullPage: false });
  console.log('  ✓ Broken glass result (black)');

  // Trigger classification - samosa wrapper (green)
  console.log('📸 Classifying: Oily samosa wrapper...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(300);
  await input.click({ clickCount: 3 });
  await input.type('Oily samosa wrapper');
  await wait(300);
  await btn.click();
  await wait(3000);
  await page.evaluate(() => window.scrollTo(0, 500));
  await wait(500);
  await page.screenshot({ path: path.join(OUT_DIR, '06_result_samosa_green.png'), fullPage: false });
  console.log('  ✓ Samosa wrapper result (green)');

  // Scroll to example items section
  console.log('📸 Capturing example items section...');
  await page.evaluate(() => {
    const el = document.getElementById('examples');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await wait(700);
  await page.screenshot({ path: path.join(OUT_DIR, '07_examples_section.png'), fullPage: false });
  console.log('  ✓ examples section');

  // How it works
  console.log('📸 Capturing How It Works section...');
  await page.evaluate(() => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await wait(700);
  await page.screenshot({ path: path.join(OUT_DIR, '08_how_it_works.png'), fullPage: false });
  console.log('  ✓ how it works');

  // Responsible AI section
  console.log('📸 Capturing Responsible AI section...');
  await page.evaluate(() => {
    const el = document.getElementById('responsible-ai');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await wait(700);
  await page.screenshot({ path: path.join(OUT_DIR, '09_responsible_ai.png'), fullPage: false });
  console.log('  ✓ responsible AI');

  await browser.close();
  console.log('\n✅ All screenshots saved to docs/screenshots/');
}

main().catch(err => {
  console.error('Screenshot capture failed:', err.message);
  process.exit(1);
});
