import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const taskExists = tasks.find((task) => task.title === newTaskTitle)
    
    if(taskExists){
      Alert.alert('Task já cadastrada','Você não pode cadastrar uma task com o mesmo nome')
      return
    }

    const newTask = {
      id: Number(new Date().getTime()),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldtasks => [ ...oldtasks, newTask ])
  }

  function handleToggleTaskDone(id: number) {
    const taskToDone = tasks.map(task => ({...task}))

    const foundedTask = taskToDone.find(item => item.id === id)

    if(!foundedTask) {
      return
    } else {
      foundedTask.done = !foundedTask.done
    }

    setTasks(taskToDone)
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    const taskToEdit = tasks.map(task => ({...task}))

    const foundedTask = taskToEdit.find(item => item.id === id)

    if(!foundedTask) {
      return
    } else {
      foundedTask.title = taskNewTitle
    }

    setTasks(taskToEdit)
  }
  
  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {text: 'Não', onPress: () => { return }, style: 'cancel'},
        {text: 'Sim', onPress: () => {
          const tasksFind = tasks.filter(task => task.id !== id)
          setTasks(tasksFind)
        }, style: 'destructive'},
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
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