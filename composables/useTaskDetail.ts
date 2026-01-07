import type {Task, TaskStatus} from "~~/types/types"
import {type ComputedRef, type Ref} from "vue";

type UseTaskDetailOptions = {
    keyPrefix?: string
}

export function useTaskDetail(taskId: Ref<string> | ComputedRef<string>, opts: UseTaskDetailOptions = {}) {
    const keyPrefix = opts.keyPrefix ?? 'task:'
    const key = computed(() => `${keyPrefix}${taskId.value}`)

    const {data: task, pending, error, refresh} = useAsyncData<Task>(
        key,
        () => $fetch(`/api/tasks/${taskId.value}`),
        {watch: [taskId]}
    )

    const title = ref('')
    const status = ref<TaskStatus | ''>('')

    watchEffect(() => {
        if (task.value) {
            title.value = task.value.title
            status.value = task.value.status
        }
    })

    const savingTitle = ref(false)
    const savingStatus = ref(false)

    async function updateTitle(newTitle: string) {
        if (!task.value) return
        savingTitle.value = true
        try {
            await $fetch(`/api/tasks/${taskId.value}`, {
                method: 'PUT',
                body: {title: newTitle},
            })
            task.value.title = newTitle
            await refresh()
        } finally {
            savingTitle.value = false
        }
    }

    async function updateStatus(newStatus: TaskStatus) {
        if (!task.value) return
        savingStatus.value = true
        try {
            await $fetch(`/api/tasks/${taskId.value}`, {
                method: 'PUT',
                body: {status: newStatus},
            })
            task.value.status = newStatus
            await refresh()
        } finally {
            savingStatus.value = false
        }
    }

    watchEffect(() => {
        if (!pending.value && error.value) {
            const e: any = error.value
            const code = e?.statusCode ?? e?.status

            if (code === 404) {
                showError(createError({
                    statusCode: 404,
                    statusMessage: 'Task Not Found',
                    data: {reason: `Task ${taskId.value} was not found`, taskId: taskId.value},
                }))
                return
            }

            showError(error.value)
        }
    })

    return {
        key,
        task,
        pending,
        error,
        refresh,
        title,
        status,
        savingTitle,
        savingStatus,
        updateTitle,
        updateStatus,
    }
}
