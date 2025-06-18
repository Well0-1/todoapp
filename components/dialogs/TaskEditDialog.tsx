import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Task, TaskEditDialogProps } from "@/lib/types";
import { PRIORITIES, CATEGORIES } from "@/lib/constants";
import { Textarea } from "../ui/textarea";

export const TaskEditDialog: React.FC<TaskEditDialogProps> = ({
  task,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editForm, setEditForm] = useState(task);

  useEffect(() => {
    setEditForm(task);
  }, [task]);

  const handleSave = () => {
    onSave(editForm);
    onClose();
  };

  const handleFieldChange = (field: keyof Task, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={editForm.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              placeholder="Enter task title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editForm.description}
              className="max-h-40"
              onChange={(e) => handleFieldChange("description", e.target.value)}
              placeholder="Enter task description"
            />
          </div>
          <div className="flex gap-4 w-full">
            <div className="space-y-2 w-1/2">
              <Label>Priority</Label>
              <Select
                value={editForm.priority}
                onValueChange={(value) => handleFieldChange("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 w-1/2">
              <Label>Category</Label>
              <Select
                value={editForm.category}
                onValueChange={(value) => handleFieldChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="space-y-2 md:w-1/2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                className="w-full"
                type="date"
                value={editForm.dueDate}
                onChange={(e) => handleFieldChange("dueDate", e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
