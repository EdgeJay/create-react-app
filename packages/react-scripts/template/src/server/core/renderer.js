import fs from 'fs';
import path from 'path';

const htmlTemplatePath = path.resolve(__dirname, '../../../public/index.html');

function getHtmlTemplate(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, template) => {
      if (err) {
        reject(err);
      } else {
        resolve(template);
      }
    });
  });
}

export function createHtmlContent({ htmlTemplate, mountContent }) {
  htmlTemplate = htmlTemplate.replace(
    '<div id="root"></div>',
    `<div id="root">${mountContent}</div>`
  );
  return htmlTemplate;
}

export default async ctx => {
  const template = await getHtmlTemplate(htmlTemplatePath);
  return template;
};
