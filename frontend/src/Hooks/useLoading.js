import { useEffect, useState } from "react";

export default function useLoading(query) {
    const [isLoading, setIsLoading] = useState(true);
    const [res, setRes] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        query()
            .finally(()=>setIsLoading(false))
            .then(data => { setRes(data) })
            .catch(err => setError(err))
    }, [])

    return { isLoading, res, error };
}