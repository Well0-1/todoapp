import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDialogStore } from "@/store/task-store";
import { Search, Plus } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { TaskFiltersProps } from "@/lib/types";

export const TaskFilter: React.FC<TaskFiltersProps> = ({
  searchTerm,
  filterStatus,
  filterPriority,
  filterCategory,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onCategoryChange,
}) => {
  const { openDialog } = useDialogStore();
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
      <div className="grid md:flex gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex gap-2">
          <Select value={filterStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={onPriorityChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={() => openDialog()}
            className="shadow-md hover:shadow-lg transition-shadow"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </Button>
        </div>
      </div>
    </div>
  );
};
