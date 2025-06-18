import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PRIORITIES, CATEGORIES } from "./constants";
import { Task } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const matchesSearchTerm = (task: Task, searchTerm: string): boolean => {
  if (!searchTerm) return true;
  const term = searchTerm.toLowerCase();
  return task.title.toLowerCase().includes(term) || task.description.toLowerCase().includes(term);
};

export const matchesStatus = (task: Task, filterStatus: string): boolean => {
  if (filterStatus === "all") return true;
  if (filterStatus === "completed") return task.status === true;
  if (filterStatus === "pending") return task.status === false;
  return true;
};

export const matchesPriority = (task: Task, filterPriority: string): boolean => {
  return filterPriority === "all" || task.priority === filterPriority;
};

export const matchesCategory = (task: Task, filterCategory: string): boolean => {
  return filterCategory === "all" || task.category === filterCategory;
};

export const filterTasks = (
  tasks: Task[],
  searchTerm: string,
  filterStatus: string,
  filterPriority: string,
  filterCategory: string
): Task[] => {
  return tasks.filter((task) => {
    return (
      matchesSearchTerm(task, searchTerm) &&
      matchesStatus(task, filterStatus) &&
      matchesPriority(task, filterPriority) &&
      matchesCategory(task, filterCategory)
    );
  });
};

export function getPriorityConfig(priority: string) {
  return PRIORITIES.find((p) => p.value === priority);
}

export const getCategoryConfig = (category: string) => {
  return CATEGORIES.find((c) => c.value === category);
};

export const calculateDaysLeft = (dueDate: string): number => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getDueDateStatus = (dueDate: string) => {
  const daysLeft = calculateDaysLeft(dueDate);

  if (daysLeft < 0) {
    return { text: "Expired", className: "text-gray-500" };
  }
  if (daysLeft === 0) {
    return { text: "Nearly expired", className: "text-red-500" };
  }
  if (daysLeft < 3) {
    return { text: `${daysLeft} days left`, className: "text-red-500" };
  }
  return { text: `${daysLeft} days left`, className: "text-green-500" };
};
