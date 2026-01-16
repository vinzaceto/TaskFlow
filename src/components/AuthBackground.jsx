import React, { useMemo } from 'react';
import { Calendar, Check, Trash2 } from 'lucide-react';
import './AuthBackground.css';

const PREDEFINED_TASKS = [
    { title: "Review Q1 goals", category: "Work", color: "#3B82F6", status: "completed" },
    { title: "Buy groceries for dinner", category: "Shopping", color: "#F59E0B", status: "pending" },
    { title: "Morning yoga session", category: "Health", color: "#EF4444", status: "completed" },
    { title: "Call mom", category: "Personal", color: "#10B981", status: "pending" },
    { title: "Update project roadmap", category: "Work", color: "#3B82F6", status: "pending" },
    { title: "Schedule dentist appointment", category: "Health", color: "#EF4444", status: "pending" },
    { title: "Read 30 pages", category: "Personal", color: "#10B981", status: "completed" },
    { title: "Team sync meeting", category: "Work", color: "#3B82F6", status: "pending" },
    { title: "Pay utility bills", category: "Personal", color: "#10B981", status: "completed" },
    { title: "Order new headphones", category: "Shopping", color: "#F59E0B", status: "pending" },
    { title: "Write weekly report", category: "Work", color: "#3B82F6", status: "completed" },
    { title: "Gym workout", category: "Health", color: "#EF4444", status: "pending" },
    { title: "Plan weekend trip", category: "Personal", color: "#10B981", status: "pending" },
    { title: "Reply to emails", category: "Work", color: "#3B82F6", status: "completed" },
    { title: "Pick up dry cleaning", category: "Shopping", color: "#F59E0B", status: "pending" },
    { title: "Meditation", category: "Health", color: "#EF4444", status: "completed" },
    { title: "Fix website header", category: "Work", color: "#3B82F6", status: "pending" },
    { title: "Buy birthday gift", category: "Shopping", color: "#F59E0B", status: "pending" }
];

// Duplicate tasks to ensure full coverage
const FAKE_TASKS = [...PREDEFINED_TASKS, ...PREDEFINED_TASKS, ...PREDEFINED_TASKS];

const AuthBackground = () => {
    // Randomize slightly for "natural" look on each refresh or just keep static order
    // Keeping static for performance and consistency

    return (
        <div className="auth-background">
            <div className="auth-background-grid">
                {FAKE_TASKS.map((task, index) => (
                    <div
                        key={index}
                        className={`fake-task-card ${task.status === 'completed' ? 'completed' : ''}`}
                        style={{ borderLeftColor: task.color }}
                    >
                        <div className="fake-task-check">
                            <div className={`fake-check-circle ${task.status === 'completed' ? 'checked' : ''}`}>
                                {task.status === 'completed' && <Check size={10} strokeWidth={4} color="white" />}
                            </div>
                        </div>
                        <div className="fake-task-content">
                            <div className="fake-task-header">
                                <span className="fake-task-title">{task.title}</span>
                            </div>
                            <div className="fake-task-meta">
                                <span
                                    className="fake-task-tag"
                                    style={{ backgroundColor: task.color }}
                                >
                                    {task.category}
                                </span>
                                <div className="fake-task-date">
                                    <Calendar size={10} className="text-gray-400" />
                                </div>
                            </div>
                        </div>
                        <div className="fake-task-actions">
                            <Trash2 size={14} className="text-gray-300" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Overlay to dim the background and make form legible */}
            <div className="auth-background-overlay"></div>
        </div>
    );
};

export default AuthBackground;
