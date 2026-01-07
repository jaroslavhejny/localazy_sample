import {readBody, createError} from 'h3';
import {createTask} from '../utils/tasks-store';
import {TASK_STATUSES, type TaskStatus} from "~~/types/types";
import { wait } from "./tasks/[id].put"

export default defineEventHandler(async (event) => {
    const body = await readBody<{
        title?: string;
    }>(event);

    const patch: { title?: string; status?: TaskStatus } = {};

    if (typeof body.title === 'string') {
        patch.title = body.title;
    }
    patch.status = TASK_STATUSES[0];

    const newTasks = await createTask(patch as never);
    if (!newTasks) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Task not found',
        });
    }
    await wait(2000);

    return newTasks;
});