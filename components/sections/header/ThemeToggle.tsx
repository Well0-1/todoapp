import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/store/task-store";
import { useTheme } from "next-themes";

export const ThemeToggle: React.FC = () => {
  const { theme, setThemeStore } = useThemeStore();
  const { setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    setThemeStore(nextTheme);
    setTheme(nextTheme);
  };

  return (
    <Button variant="outline" size="sm" onClick={toggleTheme} className="gap-2">
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      {isDark ? "Light" : "Dark"}
    </Button>
  );
};
