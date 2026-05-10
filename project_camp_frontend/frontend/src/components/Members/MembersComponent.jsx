import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { projectAPI } from "../../api/projects";
import { UserPlus, UserMinus, ShieldAlert } from "lucide-react";

export function MembersComponent() {
    const { projectId } = useParams();
    const [members, setMembers] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newMemberEmail, setNewMemberEmail] = useState("");
    const [newMemberRole, setNewMemberRole] = useState("member");

    useEffect(() => {
        fetchMembers();
    }, [projectId]);

    const fetchMembers = async () => {
        try {
            const data = await projectAPI.getProjectMembers(projectId);
            setMembers(data.data.members || data.data);
        } catch (error) {
            console.error("Failed to fetch members", error);
        }
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        try {
            await projectAPI.addMemberToProject(projectId, { email: newMemberEmail, role: newMemberRole });
            setNewMemberEmail("");
            setNewMemberRole("member");
            setIsAdding(false);
            fetchMembers();
        } catch (error) {
            console.error("Failed to add member", error);
        }
    };

    const handleRemoveMember = async (userId) => {
        if (!window.confirm("Are you sure you want to remove this member?")) return;
        try {
            await projectAPI.removeMemberFromProject(projectId, userId);
            fetchMembers();
        } catch (error) {
            console.error("Failed to remove member", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Team Members</h2>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-all shadow-lg shadow-blue-500/20"
                >
                    <UserPlus size={16} /> Add Member
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAddMember} className="bg-gray-800 p-5 rounded-xl mb-6 border border-gray-700 flex flex-wrap gap-3 items-end">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium mb-1 text-gray-300">User Email</label>
                        <input 
                            required
                            type="email" 
                            placeholder="user@example.com"
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm h-10"
                            value={newMemberEmail}
                            onChange={(e) => setNewMemberEmail(e.target.value)}
                        />
                    </div>
                    <div className="w-40">
                        <label className="block text-sm font-medium mb-1 text-gray-300">Role</label>
                        <select 
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm h-10"
                            value={newMemberRole}
                            onChange={(e) => setNewMemberRole(e.target.value)}
                        >
                            <option value="member">Member</option>
                            <option value="project_admin">Project Admin</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors text-sm h-10">
                        Invite
                    </button>
                    <button type="button" onClick={() => setIsAdding(false)} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors text-sm h-10">
                        Cancel
                    </button>
                </form>
            )}

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-900/50">
                        <tr>
                            <th className="px-6 py-4 font-medium text-gray-400">Name / Email</th>
                            <th className="px-6 py-4 font-medium text-gray-400">Role</th>
                            <th className="px-6 py-4 font-medium text-gray-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                        {members.map((member) => (
                            <tr key={member._id || member.user?._id} className="hover:bg-gray-700/20 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-100">{member.user?.username || "Unknown User"}</div>
                                    <div className="text-sm text-gray-400">{member.user?.email || ""}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                                        ${member.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                        {member.role === 'ADMIN' && <ShieldAlert size={12} />}
                                        {member.role || "MEMBER"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {member.role !== 'admin' && member.role !== 'ADMIN' && (
                                        <button 
                                            onClick={() => handleRemoveMember(member.user?._id)}
                                            className="text-gray-400 hover:text-red-400 p-2 rounded-lg transition-colors" 
                                            title="Remove Member"
                                        >
                                            <UserMinus size={18} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {members.length === 0 && (
                    <div className="text-gray-500 text-center py-8">
                        No members found in this project.
                    </div>
                )}
            </div>
        </div>
    );
}
