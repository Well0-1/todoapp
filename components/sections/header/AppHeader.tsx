import { ThemeToggle } from "./ThemeToggle";

export const AppHeader: React.FC = () => (
  <div className="flex flex-col text-center mb-8">
    <div className="flex justify-end p-2 h-fit">
      <ThemeToggle />
    </div>
    <div className="flex flex-col justify-center items-center mb-4">
      <h1 className="text-4xl font-bold text-foreground">Task Manager</h1>
      <p className="text-muted-foreground text-lg">
        Organize your tasks efficiently and stay productive
      </p>
    </div>
  </div>
);
