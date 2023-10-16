import { useCallback, useState } from "react"

type UseDataData = {
    [key: string]: any
}

export type UseReportDataHook = {
    fetchData: () => Promise<void>,
    data: UseDataData,
    loading: boolean
}

export type ReportEntry = Array<{ id: string | number; value: any }>



export type ReportCardAggregates = Array<{ label: string; value: number }>;
export type ReportCardData = {
    aggregates?: ReportCardAggregates;
    entries?: ReportEntry;
};

export const generateRandomColor = () => {
    return "#" + Math.random().toString(16).substring(2, 8)
};

const useFetchDataCallback = (endpoint: string, setData: any, loading: boolean, setLoading: any): () => Promise<void> => {
    return useCallback(async () => {
        // To prevent duplicate conflicting fetches
        if (!loading) {
            setLoading(true)
            try {
                const data = await fetch(endpoint, { cache: 'default' })
                setData(await data.json())
            } catch (e){
                alert(e)
            }
            setLoading(false)

            
        }
    }, [loading, setLoading, setData, endpoint]);
}


export const useValidLeadData = (): UseReportDataHook => {
    const { data: aggregateData, loading, fetchData } = useLeadAggregateData();
    return {
        data: Object.entries(aggregateData).length ? {
            aggregates: aggregateData.aggregates.filter((d: {label:string}) => d.label === "Valid" || d.label === "Invalid")
        } : {},
        loading,
        fetchData
    };
}

export const useAppsAndShowingsData = (): UseReportDataHook => {
    const { data: aggregateData, loading, fetchData } = useLeadAggregateData();
    return {
        data: Object.entries(aggregateData).length ? {
            aggregates: aggregateData.aggregates.filter((d: {label:string}) => d.label === "Applications" || d.label === "Showings")
        } : {},
        loading,
        fetchData
    };
}

export const useLeadAggregateData = (): UseReportDataHook => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ReportCardData>({});
    return {
        fetchData: useFetchDataCallback('crm/api/dashboard/leads', setData, loading, setLoading),
        data,
        loading
    }
}

export type WordCloudData = {
    data: Array<{ word: string, count: number }>
}
export function useWordCloudData(): UseReportDataHook {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ReportCardData>({});
    return {
        fetchData: useFetchDataCallback('crm/api/dashboard/word-cloud', setData, loading, setLoading),
        data,
        loading
    }
}

export type ReportCountsWithLabels = {
    [key: string]: { label: string, count: number }
}
export function useProductSuccessData(): UseReportDataHook {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ReportCardData>({});
    return {
        fetchData: useFetchDataCallback('crm/api/dashboard/product-success', setData, loading, setLoading),
        data,
        loading
    }
}