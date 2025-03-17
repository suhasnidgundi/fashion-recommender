import { Search, Filter } from 'lucide-react';

export default function EmptyState({ message, icon }) {
    const renderIcon = () => {
        switch (icon) {
            case 'search':
                return <Search size={48} className="text-muted mb-3" />;
            case 'filter':
                return <Filter size={48} className="text-muted mb-3" />;
            default:
                return <Search size={48} className="text-muted mb-3" />;
        }
    };

    return (
        <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column align-items-center justify-content-center py-5 text-center">
                {renderIcon()}
                <h3 className="h5 mb-2">No Recommendations Yet</h3>
                <p className="text-muted mb-0">{message}</p>
            </div>
        </div>
    );
}