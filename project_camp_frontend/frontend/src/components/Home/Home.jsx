import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Terminal, Shield, Zap, Layers, ChevronRight, Activity } from "lucide-react";

export function Home() {
    const { isAuth, userData } = useSelector((state) => state.headerVariables);
    const user = userData?.data || userData;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300 font-mono flex flex-col relative overflow-hidden">
            {/* Background Grid Effect */}
            <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

            {/* Hero Section */}
            <main className="flex-grow flex flex-col items-center justify-center px-6 py-20 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs mb-8">
                    <Activity size={12} className="animate-pulse" />
                    v1.0_ONLINE
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-md">
                    Manage Projects.<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                        Zero Distractions.
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
                    A high-performance workspace engineered for developers. Track tasks, manage RBAC teams, and document APIs in a terminal-inspired, zero-trust environment.
                </p>

                {isAuth && user?.isEmailVerified ? (
                    <Link 
                        to="/projects"
                        className="group relative inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-10 rounded transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] text-lg tracking-widest overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            [ENTER_DASHBOARD] <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </Link>
                ) : (
                    <Link 
                        to="/signup"
                        className="group relative inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-10 rounded transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] text-lg tracking-widest overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            [INITIALIZE_SYSTEM] <Terminal size={20} />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </Link>
                )}
            </main>

            {/* Terminal Window Mockup */}
            <section className="relative z-10 max-w-4xl w-full mx-auto px-6 mb-24">
                <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
                    <div className="bg-gray-900 px-4 py-3 flex items-center border-b border-gray-700">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="mx-auto text-xs text-gray-500 font-mono tracking-widest">
                            user@project_camp:~
                        </div>
                    </div>
                    <div className="p-6 text-sm md:text-base text-gray-300 font-mono leading-relaxed overflow-x-auto">
                        <p><span className="text-green-400">$</span> project_camp --init new_workspace</p>
                        <p className="text-gray-500">Initializing secure environment...</p>
                        <p className="text-emerald-400">✓ Database connected.</p>
                        <p className="text-emerald-400">✓ JWT Auth sequence initialized.</p>
                        <br/>
                        <p><span className="text-green-400">$</span> fetch tasks --status=in_progress</p>
                        <pre className="text-blue-300 mt-2">
{`[
  {
    "id": "69f9aff...",
    "title": "Migrate to MongoDB Atlas",
    "status": "in_progress",
    "assignedTo": "@admin"
  }
]`}
                        </pre>
                        <p className="mt-2 text-green-400 animate-pulse">_</p>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="relative z-10 bg-gray-900/80 border-t border-gray-800 py-20 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="text-center">
                        <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border border-gray-700">
                            <Zap className="text-yellow-400" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-100 mb-3">Lightning Fast</h3>
                        <p className="text-gray-400">
                            Built on a modern React frontend and Express backend, utilizing complex Mongoose aggregations for instant data delivery.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border border-gray-700">
                            <Shield className="text-blue-400" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-100 mb-3">Zero-Trust Security</h3>
                        <p className="text-gray-400">
                            Protected by HTTP-only cookie JWTs, strict email verification walls, and granular Role-Based Access Control.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border border-gray-700">
                            <Layers className="text-green-400" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-100 mb-3">Deep Nesting</h3>
                        <p className="text-gray-400">
                            Organize your chaotic workflows with isolated workspaces, infinite-depth subtasks, and collaborative markdown notes.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
