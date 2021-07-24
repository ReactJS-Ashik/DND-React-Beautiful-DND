import './App.css';
import React from 'react';
import image from "./reactBlog.jpg";

// importing components from another files
import { ListComponents } from "./ListComponent";

// imports related to DND 
import { DragDropContext } from 'react-beautiful-dnd';

function App() {
  // List 1 consisting of all MARVEL super heroes
  const [list1, setList1] = React.useState(['Captain America', 'Iron Man', 'SpiderMan', 'Thor', 'Hulk', 'Black Widow', 'Loki', 'Black Panther', 'Deadpool', 'Doctor Strange', 'Ant Man', 'Captain Marvel'])

  // List 2 consisting of all DC super heroes
  const [list2, setList2] = React.useState(['BatMan', 'SuperMan', 'Wonder Woman', 'Flash', 'Green Lantern', 'AquaMan', 'Robin', 'Cyborg', 'StarFire', 'HawkGirl', 'Shazam'])

  // Function for deleting items from list using index
  const deleteItem = (list, index) => {
    return list.splice(index, 1)
  }

  // Function called when Drag Ends
  const onDragEnd = (result) => {
    // getting the source and destination object
    const { source, destination } = result
    if (!destination)
      return;

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "Marvel_drop_area") {
        let tempList = list1
        const removed = deleteItem(tempList, source.index)
        tempList.splice(destination.index, 0, removed)
        setList1(tempList)
      }
      else {
        let tempList = list2
        const removed = deleteItem(tempList, source.index)
        tempList.splice(destination.index, 0, removed)
        setList2(tempList)
      }
    } else {
      let tempList1 = list1
      let tempList2 = list2
      if (source.droppableId === "Marvel_drop_area") {
        const removed = deleteItem(tempList1, source.index)
        tempList2.splice(destination.index, 0, removed)
        setList1(tempList1)
        setList2(tempList2)
      } else {
        const removed = deleteItem(tempList2, source.index)
        tempList1.splice(destination.index, 0, removed)
        setList1(tempList1)
        setList2(tempList2)
      }


    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <header className="App-header">
          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%', margin: 'auto' }}>
              <img src={image} style={{ width: '100%' }} alt="banner" />
              <h4>Hands on Beautiful-React-DND</h4>
            </div>
            <div style={{ width: '50%' }}>
              <ListComponents Marvel={list1} DC={list2} />
            </div>
          </div>
        </header>
      </div>
    </DragDropContext>
  );
}

export default App;
