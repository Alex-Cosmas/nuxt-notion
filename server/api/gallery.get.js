// const test_data = [
//   {
//     id: 1,
//     name: "item1",
//   },
//   {
//     id: 2,
//     name: "item2",
//   },
//   {
//     id: 3,
//     name: "item3",
//   },
// ];

// export default defineEventHandler(() => test_data);

import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const image_database_id = process.env.NOTION_DATABASE_ID;

let payload = [];

async function getImages() {
  const data = await notion.databases.query({
    database_id: image_database_id,
  });
  return data;
}

getImages().then((data) => {
  payload = data.results;
});

function getUrls(results) {
  let urls = [];
  results.forEach((result) => {
    urls.push(result.properties.file.files[0].file.url);
  });
  return urls;
}

export default defineEventHandler(() => getUrls(payload));
