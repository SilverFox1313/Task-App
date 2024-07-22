import Task from "@models/task";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const tasks = await Task.find({ creator: params.id }).populate("creator").sort({createdAt: -1})

        return new Response(JSON.stringify(tasks), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 