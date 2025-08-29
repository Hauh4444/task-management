import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'
import { toast } from 'sonner'

export interface Task {
  id: string
  title: string
  description: string | null
  status: 'todo' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  user_id: string
  created_at: string
  updated_at: string
}

export interface CreateTaskData {
  title: string
  description?: string
  priority?: 'low' | 'medium' | 'high'
}

export interface UpdateTaskData {
  title?: string
  description?: string
  status?: 'todo' | 'in-progress' | 'completed'
  priority?: 'low' | 'medium' | 'high'
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  // Load user's tasks
  const loadTasks = async () => {
    if (!user) {
      setTasks([])
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      toast.error('Could not load your tasks')
    } finally {
      setIsLoading(false)
    }
  }

  // Add a new task
  const createNewTask = async (taskData: CreateTaskData) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          title: taskData.title,
          description: taskData.description || null,
          priority: taskData.priority || 'medium',
          user_id: user.id,
        })
        .select()
        .single()

      if (error) throw error
      setTasks(prev => [data, ...prev])
      toast.success('Task added!')
      return data
    } catch (error) {
      toast.error('Could not create task')
      throw error
    }
  }

  // Update existing task
  const updateExistingTask = async (taskId: string, updates: UpdateTaskData) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, ...data } : task
      ))
      toast.success('Task updated')
      return data
    } catch (error) {
      toast.error('Could not update task')
      throw error
    }
  }

  // Remove task permanently
  const removeTask = async (taskId: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
        .eq('user_id', user.id)

      if (error) throw error
      setTasks(prev => prev.filter(task => task.id !== taskId))
      toast.success('Task deleted')
    } catch (error) {
      toast.error('Could not delete task')
      throw error
    }
  }

  useEffect(() => {
    loadTasks()
  }, [user])

  // Real-time updates - this is pretty cool!
  useEffect(() => {
    if (!user) return

    const subscription = supabase
      .channel('task_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          // Refetch when something changes
          loadTasks()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  return {
    tasks,
    loading: isLoading,
    createTask: createNewTask,
    updateTask: updateExistingTask,
    deleteTask: removeTask,
    refetch: loadTasks,
  }
}