import { motion } from 'framer-motion';

export default function LoadingState() {
    // Create an array of 4 items to simulate loading multiple cards
    const dummyArray = Array.from({ length: 4 });

    return (
        <div className="row g-4">
            {dummyArray.map((_, index) => (
                <div key={index} className="col-md-6">
                    <motion.div
                        className="card h-100 shadow-sm overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className="ratio ratio-4x5">
                            <div className="bg-light d-flex align-items-center justify-content-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="placeholder-glow">
                                <div className="placeholder col-7 mb-2" style={{ height: '24px' }}></div>
                                <div className="placeholder col-4 mb-3" style={{ height: '16px' }}></div>
                                <div className="placeholder col-12 mb-2" style={{ height: '16px' }}></div>
                                <div className="placeholder col-8 mb-2" style={{ height: '16px' }}></div>
                                <div className="placeholder col-3" style={{ height: '20px' }}></div>
                            </div>
                        </div>
                        <div className="card-footer bg-white">
                            <div className="placeholder-glow d-flex justify-content-between">
                                <div className="placeholder col-3" style={{ height: '20px' }}></div>
                                <div className="placeholder col-3" style={{ height: '20px' }}></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            ))}
        </div>
    );
}