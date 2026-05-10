import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { noteAPI } from "../../api/notes";
import { Plus, Trash2 } from "lucide-react";

export function NotesComponent() {
    const { projectId } = useParams();
    const [notes, setNotes] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newNoteData, setNewNoteData] = useState({ content: "" });

    useEffect(() => {
        fetchNotes();
    }, [projectId]);

    const fetchNotes = async () => {
        try {
            const data = await noteAPI.getNotes(projectId);
            setNotes(data.data.notes || data.data);
        } catch (error) {
            console.error("Failed to fetch notes", error);
        }
    };

    const handleCreateNote = async (e) => {
        e.preventDefault();
        try {
            await noteAPI.createNote(projectId, { noteContent: newNoteData.content });
            setNewNoteData({ content: "" });
            setIsCreating(false);
            fetchNotes();
        } catch (error) {
            console.error("Failed to create note", error);
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            await noteAPI.deleteNote(projectId, noteId);
            fetchNotes();
        } catch (error) {
            console.error("Failed to delete note", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Notes</h2>
                <button 
                    onClick={() => setIsCreating(!isCreating)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-all shadow-lg shadow-blue-500/20"
                >
                    <Plus size={16} /> New Note
                </button>
            </div>

            {isCreating && (
                <form onSubmit={handleCreateNote} className="bg-gray-800 p-5 rounded-xl mb-6 border border-gray-700">
                    <div className="space-y-4">
                        <textarea 
                            required
                            placeholder="Write your note content here..."
                            rows={5}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none resize-y"
                            value={newNoteData.content}
                            onChange={(e) => setNewNoteData({...newNoteData, content: e.target.value})}
                        />
                        <div className="flex gap-2">
                            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors text-sm">
                                Save Note
                            </button>
                            <button type="button" onClick={() => setIsCreating(false)} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors text-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notes.map(note => (
                    <div key={note._id} className="bg-amber-100/10 p-5 rounded-xl border border-amber-500/20 relative group hover:bg-amber-100/20 transition-colors">
                        <p className="text-gray-300 text-sm whitespace-pre-wrap">{note.content}</p>
                        
                        <button 
                            onClick={() => handleDeleteNote(note._id)} 
                            className="absolute top-4 right-4 text-red-400 hover:text-red-300 bg-gray-900 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
                {notes.length === 0 && !isCreating && (
                    <div className="col-span-full text-gray-500 text-center py-8 bg-gray-800/50 rounded-xl border border-gray-800 border-dashed">
                        No notes found. Create your first note!
                    </div>
                )}
            </div>
        </div>
    );
}
