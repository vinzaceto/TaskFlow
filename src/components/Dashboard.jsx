import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import SummaryCard from './SummaryCard';
import Controls from './Controls';
import TaskList from './TaskList';
import { ListTodo, Clock, CheckCircle2, Moon, Sun } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({
    tasks,
    activeFilter,
    setActiveFilter,
    onAddTask,
    onToggleStatus,
    onDelete,
    activeCategory,
    setActiveCategory,
    categories,
    onOpenCategoryModal
}) => {
    // const { theme, toggleTheme } = useAuth(); // No longer needed here

    // Calculate stats
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;

    // Filter tasks based on view
    const filteredTasks = tasks.filter(task => {
        const statusMatch = activeFilter === 'all'
            ? true
            : task.status === activeFilter;

        const categoryMatch = activeCategory === 'All Categories'
            ? true
            : task.category === activeCategory;

        return statusMatch && categoryMatch;
    });

    return (
        <div className="dashboard">
            <header className="app-header">
                <div className="header-content">
                    <div className="logo-wrapper">
                        <ListTodo size={32} color="white" />
                    </div>
                    <div>
                        <h1>TaskFlow</h1>
                        <p>Organize and track your daily tasks</p>
                    </div>
                </div>
            </header>

            <div className="summary-row">
                <SummaryCard
                    title="Total Tasks"
                    count={totalTasks}
                    icon={ListTodo}
                    colorClass="total"
                />
                <SummaryCard
                    title="Pending"
                    count={pendingTasks}
                    icon={Clock}
                    colorClass="pending"
                />
                <SummaryCard
                    title="Completed"
                    count={completedTasks}
                    icon={CheckCircle2}
                    colorClass="completed"
                />
            </div>

            <Controls
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                onAddTask={onAddTask}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                categories={categories}
                onOpenCategoryModal={onOpenCategoryModal}
            />

            <TaskList
                tasks={filteredTasks}
                onToggleStatus={onToggleStatus}
                onDelete={onDelete}
                categories={categories}
            />
        </div>
    );
};

export default Dashboard;
