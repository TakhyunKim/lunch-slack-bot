import { Client } from "@notionhq/client";

import type { Request } from "express";

export const addStore = async (req: Request) => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || "";

  const { name, category } = req.body;

  try {
    await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        name: {
          title: [
            {
              text: {
                content: name,
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

    console.log("Success! Entry added.");
  } catch (error) {
    console.error("server error");
  }
};
