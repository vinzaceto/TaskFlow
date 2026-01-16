import React, { useState } from 'react';
import { X, Trash2, Plus, Check } from 'lucide-react';
import './CategoryModal.css';

const AVAILABLE_COLORS = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Teal', value: '#14B8A6' }, // Replaces Green
    { name: 'Green', value: '#10B981' },
    { name: 'Orange', value: '#F59E0B' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Indigo', value: '#6366F1' }
];

const CategoryModal = ({ isOpen, onClose, categories, onAddCategory, onDeleteCategory }) => {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [selectedColor, setSelectedColor] = useState(AVAILABLE_COLORS[0].value);

    if (!isOpen) return null;

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        onAddCategory({
            name: newCategoryName.trim(),
            color: selectedColor
        });
        setNewCategoryName('');
        setSelectedColor(AVAILABLE_COLORS[0].value);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content category-modal">
                <div className="modal-header">
                    <h2>Manage Categories</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="categories-list-section">
                    <h3 className="section-title">Current Categories</h3>
                    <div className="categories-list">
                        {categories.map(category => (
                            <div key={category.id} className="category-item-row">
                                <div className="category-info">
                                    <span
                                        className="category-dot"
                                        style={{ backgroundColor: category.color }}
                                    ></span>
                                    <span className="category-name">{category.name}</span>
                                </div>
                                <button
                                    className="delete-category-btn"
                                    onClick={() => onDeleteCategory(category.id)}
                                    title="Delete Category"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="add-category-section">
                    <h3 className="section-title">Add New Category</h3>
                    <form onSubmit={handleAdd}>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Category name..."
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                className="category-input"
                            />
                            <button
                                type="submit"
                                className="add-btn"
                                disabled={!newCategoryName.trim()}
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        <div className="color-picker">
                            {AVAILABLE_COLORS.map((color) => (
                                <button
                                    key={color.value}
                                    type="button"
                                    className={`color-option ${selectedColor === color.value ? 'selected' : ''}`}
                                    style={{ backgroundColor: color.value }}
                                    onClick={() => setSelectedColor(color.value)}
                                    title={color.name}
                                >
                                    {selectedColor === color.value && <Check size={12} color="white" strokeWidth={3} />}
                                </button>
                            ))}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
