"use client";

import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function BootstrapClient() {
    useEffect(() => {
        // Dynamically import Bootstrap JavaScript (optional but recommended for interactive components)
        import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    return null;
}
