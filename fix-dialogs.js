import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

let count = 0;
walk('./src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Only replace lowercase </dialog> as it's almost certainly a typo from a previous script
    if (content.includes('</dialog>')) {
      // In command.tsx, there's </Dialog> which is valid, but </dialog> is invalid
      let newContent = content.replace(/<\/dialog>/g, '</div>');
      fs.writeFileSync(filePath, newContent, 'utf8');
      count++;
      console.log(`Fixed ${filePath}`);
    }
  }
});
console.log(`Fixed ${count} files.`);
