import { AlertCircle } from 'lucide-react';

export default function StyleTips({ tips }) {
    if (!tips) return null;

    return (
        <div className="alert alert-info mb-4 d-flex align-items-start">
            <AlertCircle className="flex-shrink-0 me-2 mt-1" size={18} />
            <div>
                <h4 className="h6 mb-1">Style Tips</h4>
                <p className="mb-0">{tips}</p>
            </div>
        </div>
    );
}