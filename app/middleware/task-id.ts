export default defineNuxtRouteMiddleware((to) => {
    const raw = to.params.id
    const id = Array.isArray(raw) ? raw[0] : String(raw)
    // @ts-ignore
    if (!/^\d+$/.test(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid task ID',
            data: { reason: 'Your ID is not valid number', taskId: id },
        })
    }
})