import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Task, TaskCardProps } from "@/lib/types";
import { TaskBadge } from "./TaskBadge";
import { TaskEditDialog } from "@/components/dialogs/TaskEditDialog";
import { TaskAction } from "@/components/sections/task/TaskAction";
import { useTaskStore } from "@/store/task-store";
import { getDueDateStatus } from "@/lib/utils";

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { updateTask, deleteTask, toggleTaskStatus } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => setIsEditing(true);
  const handleCloseEdit = () => setIsEditing(false);
  const handleSaveEdit = (updatedTask: Task) => updateTask(task.id, updatedTask);
  const handleToggleStatus = () => toggleTaskStatus(task.id);
  const handleDelete = () => deleteTask(task.id);

  const dueDateStatus = getDueDateStatus(task.dueDate);

  return (
    <>
      <Card
        className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 ${
          task.status ? "opacity-75 border-l-green-500" : "border-l-blue-500"
        }`}
      >
        <CardHeader className="lg:px-3">
          <div className="flex items-start justify-between gap-2">
            <TaskBadge task={task} />
            <TaskAction
              task={task}
              onEdit={handleEdit}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
            />
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle
            className={`text-lg mb-2 ${task.status ? "line-through text-muted-foreground" : ""}`}
          >
            {task.title}
          </CardTitle>
          <CardDescription
            className={`mb-4 ${task.status ? "line-through text-muted-foreground" : ""}`}
          >
            {task.description}
          </CardDescription>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span className={`ml-1 text-xs ${dueDateStatus.className}`}>
                {dueDateStatus.text}
              </span>
            </div>
            <Badge variant={task.status ? "default" : "secondary"}>
              {task.status ? "completed" : "pending"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <TaskEditDialog
        task={task}
        isOpen={isEditing}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
      />
    </>
  );
};
