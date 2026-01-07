import { getTasks } from '../utils/tasks-store';

export default defineEventHandler(async () => {
  await new Promise(resolve => setTimeout(resolve, 800))
  return getTasks();
});