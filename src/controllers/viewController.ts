import type { Request, Response } from "express";

export const mainSlackView = async (_: Request, res: Response) => {
  res.json({
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
