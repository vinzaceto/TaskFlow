import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onToggleStatus, onDelete, categories }) => {
    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <p>No tasks found. Add a new task to get started!</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleStatus={onToggleStatus}
                    onDelete={onDelete}
                    categories={categories}
                />
            ))}
        </div>
    );
};

export default TaskList;
