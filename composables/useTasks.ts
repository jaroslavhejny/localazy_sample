import type {Task, TaskStatus} from "~~/types/types"

export function useTasks() {
    const {data: tasks, pending, error, refresh} = useAsyncData<Task[]>(
        'tasks',
        () => $fetch('/api/tasks')
    )

    const creating = ref(false)

    async function createTask(payload: { title: string; status: TaskStatus }) {
        creating.value = true
        try {
            await $fetch('/api/tasks', {method: 'POST', body: payload})
            await refresh()
        } finally {
            creating.value = false
        }
    }

    return {tasks, pending, error, refresh, creating, createTask}
}
