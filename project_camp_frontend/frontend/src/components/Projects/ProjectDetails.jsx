import { useState, useEffect } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { projectAPI } from "../../api/projects";
import { ArrowLeft, CheckSquare, FileText, Users } from "lucide-react";

export function ProjectDetails() {
    const { projectId } = useParams();
    const location = useLocation();
    const [project, setProject] = useState(null);

    useEffect(() => {
        fetchProject();
    }, [projectId]);

    const fetchProject = async () => {
        try {
            const data = await projectAPI.getProjectById(projectId);
            setProject(data.data);
        } catch (error) {
            console.error("Failed to fetch project details", error);
        }
    };

    if (!project) return <div className="text-white text-center mt-10">Loading project details...</div>;

    const navItems = [
        { path: `/projects/${projectId}/tasks`, label: "Tasks", icon: <CheckSquare size={18} /> },
        { path: `/projects/${projectId}/notes`, label: "Notes", icon: <FileText size={18} /> },
        { path: `/projects/${projectId}/members`, label: "Members", icon: <Users size={18} /> }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="border-b border-gray-800 bg-gray-900 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-8 py-6">
                    <Link to="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-4">
                        <ArrowLeft size={16} /> Back to Projects
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">{project.name}</h1>
                    <p className="text-gray-400 max-w-2xl">{project.description}</p>
                </div>
                <div className="max-w-6xl mx-auto px-8 flex gap-6">
                    {navItems.map(item => {
                        const isActive = location.pathname.includes(item.path);
                        return (
                            <Link 
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 pb-4 px-2 border-b-2 transition-colors ${isActive ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                            >
                                {item.icon} {item.label}
                            </Link>
                        )
                    })}
                </div>
            </div>
            
            <div className="max-w-6xl mx-auto p-8">
                <Outlet context={{ project }} />
            </div>
        </div>
    );
}
