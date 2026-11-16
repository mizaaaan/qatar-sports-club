import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT_DIR = path.resolve("./screenshots");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  console.log("Launching Edge browser...");
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });

  const routes = [
    { name: "01_home_desktop", url: "http://localhost:3002/", width: 1440, height: 900 },
    { name: "02_management_home", url: "http://localhost:3002/management", width: 1440, height: 900 },
    { name: "03_leadership_dir", url: "http://localhost:3002/management/leadership", width: 1440, height: 900 },
    { name: "04_org_chart", url: "http://localhost:3002/management/org-chart", width: 1440, height: 900 },
    { name: "05_portal_dashboard", url: "http://localhost:3002/portal", width: 1440, height: 900 },
    { name: "06_workflow_detail", url: "http://localhost:3002/portal/applications/app-1001", width: 1440, height: 900 },
    { name: "07_signature_studio", url: "http://localhost:3002/portal/signatures/sig-501", width: 1440, height: 900 },
    { name: "08_portal_mobile", url: "http://localhost:3002/portal", width: 390, height: 844 },
    { name: "09_management_tablet", url: "http://localhost:3002/management", width: 768, height: 1024 },
  ];

  for (const item of routes) {
    console.log(`Capturing ${item.name}...`);
    const page = await browser.newPage({
      viewport: { width: item.width, height: item.height },
    });
    await page.goto(item.url, { waitUntil: "networkidle", timeout: 15000 });
    await page.waitForTimeout(500);
    const filePath = path.join(OUT_DIR, `${item.name}.png`);
    await page.screenshot({ path: filePath, fullPage: false });
    await page.close();
  }

  // Also capture Arabic RTL mode for Management and Portal
  console.log("Capturing Arabic RTL mode...");
  const pageAr = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  await pageAr.goto("http://localhost:3002/management", { waitUntil: "networkidle" });
  await pageAr.evaluate(() => {
    localStorage.setItem("qsc_lang", "ar");
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
    window.location.reload();
  });
  await pageAr.waitForTimeout(1000);
  await pageAr.screenshot({ path: path.join(OUT_DIR, "10_management_arabic_rtl.png") });

  await pageAr.goto("http://localhost:3002/portal", { waitUntil: "networkidle" });
  await pageAr.waitForTimeout(1000);
  await pageAr.screenshot({ path: path.join(OUT_DIR, "11_portal_arabic_rtl.png") });
  await pageAr.close();

  await browser.close();
  console.log("All screenshots captured in ./screenshots/");
}

run().catch((err) => {
  console.error("Screenshot error:", err);
  process.exit(1);
});
