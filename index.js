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

export const getView = async (event, context) => {
  // TODO implement
  context.succeed({
    response_type: "in_channel",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "음식 종류를 선택해주세요! ⭐️",
          emoji: true,
        },
      },
      {
        type: "divider",
      },
      {
        type: "context",
        elements: [
          {
            type: "plain_text",
            text: "종류를 골라주시면 식당을 추천할거예요",
            emoji: true,
          },
        ],
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "샐러드",
              emoji: true,
            },
            value: "샐러드",
            action_id: "action-샐러드",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "분식",
              emoji: true,
            },
            value: "분식",
            action_id: "action-분식",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "일식",
              emoji: true,
            },
            value: "일식",
            action_id: "action-일식",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "양식",
              emoji: true,
            },
            value: "양식",
            action_id: "action-양식",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "중식",
              emoji: true,
            },
            value: "중식",
            action_id: "action-중식",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "한식",
              emoji: true,
            },
            value: "한식",
            action_id: "action-한식",
          },
        ],
      },
    ],
  });
};
