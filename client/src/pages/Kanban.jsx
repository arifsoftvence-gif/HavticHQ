import React, { useState, useEffect } from 'react';
import { ChevronRight, Plus, MoreHorizontal, Calendar, MessageSquare, Paperclip, Clock, Trash2, Edit2, X } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Kanban = () => {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban_tasks');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Design Logo', category: 'Branding', priority: 'High', status: 'To Do', users: ['AD'], comments: 2, attachments: 1 },
      { id: '2', title: 'Setup API', category: 'Backend', priority: 'Medium', status: 'In Progress', users: ['JD'], comments: 5, attachments: 3 },
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', category: '', priority: 'Medium', status: 'To Do' });

  useEffect(() => {
    localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const columns = ['To Do', 'In Progress', 'Review', 'Done'];

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      ...newTask,
      id: Date.now().toString(),
      users: ['AD'],
      comments: 0,
      attachments: 0
    };
    setTasks([...tasks, task]);
    setIsModalOpen(false);
    setNewTask({ title: '', category: '', priority: 'Medium', status: 'To Do' });
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="hover:text-primary cursor-pointer">{t('dashboard')}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-primary font-bold">{t('kanban')}</span>
        </nav>
        <div className="flex gap-3">
          <Button variant="secondary" className="gap-2"><Clock className="w-4 h-4" /> Timeline</Button>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2"><Plus className="w-4 h-4" /> New Task</Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div key={col} className="w-80 shrink-0 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-text-primary uppercase text-xs tracking-wider">{col}</h3>
                <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {tasks.filter(t => t.status === col).length}
                </span>
              </div>
              <button className="text-text-secondary hover:text-text-primary"><MoreHorizontal className="w-4 h-4" /></button>
            </div>

            <div 
              className="flex-1 bg-slate-100/50 rounded-xl p-3 border border-dashed border-slate-200 space-y-3 overflow-y-auto"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const taskId = e.dataTransfer.getData('taskId');
                moveTask(taskId, col);
              }}
            >
              {tasks.filter(t => t.status === col).map((task) => (
                <motion.div 
                  key={task.id}
                  layoutId={task.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('taskId', task.id)}
                  whileHover={{ y: -2 }}
                  className="bg-surface p-4 rounded-xl shadow-sm border border-border group cursor-grab active:cursor-grabbing transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'neutral'}>
                      {task.priority}
                    </Badge>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-50 p-1 rounded transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-text-primary mb-1">{task.title}</h4>
                  <p className="text-xs text-text-secondary mb-4">{task.category}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex -space-x-2">
                      {task.users.map((user, i) => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-surface bg-primary/10 flex items-center justify-center text-[8px] font-bold text-primary">
                          {user}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-text-secondary">
                      <div className="flex items-center gap-1 text-[10px] font-bold">
                        <MessageSquare className="w-3 h-3" /> {task.comments}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold">
                        <Paperclip className="w-3 h-3" /> {task.attachments}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              <button 
                onClick={() => { setNewTask({ ...newTask, status: col }); setIsModalOpen(true); }}
                className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-text-secondary hover:text-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-border"
              >
                <Plus className="w-3.5 h-3.5" /> Add Task
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-surface border border-border rounded-2xl p-8 shadow-2xl w-full max-w-md relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-primary">Create New Task</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-text-secondary hover:text-text-primary transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddTask} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-secondary uppercase">Task Title</label>
                  <input 
                    type="text" required 
                    value={newTask.title} 
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})} 
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm font-medium focus:border-primary outline-none" 
                    placeholder="e.g. Design Dashboard" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-secondary uppercase">Category</label>
                  <input 
                    type="text" required 
                    value={newTask.category} 
                    onChange={(e) => setNewTask({...newTask, category: e.target.value})} 
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm font-medium focus:border-primary outline-none" 
                    placeholder="e.g. UI Design" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase">Priority</label>
                    <select 
                      value={newTask.priority} 
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value})} 
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm font-medium focus:border-primary outline-none"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase">Initial Status</label>
                    <select 
                      value={newTask.status} 
                      onChange={(e) => setNewTask({...newTask, status: e.target.value})} 
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm font-medium focus:border-primary outline-none"
                    >
                      {columns.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-border">
                  <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="flex-1">Cancel</Button>
                  <Button type="submit" className="flex-1">Create Task</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Kanban;
