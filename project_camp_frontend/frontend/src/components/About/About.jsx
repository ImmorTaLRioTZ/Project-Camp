import { Shield, Database, LayoutTemplate, Users, CheckSquare, FileText, Server, Key } from "lucide-react";

export function About() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-300 font-mono py-12 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-green-500 mb-4 tracking-widest drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">
                        [PROJECT_CAMP_ARCHITECTURE]
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        A high-performance, secure, and fully-featured project management ecosystem built on the MERN stack with strict role-based access control.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Core Tech Stack */}
                    <div className="bg-gray-800 p-8 rounded-xl border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.05)]">
                        <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-3">
                            <Server className="text-green-500" /> CORE_STACK
                        </h2>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <span className="text-green-500 font-bold">{'>'}</span>
                                <div>
                                    <strong className="text-gray-100">Frontend:</strong> React + Vite + Tailwind CSS. Utilizing Redux Toolkit for global state management and deeply nested React Router for protected, hierarchical navigation.
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-green-500 font-bold">{'>'}</span>
                                <div>
                                    <strong className="text-gray-100">Backend:</strong> Express.js (Node.js) architected with modular controllers, middlewares, and complex Mongoose aggregation pipelines.
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-green-500 font-bold">{'>'}</span>
                                <div>
                                    <strong className="text-gray-100">Database:</strong> MongoDB Atlas with strict IP whitelisting. Utilizing nested Document references for relational-style querying.
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Security & Auth */}
                    <div className="bg-gray-800 p-8 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.05)]">
                        <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-3">
                            <Shield className="text-blue-500" /> SECURITY_PROTOCOLS
                        </h2>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <span className="text-blue-500 font-bold">{'>'}</span>
                                <div>
                                    <strong className="text-gray-100">Stateless JWT Auth:</strong> Access and Refresh tokens securely delivered via HTTP-Only cookies to prevent XSS attacks.
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500 font-bold">{'>'}</span>
                                <div>
                                    <strong className="text-gray-100">Verification Wall:</strong> Zero-trust architecture. Users cannot interact with endpoints or UI elements until email verification is complete.
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500 font-bold">{'>'}</span>
                                <div>
                                    <strong className="text-gray-100">Payload Validation:</strong> Strict payload sanitization using `express-validator` to intercept malformed data before it reaches controllers.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-100 mb-2">SYSTEM_FEATURES</h2>
                    <div className="h-1 w-24 bg-green-500 mx-auto rounded"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Projects */}
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors">
                        <LayoutTemplate className="text-green-400 mb-4" size={32} />
                        <h3 className="text-xl font-bold text-gray-100 mb-2">Workspaces</h3>
                        <p className="text-sm text-gray-400">
                            Create isolated project environments. Each project acts as a container for its own tasks, subtasks, notes, and specific team members.
                        </p>
                    </div>

                    {/* Members */}
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors">
                        <Users className="text-green-400 mb-4" size={32} />
                        <h3 className="text-xl font-bold text-gray-100 mb-2">RBAC System</h3>
                        <p className="text-sm text-gray-400">
                            Role-Based Access Control. Invite users via email and assign them dynamic roles (Admin, Project Admin, Member) to dictate their backend permissions.
                        </p>
                    </div>

                    {/* Tasks */}
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors">
                        <CheckSquare className="text-green-400 mb-4" size={32} />
                        <h3 className="text-xl font-bold text-gray-100 mb-2">Task Engine</h3>
                        <p className="text-sm text-gray-400">
                            Comprehensive task tracking with states. Features an infinite-depth subtask system pulled via complex MongoDB aggregation pipelines for maximum efficiency.
                        </p>
                    </div>

                    {/* Notes */}
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors">
                        <FileText className="text-green-400 mb-4" size={32} />
                        <h3 className="text-xl font-bold text-gray-100 mb-2">Documentation</h3>
                        <p className="text-sm text-gray-400">
                            Dedicated collaborative space for project-specific notes and documentation, keeping relevant knowledge tied directly to the workspace.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}