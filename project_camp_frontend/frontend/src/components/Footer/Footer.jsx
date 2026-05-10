export function Footer() {
    return (
        <footer className="mt-auto py-8 bg-slate-900 border-t border-indigo-900/50 text-gray-400">
            <div className="flex flex-col items-center justify-center gap-4">
                {/* Social Links */}
                <ul className="flex gap-8 font-medium">
                    <li className="hover:text-indigo-400 transition-colors cursor-pointer">
                        <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
                    </li>
                    <li className="hover:text-indigo-400 transition-colors cursor-pointer">
                        <a href="https://discord.com" target="_blank" rel="noreferrer">Discord</a>
                    </li>
                </ul>
                
                {/* Copyright/Secondary info */}
                <p className="text-xs opacity-50">
                    &copy; {new Date().getFullYear()} Your Project Name. All rights reserved.
                </p>
            </div>
        </footer>
    );
}