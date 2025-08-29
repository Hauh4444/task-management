import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Filter, Search, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useTasks, CreateTaskData } from "@/hooks/useTasks";
import TaskItem from "./TaskItem";

const TaskBoard = () => {
  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks();
  
  // Form state - keeping these separate made more sense to me
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('medium');
  
  // Filter and search state
  const [currentFilter, setCurrentFilter] = useState<'all' | 'todo' | 'in-progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const addNewTask = async () => {
    if (!newTaskTitle.trim()) return; // early return feels cleaner
    
    const taskData: CreateTaskData = {
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim() || undefined,
      priority: selectedPriority,
    };
    
    try {
      await createTask(taskData);
      // Reset form
      setNewTaskTitle('');
      setNewTaskDesc('');
      setSelectedPriority('medium');
    } catch (err) {
      // useTasks hook handles the error display
    }
  };

  const handleTaskUpdate = async (taskId: string, changes: any) => {
    try {
      await updateTask(taskId, changes);
    } catch (err) {
      // Error handling is in the hook already
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
    } catch (err) {
      // Hook shows the error message
    }
  };

  // Filter logic - probably could optimize this but it works fine
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = currentFilter === 'all' || task.status === currentFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Quick stats calculation
  const taskStats = {
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Getting your tasks ready...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Task Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Manage your projects efficiently with our modern task board
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 gradient-card border-0 shadow-medium">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">To Do</p>
                <p className="text-3xl font-bold">{taskStats.todo}</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-full">
                <AlertCircle className="h-6 w-6 text-warning" />
              </div>
            </div>
          </Card>

          <Card className="p-6 gradient-card border-0 shadow-medium">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold">{taskStats.inProgress}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 gradient-card border-0 shadow-medium">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Done</p>
                <p className="text-3xl font-bold">{taskStats.completed}</p>
              </div>
              <div className="p-3 bg-success/10 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
            </div>
          </Card>
        </div>

        {/* Task Creation Form */}
        <Card className="p-6 mb-8 shadow-soft">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="What needs to be done?"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
                />
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Add some details... (optional)"
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
                />
              </div>
              <Select value={selectedPriority} onValueChange={(value: 'low' | 'medium' | 'high') => setSelectedPriority(value)}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={addNewTask} className="shrink-0">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search your tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Filter buttons - could make this a component but keeping it simple */}
              <div className="flex gap-1 flex-wrap">
                <Button
                  variant={currentFilter === 'all' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={currentFilter === 'todo' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentFilter('todo')}
                >
                  To Do
                </Button>
                <Button
                  variant={currentFilter === 'in-progress' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentFilter('in-progress')}
                >
                  In Progress
                </Button>
                <Button
                  variant={currentFilter === 'completed' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentFilter('completed')}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card className="p-12 text-center shadow-soft">
              <div className="text-muted-foreground">
                <AlertCircle className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {searchQuery ? "No matching tasks" : "No tasks yet"}
                </h3>
                <p>
                  {searchQuery 
                    ? "Try adjusting your search or filter" 
                    : "Create your first task to get started!"
                  }
                </p>
              </div>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={handleTaskUpdate}
                onDelete={handleTaskDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;