import React from 'react';
import { Calendar, Trash2, Check, CheckCircle2, Circle } from 'lucide-react';
import './TaskItem.css';

const TaskItem = ({ task, onToggleStatus, onDelete, categories = [] }) => {
    const isCompleted = task.status === 'completed';

    // Find category to get color
    const categoryData = categories.find(c => c.name === task.category);
    // Default to gray if not found (deleted category)
    const categoryColor = categoryData ? categoryData.color : '#9CA3AF';

    return (
        <div
            className={`task-item ${isCompleted ? 'completed' : ''}`}
            style={{ borderLeftColor: categoryColor }}
        >
            <div className="task-left">
                <button
                    className={`check-btn ${isCompleted ? 'checked' : ''}`}
                    onClick={() => onToggleStatus(task.id)}
                >
                    {isCompleted ? <Check size={14} strokeWidth={3} /> : null}
                </button>

                <div className="task-content">
                    <div className="task-header">
                        <h3 className="task-title">{task.title}</h3>
                        {task.category && (
                            <span
                                className="category-tag"
                                style={{ backgroundColor: categoryColor }}
                            >
                                {task.category}
                            </span>
                        )}
                    </div>

                    <p className="task-description">{task.description}</p>

                    <div className="task-meta">
                        <div className="due-date">
                            <Calendar size={14} />
                            <span>Due: {task.dueDate}</span>
                        </div>
                    </div>
                </div>
            </div>

            <button className="delete-btn" onClick={() => onDelete(task.id)}>
                <Trash2 size={18} />
            </button>
        </div>
    );
};

export default TaskItem;
