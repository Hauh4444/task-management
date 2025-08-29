import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Calendar,
  Flag
} from "lucide-react";
import { Task } from "@/hooks/useTasks";

interface TaskItemProps {
  task: Task;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem = ({ task, onUpdate, onDelete }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState(task.priority);

  const toggleTaskStatus = () => {
    if (task.status === 'completed') {
      onUpdate(task.id, { status: 'todo' });
    } else if (task.status === 'todo') {
      onUpdate(task.id, { status: 'in-progress' });
    } else {
      onUpdate(task.id, { status: 'completed' });
    }
  };

  const saveChanges = () => {
    onUpdate(task.id, {
      title: editTitle.trim(),
      description: editDesc.trim(),
      priority: editPriority,
    });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditTitle(task.title);
    setEditDesc(task.description || '');
    setEditPriority(task.priority);
    setIsEditing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/10 text-destructive';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'low':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-primary" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (task.status) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'in-progress':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className={`p-6 shadow-soft transition-smooth hover:shadow-medium ${
      task.status === 'completed' ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start gap-4">
        {/* Status Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTaskStatus}
          className="shrink-0 mt-1"
        >
          {getStatusIcon()}
        </Button>

        {/* Content */}
        <div className="flex-1 space-y-3">
          {isEditing ? (
            // Edit Mode
            <>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="font-semibold"
                placeholder="Task title"
              />
              <Textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="Task description"
                rows={3}
              />
              <Select value={editPriority} onValueChange={(value: 'low' | 'medium' | 'high') => setEditPriority(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button size="sm" onClick={saveChanges}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={cancelEdit}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            // View Mode
            <>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-lg font-semibold ${
                    task.status === 'completed' ? 'line-through text-muted-foreground' : ''
                  }`}>
                    {task.title}
                  </h3>
                  <p className="text-muted-foreground mt-1">{task.description || 'No description'}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(task.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className={getStatusColor()}>
                  {task.status.replace('-', ' ')}
                </Badge>
                
                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                  <Flag className="h-3 w-3 mr-1" />
                  {task.priority}
                </Badge>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(task.created_at).toLocaleDateString()}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TaskItem;