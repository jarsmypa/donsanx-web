import { useState, useEffect } from 'react';
import { isSameDay, isBefore, startOfDay, parseISO, getDay } from 'date-fns';
import { Settings } from 'lucide-react';
import RecurringTaskManager from './components/RecurringTaskManager';
import Layout from './components/Layout';
import Greeting from './components/Greeting';
import TaskList from './components/TaskList';
import ShoppingList from './components/ShoppingList';
import FloatingActionButton from './components/FloatingActionButton';
import AddItemModal from './components/AddItemModal';
import Login from './components/Login';
import WeekStrip from './components/WeekStrip';
import useLocalStorage from './hooks/useLocalStorage';
import useSupabaseTasks from './hooks/useSupabaseTasks';
import useSupabaseShopping from './hooks/useSupabaseShopping';
import useSupabaseRecurring from './hooks/useSupabaseRecurring';

function App() {
    const { tasks, addTask, toggleTask, deleteTask, updateTaskFields, loading: tasksLoading } = useSupabaseTasks();
    const { items: shoppingList, addItem: addShoppingItem, toggleItem: toggleShoppingItem, deleteItem: deleteShoppingItem } = useSupabaseShopping();
    const { recurringTasks, addRecurring, deleteRecurring: deleteRecurringTask } = useSupabaseRecurring(); // We don't need setRecurringTasks directly anymore, we need add/delete

    // Auth still local for now to keep it simple, or could migrate to Supabase Auth later
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage('fam_dashboard_auth', false);
    // const [lastRecurringGenDate, setLastRecurringGenDate] = useLocalStorage('fam_dashboard_last_gen', null); // Deprecated

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRecurringModalOpen, setIsRecurringModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Recurring Tasks Generation Logic
    useEffect(() => {
        if (recurringTasks.length > 0 && tasks.length >= 0) { // Ensure tasks are loaded (or empty)
            const dayOfWeek = getDay(selectedDate);

            recurringTasks.forEach(recTask => {
                let shouldAdd = false;
                if (recTask.frequency === 'daily') {
                    shouldAdd = true;
                } else if (recTask.frequency === 'weekly' && recTask.days.includes(dayOfWeek)) {
                    shouldAdd = true;
                }

                if (shouldAdd) {
                    // Check if already exists to prevent duplicates
                    // We check if there is ANY task with same text on this date
                    // This prevents re-adding if user completed it (assuming completed task still exists on date)
                    const exists = tasks.some(t =>
                        t.text === recTask.text &&
                        // Check date match
                        t.date &&
                        isSameDay(parseISO(t.date), selectedDate)
                    );

                    if (!exists) {
                        // Add it for the selected date
                        addTask(recTask.text, selectedDate, true);
                    }
                }
            });
        }
    }, [selectedDate, recurringTasks, tasks]); // Re-run when date changes or tasks update

    // Rollover Logic: Move past incomplete tasks to today
    useEffect(() => {
        if (tasks.length > 0 && !tasksLoading) {
            const today = startOfDay(new Date());

            tasks.forEach(task => {
                if (!task.completed && task.date) {
                    const taskDate = parseISO(task.date);
                    if (isBefore(startOfDay(taskDate), today)) {
                        // Move to today if it's from the past and incomplete
                        // We update the DB directly
                        updateTaskFields(task.id, { date: today.toISOString() });
                    }
                }
            });
        }
    }, [tasks, tasksLoading]); // Check whenever tasks load/change

    // Unified Add Handler
    const handleAddItem = (type, text, date) => {
        if (type === 'task') {
            addTask(text, date); // date is already Date object from modal
        } else {
            addShoppingItem(text);
        }
        setIsModalOpen(false);
    };

    if (!isAuthenticated) {
        return <Login onLogin={(user) => {
            // Save user to separate storage or simpler just auth for now, 
            // but ideally we should save 'currentUser' in localStorage
            localStorage.setItem('fam_dashboard_user', JSON.stringify(user));
            setIsAuthenticated(true);
        }} />;
    }

    // Get current user name safely
    const currentUser = JSON.parse(localStorage.getItem('fam_dashboard_user') || '"Familia"');

    // Filter tasks for selected date
    const displayedTasks = tasks.filter(task => {
        if (!task.date) return true; // Fallback for old tasks
        return isSameDay(parseISO(task.date), selectedDate);
    });

    return (
        <Layout>
            <div className="flex justify-between items-start">
                <Greeting names={currentUser} greeting="Hola" />
                <button
                    onClick={() => setIsRecurringModalOpen(true)}
                    className="mt-8 mr-4 p-2 text-neutral-500 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                >
                    <Settings size={20} />
                </button>
            </div>

            <WeekStrip selectedDate={selectedDate} onSelectDate={setSelectedDate} />

            <div className="space-y-6 mt-6">
                <TaskList
                    tasks={displayedTasks}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                />

                {/* Always show shopping list, or maybe only on 'Today'? Keeping it always visible for now */}
                <ShoppingList
                    items={shoppingList}
                    onToggle={toggleShoppingItem}
                    onDelete={deleteShoppingItem}
                />
            </div>

            <FloatingActionButton onClick={() => setIsModalOpen(true)} />

            <AddItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddItem}
            />

            <RecurringTaskManager
                isOpen={isRecurringModalOpen}
                onClose={() => setIsRecurringModalOpen(false)}
                recurringTasks={recurringTasks}
                onAdd={addRecurring} // Pass add handler
                onDelete={deleteRecurringTask} // Pass delete handler
            />
        </Layout>
    );
}

export default App;
