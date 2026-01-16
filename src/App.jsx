import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { db } from './firebase';
import {
    collection,
    addDoc,
    query,
    where,
    onSnapshot,
    doc,
    deleteDoc,
    updateDoc,
    orderBy
} from 'firebase/firestore';
import { Moon, Sun } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TaskModal from './components/TaskModal';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

import CategoryModal from './components/CategoryModal';

function AppContent() {
    const { currentUser, logout, theme, toggleTheme } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeCategory, setActiveCategory] = useState('All Categories');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');

    // Fetch Tasks
    useEffect(() => {
        if (!currentUser) {
            setTasks([]);
            return;
        }

        const q = query(
            collection(db, "tasks"),
            where("userId", "==", currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const tasksData = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            // Sort by createdAt manually if needed or update query once index exists
            // For now, let's reverse them so newest is first effectively if we push
            setTasks(tasksData);
        }, (error) => {
            console.error("Error fetching tasks:", error);
        });

        return unsubscribe;
    }, [currentUser]);

    // Fetch Categories
    useEffect(() => {
        if (!currentUser) return;

        const categoriesRef = collection(db, "users", currentUser.uid, "categories");

        const unsubscribe = onSnapshot(categoriesRef, async (snapshot) => {
            if (snapshot.empty) {
                // Seed default categories if empty
                const defaultCategories = [
                    { name: 'Work', color: '#3B82F6' },
                    { name: 'Personal', color: '#8B5CF6' },
                    { name: 'Shopping', color: '#F59E0B' },
                    { name: 'Health', color: '#EF4444' }
                ];

                // We use Promise.all to add them in parallel but we need to guard against multiple clients doing this
                // For simplicity in this demo, we just add them. In prod, maybe check again or use a batch.
                // Since this is a listener, we should be careful avoiding loops. 
                // Better approach: Check once on mount? 
                // Actually, if it's empty, we can just add them.
                // To avoid infinite loops if addDoc triggers snapshot before all are added, 
                // we can just wait for user action? 
                // No, user expects categories. 
                // Let's add them one by one.
                defaultCategories.forEach(async (cat) => {
                    await addDoc(categoriesRef, cat);
                });
            } else {
                const catsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCategories(catsData);
            }
        });

        return unsubscribe;
    }, [currentUser]);

    const addTask = async (newTask) => {
        try {
            // Remove the temporary 'id' from TaskModal if it exists, to rely on Firestore ID
            const { id, ...taskData } = newTask;

            await addDoc(collection(db, "tasks"), {
                ...taskData,
                userId: currentUser.uid,
                createdAt: new Date().toISOString()
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const toggleTaskStatus = async (id) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        const taskRef = doc(db, "tasks", id);
        try {
            await updateDoc(taskRef, {
                status: task.status === 'completed' ? 'pending' : 'completed'
            });
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const deleteTask = async (id) => {
        const taskRef = doc(db, "tasks", id);
        try {
            await deleteDoc(taskRef);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Category Actions
    const addCategory = async (category) => {
        try {
            await addDoc(collection(db, "users", currentUser.uid, "categories"), category);
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            await deleteDoc(doc(db, "users", currentUser.uid, "categories", id));
            // If deleted category was active, reset to All
            if (activeCategory !== 'All Categories') {
                // Check if the deleted one was active? 
                // We don't have the name here easily unless we look it up, 
                // but simpler to just reset if user deletes *any* category to be safe
                // or we can lookup:
                const cat = categories.find(c => c.id === id);
                if (cat && cat.name === activeCategory) {
                    setActiveCategory('All Categories');
                }
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    if (!currentUser) {
        return authMode === 'login'
            ? <Login onSwitchToSignup={() => setAuthMode('signup')} />
            : <Signup onSwitchToLogin={() => setAuthMode('login')} />;
    }

    return (
        <div className="app-container">
            <div className="header-actions">
                <span className="user-email">{currentUser.email}</span>
                <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle Theme">
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button onClick={logout} className="btn-logout">Logout</button>
            </div>

            <Dashboard
                tasks={tasks}
                categories={categories}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                onAddTask={() => setIsModalOpen(true)}
                onToggleStatus={toggleTaskStatus}
                onDelete={deleteTask}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                onOpenCategoryModal={() => setIsCategoryModalOpen(true)}
            />

            <TaskModal
                isOpen={isModalOpen}
                categories={categories}
                onClose={() => setIsModalOpen(false)}
                onSave={addTask}
            />

            <CategoryModal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                categories={categories}
                onAddCategory={addCategory}
                onDeleteCategory={deleteCategory}
            />
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
