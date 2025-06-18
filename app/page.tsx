"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTaskStore, useDialogStore, useThemeStore } from "@/store/task-store";
import { filterTasks } from "@/lib/utils";
import { Summary } from "@/components/sections/Summary";
import { AppHeader } from "@/components/sections/header/AppHeader";
import { CreateTaskDialog } from "@/components/dialogs/CreateTaskDialog";
import { Card, CardContent } from "@/components/ui/card";
import { TaskFilter } from "@/components/sections/task/TaskFilter";
import { TaskCard } from "@/components/sections/task/TaskCard";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const TaskManager: React.FC = () => {
  const { setTheme } = useTheme();
  const { tasks, loading, count, fetchTasks, loadMoreTask } = useTaskStore();
  const { setThemeStore } = useThemeStore();
  const { isOpen, closeDialog } = useDialogStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredTasks = filterTasks(
    tasks,
    searchTerm,
    filterStatus,
    filterPriority,
    filterCategory
  );

  useEffect(() => {
    fetchTasks();
    const storedTheme = localStorage.getItem("theme") || "light";
    setThemeStore(storedTheme);
    setTheme(storedTheme);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <AppHeader />

        <Summary />

        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <TaskFilter
              searchTerm={searchTerm}
              filterStatus={filterStatus}
              filterPriority={filterPriority}
              filterCategory={filterCategory}
              onSearchChange={setSearchTerm}
              onStatusChange={setFilterStatus}
              onPriorityChange={setFilterPriority}
              onCategoryChange={setFilterCategory}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find what you&apos;re looking for
            </p>
          </div>
        )}
        <CreateTaskDialog open={isOpen} onOpenChange={closeDialog} />
      </div>
      <div className="flex items-center justify-center w-full pb-8">
        {count > tasks.length && <Button onClick={() => loadMoreTask()}>Load More</Button>}
      </div>
    </div>
  );
};

export default TaskManager;
