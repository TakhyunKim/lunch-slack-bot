import { config } from "dotenv";
import { Client } from "@notionhq/client";

config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Create a new entry
export const addItem = async (text, category) => {
  try {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        name: {
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
        category: {
          select: {
            name: category,
          },
        },
      },
    });
    console.log(response);
    console.log("Success! Entry added.");
  } catch (error) {
    console.error(error.body);
  }
};

export const getItems = async (category) => {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [{ property: "category", select: { equals: category } }],
      },
    });

    const filteredCategoryList = response.results.map((result) => ({
      name: result.properties["name"].title[0].text.content,
      category: result.properties["category"].select.name,
    }));
    const randomIndex = Math.floor(Math.random() * filteredCategoryList.length);
    console.log(filteredCategoryList[randomIndex]);
  } catch (error) {
    console.error(error.body);
  }
};

getItems("한식");
