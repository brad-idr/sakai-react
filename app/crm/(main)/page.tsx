'use client';
import { memo, useEffect, useMemo } from 'react';
import ReportCard from '../../../lib/components/ReportCard';
import { useAppsAndShowingsData, useProductSuccessData, useValidLeadData, useWordCloudData } from '../../../lib/services/ReportCardService';

const Dashboard = () => {
    // const { fetchLeadData, leadData, loading: leadDataLoading } = useLeadData();
    // const { fetchWordCloudData, wordCloudData, loading: wordCloudLoading } = useWordCloudData();
    // const { data: productSuccessData, fetchData: fetchProductSuccessData, loading: productSuccessDataLoading } = useProductSuccessData();

    // useEffect(() => {
    //     fetchLeadData();
    // }, [fetchLeadData]);

    // useEffect(() => {
    //     fetchWordCloudData();
    // }, [fetchWordCloudData]);

    // useEffect(fetchProductSuccessData(), [fetchProductSuccessData]);

    return (
        <div className="grid">
            <div className="col">
                <div className="flex flex-row flex-wrap gap-4">
                    <ReportCard
                        title={'Product Success'}
                        type={'pie'}
                        chartOptions={{
                            plugins: { legend: { position: 'left' } }
                        }}
                        dataHook={useProductSuccessData}
                    />
                    <ReportCard title={'Word Cloud'} type={'wordCloud'} dataHook={useWordCloudData} />
                    <ReportCard title={'Invalid Chart'} type={'blah'} dataHook={useValidLeadData} />
                    <ReportCard title={'Valid Leads'} type={'pie'} dataHook={useValidLeadData} />
                    <ReportCard title={'Valid Leads (Donut)'} type={'doughnut'} dataHook={useAppsAndShowingsData} />
                    <ReportCard title={'Bar Chart'} type={'bar'} dataHook={useProductSuccessData} />
                </div>
            </div>
        </div>
    );
};

export default memo(Dashboard);
