const fs = require("fs");
const path = require("path");

const blogDir = "src/content/blog";

// Get all markdown files
const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".md"));

files.forEach((file) => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  // Extract language from filename
  const lang = file.includes(".en.") ? "en" : "es";

  // Extract translation key (filename without language suffix)
  const translationKey = file.replace(/\.(en|es)\.md$/, "");

  // Check if frontmatter already has lang and translationKey
  if (content.includes("lang:") && content.includes("translationKey:")) {
    console.log(`Skipping ${file} - already has lang and translationKey`);
    return;
  }

  // Find the end of frontmatter (---)
  const frontmatterEnd = content.indexOf("---", 3);
  if (frontmatterEnd === -1) {
    console.log(`Skipping ${file} - no frontmatter found`);
    return;
  }

  // Insert lang and translationKey before the closing ---
  const beforeClosing = content.substring(0, frontmatterEnd);
  const afterClosing = content.substring(frontmatterEnd);

  const newContent =
    beforeClosing +
    `lang: "${lang}"\ntranslationKey: "${translationKey}"\n` +
    afterClosing;

  fs.writeFileSync(filePath, newContent);
  console.log(
    `Updated ${file} with lang: ${lang}, translationKey: ${translationKey}`
  );
});

console.log("Frontmatter update complete!");
