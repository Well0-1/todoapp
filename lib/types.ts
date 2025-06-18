export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: boolean;
  dueDate: string;
  category: "personal" | "work" | "health" | "shopping";
  createdAt: Date;
}

export interface TaskStore {
  tasks: Task[];
  count: number;
  limit: number;
  loading: boolean;
  error: string | null;
  fetchTasks: () => void;
  loadMoreTask: () => void;
  addTask: (task: CreateDialogSchema) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
}

export interface TaskCardProps {
  task: Task;
}

export interface TaskActionsProps {
  task: Task;
  onEdit: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
}

export interface TaskEditDialogProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

export interface TaskFiltersProps {
  searchTerm: string;
  filterStatus: string;
  filterPriority: string;
  filterCategory: string;
  onSearchChange: (term: string) => void;
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: string) => void;
  onCategoryChange: (category: string) => void;
}

export interface CreateDialogSchema {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: boolean;
  dueDate: string;
  category: "personal" | "work" | "health" | "shopping";
}

export interface DialogStore {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export interface ThemeStore {
  theme: string;
  setThemeStore: (theme: string) => void;
}
