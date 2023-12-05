/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

// POST /api/user
export const handleCreateUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email) {
      return res.status(400).json({ error: "Username and email are required" });
    }

    const result = await db.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET /api/user/[userId]
export const handleGetUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const userId = req.query.userId as string;

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT /api/user/[userId]
export const handleUpdateUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const userId = req.query.userId as string;
    const { username, email } = req.body;

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { username, email },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE /api/user/[userId]
export const handleDeleteUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const userId = req.query.userId as string;

    await db.user.delete({
      where: { id: userId },
    });

    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
