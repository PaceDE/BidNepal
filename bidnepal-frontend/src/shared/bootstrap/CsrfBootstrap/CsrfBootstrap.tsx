"use client";

import { useEffect } from "react";
import { queryClient } from "../../lib/query/queryClient";
import { prefetchCsrf } from "../../lib/csrf/csrf";

export default function CsrfLoader() {

    useEffect(() => {
        prefetchCsrf();
    }, [queryClient]);

    return null;
}