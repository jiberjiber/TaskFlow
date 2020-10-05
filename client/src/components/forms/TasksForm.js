import React, { useState } from 'react';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styles from './styles.css'

//create Tasks form component
const TasksForm = props => {
  const [taskform, setTaskForm] = useState({
    Task: "",
    Description: "",
    Assigned: "",
    dueDate: ""
  })

  return (
    <div styles={styles} className="forms">
      <Card>
        <CardContent>
          <form>
            <div classname="form-group">
              <label>Main Tasks of Project</label>
              <input type="Scope" classname="form-control" id="Scope" />
            </div>
            <div classname="AddTask">
              <button classname="btn" style={{ backgroundcolor: 'gray' }}>{'{'}AddIcon{'}'}Add Next Task</button>
            </div>
            <button type="submit" classname="btn btn-primary">Submit</button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default TasksForm