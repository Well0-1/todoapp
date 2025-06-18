import { Button } from "@/components/ui/button";
import { Check, Edit2, Trash2 } from "lucide-react";
import { TaskActionsProps } from "@/lib/types";

export const TaskAction: React.FC<TaskActionsProps> = ({
  task,
  onEdit,
  onToggleStatus,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleStatus}
        className={task.status ? "text-green-600" : "text-gray-400"}
        title={task.status ? "Mark as pending" : "Mark as completed"}
      >
        <Check className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onEdit}
        className="text-blue-600"
        title="Edit task"
      >
        <Edit2 className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        className="text-red-600 hover:text-red-700"
        title="Delete task"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};
