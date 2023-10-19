import { useCallback, useState } from "react"

type UseDataData = {
    [key: string]: any
}

export interface UseReportDataHook {
    fetchData: () => Promise<void>;
    refreshData: () => Promise<void>;
    data: UseDataData;
    loading: boolean;
}

export type ReportEntry = Array<{ id: string | number; value: any }>

export type ReportCardAggregates = Array<{ label: string; value: number }>;
export type ReportCardData = {
    label?: string,
    aggregates?: ReportCardAggregates;
    entries?: ReportEntry;
};

export const generateRandomColor = () => {
    return "#" + Math.random().toString(16).substring(2, 8)
};

const useFetchDataCallback = (endpoint: string, setData: any, loading: boolean, setLoading: any, clearCache: boolean = false): () => Promise<void> => {
    return useCallback(async () => {
        // To prevent duplicate conflicting fetches
        if (!loading) {
            setLoading(true)
            try {
                const data = await fetch(endpoint, { cache: clearCache ? "no-cache" : "force-cache", next: {revalidate: 3} })
                setData(await data.json())
            } catch (e){
                alert(e)
            }           

            setLoading(false)
        }
    }, [loading, setLoading, setData, endpoint, clearCache]);
}


export const useValidLeadData = (): UseReportDataHook => {
    const { data: aggregateData, loading, fetchData, refreshData } = useLeadAggregateData();
    return {
        data: Object.entries(aggregateData).length ? {
            aggregates: aggregateData.aggregates.filter((d: {label:string}) => d.label === "Valid" || d.label === "Invalid")
        } : {},
        loading,
        fetchData,
        refreshData
    };
}

export const useAppsAndShowingsData = (): UseReportDataHook => {
    const { data: aggregateData, loading, fetchData, refreshData } = useLeadAggregateData();
    return {
        data: Object.entries(aggregateData).length ? {
            aggregates: aggregateData.aggregates.filter((d: {label:string}) => d.label === "Applications" || d.label === "Showings")
        } : {},
        loading,
        fetchData,
        refreshData
    };
}

export const useLeadAggregateData = (): UseReportDataHook => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ReportCardData>({});
    return {
        fetchData: useFetchDataCallback('crm/api/dashboard/leads', setData, loading, setLoading),
        refreshData: useFetchDataCallback('crm/api/dashboard/leads', setData, loading, setLoading, true),
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
        refreshData: useFetchDataCallback('crm/api/dashboard/word-cloud', setData, loading, setLoading, true),
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
        refreshData: useFetchDataCallback('crm/api/dashboard/product-success', setData, loading, setLoading, true),
        data,
        loading
    }
}