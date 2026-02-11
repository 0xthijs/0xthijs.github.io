import asyncio
import logging
from scraper import JobScraper
from analyzer import JobAnalyzer
from reporter import JobReporter
from dotenv import load_dotenv
import os

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

async def main():
    # Load environment variables
    load_dotenv()
    
    # 1. Scrape Jobs
    logging.info("Starting job scrape...")
    scraper = JobScraper()
    jobs = await scraper.scrape()
    logging.info(f"Scraped {len(jobs)} jobs.")

    if not jobs:
        logging.warning("No jobs found. Exiting.")
        return

    # 2. Analyze Jobs with Gemini
    logging.info("Starting analysis...")
    analyzer = JobAnalyzer()
    analyzed_jobs = await analyzer.analyze_jobs(jobs)
    logging.info("Analysis complete.")

    # 3. Generate Report
    logging.info("Generating report...")
    reporter = JobReporter()
    reporter.generate_report(analyzed_jobs)
    logging.info("Report generation complete.")

if __name__ == "__main__":
    asyncio.run(main())
