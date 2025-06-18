import { Badge } from "@/components/ui/badge";
import { Task } from "@/lib/types";
import { getPriorityConfig, getCategoryConfig } from "@/lib/utils";

export const TaskBadge: React.FC<{ task: Task }> = ({ task }) => {
  const priorityConfig = getPriorityConfig(task.priority);
  const categoryConfig = getCategoryConfig(task.category);

  return (
    <div className="flex gap-2 flex-wrap">
      <Badge variant={priorityConfig?.variant || "default"}>{priorityConfig?.label}</Badge>
      <Badge variant={categoryConfig?.variant || "default"}>{categoryConfig?.label}</Badge>
    </div>
  );
};
