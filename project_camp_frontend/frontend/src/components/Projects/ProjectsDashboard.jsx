import { useState, useEffect } from "react";
import { projectAPI } from "../../api/projects";
import { Link } from "react-router-dom";
import { Plus, Folder } from "lucide-react";

export function ProjectsDashboard() {
    const [projects, setProjects] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newProjectData, setNewProjectData] = useState({ name: "", description: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await projectAPI.getAllProjects();
            let rawProjects = data.data.projects || data.data;
            if (Array.isArray(rawProjects)) {
                // The backend aggregation returns { projects: { ... }, role: ... }
                // We extract just the project details so the keys map correctly.
                rawProjects = rawProjects.map(p => p.projects ? p.projects : p);
            }
            setProjects(rawProjects);
        } catch (error) {
            console.error("Failed to fetch projects", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            await projectAPI.createProject(newProjectData);
            setNewProjectData({ name: "", description: "" });
            setIsCreating(false);
            fetchProjects();
        } catch (error) {
            console.error("Failed to create project", error);
        }
    };

    if (loading) return <div className="text-white text-center mt-10">Loading projects...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                        My Projects
                    </h1>
                    <button 
                        onClick={() => setIsCreating(!isCreating)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-500/30"
                    >
                        <Plus size={20} /> New Project
                    </button>
                </div>

                {isCreating && (
                    <form onSubmit={handleCreateProject} className="bg-gray-800 p-6 rounded-xl mb-8 border border-gray-700 shadow-2xl">
                        <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Create New Project</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Project Name</label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newProjectData.name}
                                    onChange={(e) => setNewProjectData({...newProjectData, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea 
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newProjectData.description}
                                    onChange={(e) => setNewProjectData({...newProjectData, description: e.target.value})}
                                />
                            </div>
                            <div className="flex gap-2">
                                <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors">
                                    Create
                                </button>
                                <button type="button" onClick={() => setIsCreating(false)} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <Link 
                            key={project._id} 
                            to={`/projects/${project._id}`}
                            className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-500/20 group"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Folder className="text-blue-400 group-hover:text-emerald-400 transition-colors" size={28} />
                                <h3 className="text-xl font-bold truncate">{project.name}</h3>
                            </div>
                            <p className="text-gray-400 line-clamp-2">{project.description || "No description provided."}</p>
                        </Link>
                    ))}
                    {projects.length === 0 && !isCreating && (
                        <div className="col-span-full text-center text-gray-500 py-10">
                            No projects found. Create one to get started!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
