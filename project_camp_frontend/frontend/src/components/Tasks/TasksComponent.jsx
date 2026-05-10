import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { taskAPI } from "../../api/tasks";
import { Plus, Trash2, Edit2, Paperclip } from "lucide-react";

export function TasksComponent() {
    const { projectId } = useParams();
    const { project } = useOutletContext();
    const isMemberOnly = project?.currentUserRole === "member";
    const [tasks, setTasks] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newTaskData, setNewTaskData] = useState({ title: "", description: "", status: "todo", attachments: [] });

    useEffect(() => {
        fetchTasks();
    }, [projectId]);

    const fetchTasks = async () => {
        try {
            const data = await taskAPI.getTasks(projectId);
            setTasks(data.data.tasks || data.data);
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            // Build FormData if attachments exist
            let payload = newTaskData;
            if (newTaskData.attachments && newTaskData.attachments.length > 0) {
                payload = new FormData();
                payload.append("title", newTaskData.title);
                payload.append("description", newTaskData.description);
                payload.append("status", newTaskData.status);
                // Append each file
                Array.from(newTaskData.attachments).forEach(file => {
                    payload.append("attachments", file);
                });
            }

            await taskAPI.createTask(projectId, payload);
            setNewTaskData({ title: "", description: "", status: "todo", attachments: [] });
            setIsCreating(false);
            fetchTasks();
        } catch (error) {
            console.error("Failed to create task", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await taskAPI.deleteTask(projectId, taskId);
            fetchTasks();
        } catch (error) {
            console.error("Failed to delete task", error);
        }
    };

    const [creatingSubtaskFor, setCreatingSubtaskFor] = useState(null);
    const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

    const handleCreateSubtask = async (taskId, e) => {
        e.preventDefault();
        try {
            await taskAPI.createSubtask(projectId, taskId, { title: newSubtaskTitle });
            setNewSubtaskTitle("");
            setCreatingSubtaskFor(null);
            fetchTasks();
        } catch (error) {
            console.error("Failed to create subtask", error);
        }
    };

    const handleToggleSubtask = async (taskId, subtaskId, currentStatus) => {
        try {
            await taskAPI.updateSubtask(projectId, taskId, subtaskId, { isCompleted: !currentStatus });
            fetchTasks();
        } catch (error) {
            console.error("Failed to update subtask", error);
        }
    };

    const handleDeleteSubtask = async (taskId, subtaskId) => {
        try {
            await taskAPI.deleteSubtask(projectId, taskId, subtaskId);
            fetchTasks();
        } catch (error) {
            console.error("Failed to delete subtask", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Tasks</h2>
                {!isMemberOnly && (
                    <button 
                        onClick={() => setIsCreating(!isCreating)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-all shadow-lg shadow-blue-500/20"
                    >
                        <Plus size={16} /> Add Task
                    </button>
                )}
            </div>

            {isCreating && (
                <form onSubmit={handleCreateTask} className="bg-gray-800 p-5 rounded-xl mb-6 border border-gray-700">
                    <div className="space-y-4">
                        <input 
                            required
                            type="text" 
                            placeholder="Task Title"
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={newTaskData.title}
                            onChange={(e) => setNewTaskData({...newTaskData, title: e.target.value})}
                        />
                        <textarea 
                            placeholder="Description"
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={newTaskData.description}
                            onChange={(e) => setNewTaskData({...newTaskData, description: e.target.value})}
                        />
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Attachments</label>
                            <input 
                                type="file" 
                                multiple
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600/20 file:text-blue-400 hover:file:bg-blue-600/30"
                                onChange={(e) => setNewTaskData({...newTaskData, attachments: e.target.files})}
                            />
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors text-sm">
                                Save Task
                            </button>
                            <button type="button" onClick={() => setIsCreating(false)} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors text-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {tasks.map(task => (
                    <div key={task._id} className="bg-gray-800 p-5 rounded-xl border border-gray-700 group">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-100">{task.title}</h3>
                                <p className="text-gray-400 mt-1 text-sm">{task.description}</p>
                                <span className="inline-block mt-3 px-2 py-1 bg-gray-900 rounded text-xs font-medium text-gray-300">
                                    {task.status}
                                </span>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {!isMemberOnly && (
                                    <button onClick={() => handleDeleteTask(task._id)} className="text-red-400 hover:text-red-300 bg-red-400/10 p-2 rounded-lg">
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Attachments Section */}
                        {task.attachments && task.attachments.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {task.attachments.map((file, index) => (
                                    <a 
                                        key={index} 
                                        href={file.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded border border-blue-500/20 text-xs transition-colors"
                                        title={`Size: ${(file.size / 1024).toFixed(1)} KB`}
                                    >
                                        <Paperclip size={12} />
                                        <span className="truncate max-w-[150px]">Attachment {index + 1}</span>
                                    </a>
                                ))}
                            </div>
                        )}

                        {/* Subtasks Section */}
                        <div className="mt-4 pt-4 border-t border-gray-700/50">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-sm font-semibold text-gray-300">Subtasks</h4>
                                {!isMemberOnly && (
                                    <button 
                                        onClick={() => setCreatingSubtaskFor(creatingSubtaskFor === task._id ? null : task._id)}
                                        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                    >
                                        <Plus size={12} /> Add Subtask
                                    </button>
                                )}
                            </div>

                            {creatingSubtaskFor === task._id && (
                                <form onSubmit={(e) => handleCreateSubtask(task._id, e)} className="flex gap-2 mb-3">
                                    <input 
                                        required
                                        type="text"
                                        placeholder="Subtask title..."
                                        className="flex-1 bg-gray-900 border border-gray-700 rounded p-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                                        value={newSubtaskTitle}
                                        onChange={(e) => setNewSubtaskTitle(e.target.value)}
                                    />
                                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded text-xs">Add</button>
                                </form>
                            )}

                            <div className="space-y-2">
                                {task.subtasks?.map(subtask => (
                                    <div key={subtask._id} className="flex items-center justify-between bg-gray-900/50 p-2 rounded border border-gray-800 hover:border-gray-600 transition-colors group/sub">
                                        <div className="flex items-center gap-3">
                                            <input 
                                                type="checkbox"
                                                checked={subtask.isCompleted}
                                                onChange={() => handleToggleSubtask(task._id, subtask._id, subtask.isCompleted)}
                                                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                                            />
                                            <span className={`text-sm ${subtask.isCompleted ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                                                {subtask.title}
                                            </span>
                                        </div>
                                        {!isMemberOnly && (
                                            <button 
                                                onClick={() => handleDeleteSubtask(task._id, subtask._id)}
                                                className="text-red-400/50 hover:text-red-400 opacity-0 group-hover/sub:opacity-100 transition-opacity"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {(!task.subtasks || task.subtasks.length === 0) && !creatingSubtaskFor && (
                                    <p className="text-xs text-gray-500 italic">No subtasks yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {tasks.length === 0 && !isCreating && (
                    <div className="text-gray-500 text-center py-8 bg-gray-800/50 rounded-xl border border-gray-800 border-dashed">
                        No tasks yet. Create one!
                    </div>
                )}
            </div>
        </div>
    );
}
