import asyncio
from playwright.async_api import async_playwright
import json
import logging
from urllib.parse import urljoin

class JobScraper:
    def __init__(self, sources_file='sources.json'):
        with open(sources_file, 'r') as f:
            self.config = json.load(f)
        self.jobs = []

    async def scrape(self):
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()

            for source in self.config['sources']:
                url = source['url']
                logging.info(f"Scraping {url}...")
                try:
                    await page.goto(url, wait_until='networkidle', timeout=60000)
                    
                    # Specific logic for euremotejobs
                    if "euremotejobs.com" in url:
                        job_cards = await page.locator('a.job-card-link').all()
                    else:
                        # Fallback for other sites
                        job_cards = await page.locator('.job_listing, .job-listing, article.job, div.card').all()
                    
                    if not job_cards:
                        logging.warning(f"No job cards found on {url} with selectors.")
                        continue

                    for card in job_cards:
                        try:
                            # Selectors for euremotejobs
                            if "euremotejobs.com" in url:
                                title_el = card.locator('h2.job-title').first
                                company_el = card.locator('div.company-name').first
                                # Link is the card itself
                                link_el = card
                                location_el = card.locator('.job-meta .meta-item').first # Approximate
                            else:
                                title_el = card.locator('h3, h2, .job-title, .title').first
                                company_el = card.locator('.company, .employer, .job-company').first
                                location_el = card.locator('.location, .job-location').first
                                link_el = card.locator('a').first
                            
                            if await title_el.count() > 0:
                                title = await title_el.inner_text()
                            else:
                                title = "Unknown Title"
                                
                            if await company_el.count() > 0:
                                company = await company_el.inner_text()
                            else:
                                company = "Unknown Company"
                                
                            if "euremotejobs.com" in url:
                                raw_link = await link_el.get_attribute('href')
                                link = urljoin(url, raw_link)
                            elif await link_el.count() > 0:
                                raw_link = await link_el.get_attribute('href')
                                link = urljoin(url, raw_link)
                            else:
                                link = url
                            
                            # Extract salary if available (often not clean, checking text)
                            text_content = await card.inner_text()
                            
                            self.jobs.append({
                                'title': title.strip(),
                                'company': company.strip(),
                                'link': link,
                                'source': source['name'],
                                'raw_text': text_content # for Gemini analysis
                            })
                        except Exception as e:
                            logging.error(f"Error extracting job card: {e}")
                            continue
                            
                except Exception as e:
                    logging.error(f"Failed to scrape {url}: {e}")

            await browser.close()
        return self.jobs

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    scraper = JobScraper()
    jobs = asyncio.run(scraper.scrape())
    print(json.dumps(jobs, indent=2))
