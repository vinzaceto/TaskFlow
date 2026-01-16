import React from 'react';
import { Settings, Plus } from 'lucide-react';
import './Controls.css';

const Controls = ({
    activeFilter,
    setActiveFilter,
    onAddTask,
    activeCategory,
    setActiveCategory,
    categories = [], // Default to empty array to prevent crash
    onOpenCategoryModal
}) => {
    return (
        <div className="controls-container">
            <div className="filter-tabs">
                <button
                    className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('all')}
                >
                    All
                </button>
                <button
                    className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('pending')}
                >
                    Pending
                </button>
                <button
                    className={`filter-tab ${activeFilter === 'completed' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('completed')}
                >
                    Completed
                </button>
            </div>

            <div className="controls-right">
                <select
                    className="category-select"
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                >
                    <option value="All Categories">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>

                <button
                    className="icon-btn settings-btn"
                    onClick={onOpenCategoryModal}
                    title="Manage Categories"
                >
                    <Settings size={20} />
                </button>

                <button className="btn-primary" onClick={onAddTask}>
                    <Plus size={18} />
                    <span>Add Task</span>
                </button>
            </div>
        </div>
    );
};

export default Controls;
