import { create } from "zustand";
import { TaskStore, DialogStore, ThemeStore } from "@/lib/types";
import { apiHandler, getApi } from "@/lib/handlers/api";

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  count: 0,
  loading: false,
  limit: 12,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const limit = get().limit;
      const res = await getApi(`/task?limit=${limit}`);
      set({ tasks: res.data });
      set({ count: res.total });
    } catch (error) {
      set({ error: "Failed to fetch tasks" });
    } finally {
      set({ loading: false });
    }
  },

  loadMoreTask: async () => {
    set({ loading: true, error: null });
    try {
      const { limit } = get();
      const res = await getApi(`/task?limit=${limit + 12}&offset=${get().tasks.length}`);
      set({ limit: limit + 12 });
      set((state) => ({
        tasks: [...state.tasks, ...res.data],
      }));
    } catch (error) {
      set({ error: "Failed to load more tasks" });
    } finally {
      set({ loading: false });
    }
  },

  addTask: async (task) => {
    const prevTasks = get().tasks;

    try {
      const res = await apiHandler("/task/create", task, "POST");
      if (res.status == 201) {
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: res.insertedId, createdAt: new Date() }],
        }));
      }
    } catch (err) {
      console.error("Error While Creating a task", err);
      set({ tasks: prevTasks });
    }
  },

  updateTask: async (id, updatedTask) => {
    try {
      const res = await apiHandler(`/task/update/${id}`, updatedTask, "PUT");
      if (res.status == 201) {
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)),
        }));
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  },

  deleteTask: async (id) => {
    try {
      const res = await apiHandler(`/task/delete/${id}`, null, "DELETE");
      if (res.status == 201) {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  },

  toggleTaskStatus: async (id) => {
    const prevTasks = get().tasks;
    const task = prevTasks.find((t) => t.id === id);
    if (!task) return;

    const newStatus = !task.status;

    set({
      tasks: prevTasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)),
    });

    try {
      await apiHandler(`/task/update/${id}`, { status: newStatus }, "PUT");
    } catch (error) {
      console.error("Failed to toggle status:", error);
      set({ tasks: prevTasks });
    }
  },
}));

export const useDialogStore = create<DialogStore>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}));

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "light",
  setThemeStore: (theme: string) => set({ theme }),
}));
