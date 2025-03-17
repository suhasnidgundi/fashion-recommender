export default function FeatureCard({ icon, title, description }) {
    return (
        <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 p-3 rounded-circle mb-3">
                    {icon}
                </div>
                <h3 className="card-title h5 mb-3">{title}</h3>
                <p className="card-text text-muted">{description}</p>
            </div>
        </div>
    );
}