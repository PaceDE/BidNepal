"use client";

import { useEffect } from "react";
import { prefetchCsrf } from "../../lib/csrf/csrf";

export default function CsrfLoader() {

    useEffect(() => {
        prefetchCsrf();
    }, []);

    return null;
}