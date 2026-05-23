import { clientFetch } from "../api/clientFetch"
import { queryClient } from "../query/queryClient";

export async function fetchCsrf(){
    const data = await clientFetch<{csrfToken:string}>("/csrf",{ method: "GET",
            sendAuth: false,
            refreshOn401: false,
        })
    return data?.csrfToken;
}
