/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

// POST /api/task
export const handleCreateTask = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { title, status, priority, dueDate, ownerId, assigneeId } = req.body;

    // Validate required fields
    if (!title || !status || !priority || !dueDate || !ownerId || !assigneeId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await db.task.create({
      data: {
        title,
        status,
        priority,
        dueDate: new Date(dueDate as Date),
        ownerId,
        assigneeId,
      },
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET /api/task/[taskId]
export const handleGetTask = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const taskId = req.query.taskId as string;

    const task = await db.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT /api/task/[taskId]
export const handleUpdateTask = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const taskId = req.query.taskId as string;
    const { title, status, priority, dueDate, ownerId, assigneeId } = req.body;

    const updatedTask = await db.task.update({
      where: { id: taskId },
      data: {
        title,
        status,
        priority,
        dueDate: new Date(dueDate as Date),
        ownerId,
        assigneeId,
      },
    });

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE /api/task/[taskId]
export const handleDeleteTask = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const taskId = req.query.taskId as string;

    await db.task.delete({
      where: { id: taskId },
    });

    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
