/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "~/env";

// POST /api/auth/register
export const handleRegister = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email and password are required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const result = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ userId: result.id }, env.JWT_SECRET, {
      expiresIn: "1d", // Set the expiration time as needed
    });

    // Send the token and user data back to the client
    return res.status(201).json({ token, user: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST /api/auth/login
export const handleLogin = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Find user in the database
    const user = await db.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: "1d", // Set the expiration time as needed
    });

    // Send the token and user data back to the client
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
