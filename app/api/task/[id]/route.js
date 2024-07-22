import Task from "@models/task";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const task = await Task.findById(params.id).populate("creator")
        if (!task) return new Response("Task Not Found", { status: 404 });

        return new Response(JSON.stringify(task), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { title, body, priority } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingTask = await Task.findById(params.id);

        if (!existingTask) {
            return new Response("Task not found", { status: 404 });
        }

        // Update the prompt with new data
        existingTask.title = title;
        existingTask.body = body;
        existingTask.priority = priority;

        await existingTask.save();

        return new Response("Successfully updated the task", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Task", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // delte a single doc from mongodb
        await Task.findByIdAndDelete(params.id)
        return new Response("Task deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting task", { status: 500 });
    }
};