'use client';
import ReportCard from '../../../lib/components/ReportCard';
import { useAppsAndShowingsData, useProductSuccessData, useValidLeadData, useWordCloudData } from '../../../lib/services/ReportCardService';

const Dashboard = () => {
    return (
        <div className="grid">
            <div className="col">
                <div className="flex flex-row flex-wrap gap-4">
                    <ReportCard
                        title={'Product Success'}
                        type={'pie'}
                        width={440}
                        chartOptions={{
                            plugins: { legend: { position: 'left' } }
                        }}
                        dataHook={useProductSuccessData}
                    />
                    <ReportCard title={'Word Cloud'} type={'wordCloud'} width={600} dataHook={useWordCloudData} />
                    <ReportCard title={'Invalid Chart'} type={'test'} dataHook={useValidLeadData} />
                    <ReportCard title={'Valid Leads'} type={'pie'} dataHook={useValidLeadData} />
                    <ReportCard title={'Apps/Showings'} type={'doughnut'} dataHook={useAppsAndShowingsData} />
                    <ReportCard title={'Bar Chart'} width={500} type={'bar'} dataHook={useProductSuccessData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
