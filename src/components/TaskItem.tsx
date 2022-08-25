import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import editIcon from '../assets/icons/edit/edit.png'
import Icon from "react-native-vector-icons/Feather";
import trashIcon from '../assets/icons/trash/trash.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}
  
interface TasksItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, taskNewTitle: string) => void;
}

export default function TaskItem({ task, toggleTaskDone, removeTask, editTask }: TasksItemProps){

    const [ isEditing, setIsEditing ] = useState(false)
    const [ taskNewTitle, setTaskNewTitle ] = useState(task.title)
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing(){
      setIsEditing(true)
    }

    function handleCancelEditing(){
      setTaskNewTitle(task.title)
      setIsEditing(false)
    }
    
    function handleSubmitEditing(){
      editTask(task.id, taskNewTitle)
      setIsEditing(false)
    }

    useEffect(() => {
      if (textInputRef.current) {
        if (isEditing) {
          textInputRef.current.focus();
        } else {
          textInputRef.current.blur();
        }
      }
    }, [isEditing])

    return (
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <TouchableOpacity
              testID={`button-${task.id}`}
              activeOpacity={0.7}
              style={styles.taskButton}
              onPress={() => toggleTaskDone(task.id)}
            >
              <View 
                testID={`marker-${task.id}`}
                style={!task.done ? styles.taskMarker : styles.taskMarkerDone}
              >
                { task.done && (
                  <Icon 
                    name="check"
                    size={12}
                    color="#FFF"
                  />
                )}
              </View>

              <TextInput
                value={taskNewTitle} 
                onChangeText={setTaskNewTitle}
                editable={isEditing}
                onSubmitEditing={handleSubmitEditing}
                style={task.done ? styles.taskTextDone : styles.taskText}
                ref={textInputRef}
              />
              
            </TouchableOpacity>
          </View>
          
          <View style={styles.iconsContainer}>
            {
              isEditing ? (
                <TouchableOpacity
                  onPress={handleCancelEditing}
                >
                  <Icon 
                    name="x"
                    size={24}
                    color="#b2b2b2"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleStartEditing}
                >
                  <Image source={editIcon} />
                </TouchableOpacity>
              )
            }
            <View style={styles.iconsDivider} />
            <TouchableOpacity
              onPress={() => removeTask(task.id)}
              disabled={isEditing}
            >
              <Image source={trashIcon} style={{ opacity: isEditing ? .3 : 1}} />
            </TouchableOpacity>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 4,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    container: {
      flex: 1,
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between'
    },
    infoContainer:{ 
      flex: 1,
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 12,
      paddingRight: 24
    },
    iconsDivider:{
      width: 1,
      height: 24,
      backgroundColor: '#B2B2B2',
      marginHorizontal: 12
    }
  })