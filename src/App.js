import React, { Component } from 'react';
import './App.css';
import initialData from './initial_data';
import Column from './Column';
import {DragDropContext} from 'react-beautiful-dnd';

class App extends Component {
  state = initialData
  onDragEnd = (result)=>{
    const { source, destination, draggableId} = result;
    if(!destination){
      return;
    }
    if(source.droppableId === destination.droppableId && source.index === destination.index){
      return;
    }
    const column = this.state.columns[source.droppableId];
    const newTasksIds = Array.from(column.taskIds);
    newTasksIds.splice(source.index,1);
    newTasksIds.splice(destination.index,0,draggableId);
    const newColumn = {...column ,taskIds:newTasksIds};
    const newState = {
      ...this.state,
      columns : {
        ...this.state.columns,
        [newColumn.id] : newColumn
      }
    };
    this.setState(newState);

  }
  render() {
    return (
      <DragDropContext onDragEnd = {this.onDragEnd}>{
        this.state.columnOrder.map(columnId =>{
          const column = this.state.columns[columnId];
          const tasks= column.taskIds.map(taskId =>this.state.tasks[taskId]);

          return <Column key = {column.id} column = {column} tasks ={tasks} />;
        })}
      </DragDropContext>
        
    );
  }
}

export default App;
