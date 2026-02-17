import { Sidebar } from './Sidebar';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex h-screen bg-slate-950">
            <Sidebar />
            <main className="flex-1 overflow-auto bg-slate-950 text-slate-50">
                <div className="container mx-auto p-6">
                    {children}
                </div>
            </main>
        </div>
    );
};
