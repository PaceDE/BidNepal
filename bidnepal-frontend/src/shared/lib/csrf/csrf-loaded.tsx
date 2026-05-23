"use client";

import { useEffect } from "react";
import { queryClient } from "../query/queryClient";
import { prefetchCsrf } from "./csrf";

export default function CsrfLoader() {

    useEffect(() => {
        prefetchCsrf();
    }, [queryClient]);

    return null;
}