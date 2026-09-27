import { useState, useEffect, useContext, createContext } from "react";

const BoardContext = createContext(null);
const COLUMNs = ['todo', 'in-progress', 'done'];
const STORAGE_KEY = 'facetask-board'

function loadFromStorage(){
    try{
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : []
    }catch{
        return []
    }
}

export function BoardProvider({childern}){
    
    const [tasks, setTasks] = useState(loadFromStorage);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks])
    
    function addTasks(taskData){
        const newTasks ={
            id: crypto.randomUUID(),
            title: taskData.title,
            description: taskData.description || '',
            priority: taskData.priority || 'medium',
            status: taskData.status || 'todo',
            dueDate: taskData.dueDate || null,
            createdAt: new Date().toISOString(), 
        }
        setTasks(prev => [...prev, newTasks]);
    }

    function EditTask(id, update){
        setTasks( prev => 
        prev.map(task => (task.id === id ? {...task, ...update} : task))
        );
    }

    function deleteTask(id){
        let deleted = null;
        setTasks(prev => {
            deleted = prev.find(t => t.id === id);
            return prev.filter(t => t.id !== id);
        })
        return deleted;
    }

    function restoreTask(task){
        setTasks(prev => [...prev, tasks]);
    }

    return( <>

            </>);
}