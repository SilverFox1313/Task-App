import Task from '@models/task'
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, title, body, priority } = await request.json();

    try {
        await connectToDB();
        const newTask = new Task({ creator: userId, title, body, priority });

        await newTask.save();
        return new Response(JSON.stringify(newTask), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new task", { status: 500 });
    }
}