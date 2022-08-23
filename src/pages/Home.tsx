import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: Number(new Date().getTime()),
      title: newTaskTitle,
      done: false
    }

    setTasks([ ...tasks, newTask ])
  }

  function handleToggleTaskDone(id: number) {
    console.log('handleToggleTaskDone-id', id)
    const taskToDone = tasks.map(task => ({...task}))

    const foundedTask = taskToDone.find(item => item.id === id)

    if(!foundedTask) {
      return
    } else {
      foundedTask.done = !foundedTask.done
    }

    setTasks(taskToDone)
  }
  
  function handleRemoveTask(id: number) {
    console.log('handleRemoveTask-id', id)
    const tasksFind = tasks.filter(task => task.id !== id)
    setTasks(tasksFind)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})