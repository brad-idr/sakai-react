import { Card } from 'primereact/card';
import { type ReactNode, useEffect, memo } from 'react';
import { Chart } from 'primereact/chart';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { Wordcloud } from '@visx/wordcloud';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import { type ReportCardData, UseReportDataHook, generateRandomColor } from '../services/ReportCardService';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { ProgressBar } from 'primereact/progressbar';

type ReportCardProps = {
    title: string;
    type: string;
    dataHook: () => UseReportDataHook;
    // data: ReportCardData;
    chartOptions?: object;
    draggable?: boolean;
    width?: number;
    height?: number;
    // refresh?: Function;
};

export enum ReportCardType {
    BarChart = 'bar',
    PieChart = 'pie',
    LineChart = 'line',
    DonutChart = 'doughnut',
    PolarAreaChart = 'polarArea',
    RadarChart = 'radar',
    Number = 'number',
    WordCloud = 'wordCloud',
    Percentage = 'percentage'
}

const colors = ['#143059', '#2F6B9A', '#82a6c2'];

function ReportCard({ title, type = ReportCardType.Number, width = 360, height = 240, dataHook, chartOptions = {}, draggable = true }: ReportCardProps): ReactNode {
    const validType = Object.values(ReportCardType).toString().includes(type);

    const { data, fetchData, loading, refreshData } = dataHook();

    const chartOptionsFormatted = {
        ...chartOptions,
        maintainAspectRatio: false
    };

    useEffect(() => {
        if (!loading && validType) {
            fetchData();
        }
    }, []);

    const calculatePercentage = (total?: number, value?: number, round: boolean = true) => {
        console.log('total: ' + total, 'value: ' + value, 'percent: ' + (total && value ? (data?.value / data?.total) * 100 : 0));
        return total && value ? Math.round((data?.value / data?.total) * 100) : 0;
    };

    const CardDetail = ({ data }: { data: ReportCardData }): ReactNode => {
        switch (type) {
            case ReportCardType.Number:
                return (
                    <div className="flex flex-wrap align-items-center justify-content-center" style={{ height: height, width: width }}>
                        <span className="vertical-align-middle text-8xl">{data?.value ?? 0}</span>
                    </div>
                );
            case ReportCardType.Percentage:
                return (
                    <div className="block align-content-center justify-content-center" style={{ height: height, width: width }}>
                        <ProgressBar className="vertical-align-middle" value={calculatePercentage(data?.total, data?.value)} />
                        <div className="flex h-full align-items-center justify-content-center">
                            <span className="vertical-align-middle text-7xl">{data?.value ?? 0}</span>
                            <span className="vertical-align-middle text-3xl">&nbsp;/&nbsp;</span>
                            <span className="vertical-align-middle text-7xl">{data?.total ?? 0}</span>
                        </div>
                    </div>
                );
            case ReportCardType.WordCloud:
                if (!data.entries?.length) {
                    return <h4>No words found</h4>;
                }
                const fontScale = scaleLog({
                    domain: [Math.min(...data?.entries.map((w) => w.value)), Math.max(...data?.entries.map((w) => w.value))],
                    range: [8, 80]
                });
                const fontSizeSetter = (datum: { value: any }) => fontScale(datum.value);

                return (
                    <Wordcloud
                        words={
                            data.entries?.map((word) => {
                                return {
                                    text: word?.id as string,
                                    value: word?.value
                                };
                            }) ?? []
                        }
                        width={width}
                        height={height}
                        random={() => 0.3}
                        fontSize={fontSizeSetter}
                        padding={2}
                        spiral={'archimedean'}
                        rotate={0}
                    >
                        {(cloudWords) =>
                            cloudWords.map((w, i) => (
                                <Text key={w.text} fill={colors[i % colors.length]} textAnchor={'middle'} transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`} fontSize={w.size} fontFamily={w.font}>
                                    {w.text}
                                </Text>
                            ))
                        }
                    </Wordcloud>
                );
            default:
                return (
                    <Chart
                        height={height.toString()}
                        type={type}
                        pt={{
                            canvas: {
                                style: {
                                    width: width
                                }
                            }
                        }}
                        data={
                            data
                                ? {
                                      labels: data.aggregates?.map((d) => d.label),
                                      datasets: [
                                          {
                                              label: data?.label,
                                              data: data.aggregates?.map((d) => d.value),
                                              backgroundColor: data.aggregates?.map(() => generateRandomColor())
                                          }
                                      ]
                                  }
                                : {}
                        }
                        options={chartOptionsFormatted}
                    ></Chart>
                );
        }
    };

    const Header = ({ title }: { title: string }): ReactNode => {
        const Refresh = (): ReactNode => {
            return <Button onClick={refreshData} icon={<i className="pi pi-refresh" />} link />;
        };
        const DragHandle = (): ReactNode => {
            return draggable ? (
                <Button
                    onClick={() => {
                        console.log('dragging');
                    }}
                    icon={<RxDragHandleDots2 />}
                    link
                />
            ) : null;
        };

        return (
            <div className={'flex justify-content-between'}>
                <DragHandle />
                <h4>{title}</h4>
                <Refresh />
            </div>
        );
    };

    return (
        <Card
            pt={
                {
                    // body: { style: { height: '100%', minHeight: 200, maxHeight: 500, minWidth: 600, maxWidth: 800 } }
                    // content: { style: { height: '100%', width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' } }
                }
            }
            title={<Header title={title} />}
        >
            {validType ? (
                <div className="flex w-full h-full justify-content-center" style={{ width: width, height: height }}>
                    {' '}
                    {loading ? <ProgressSpinner /> : <CardDetail data={data} />}
                </div>
            ) : (
                <div>
                    <h5>Error: Invalid Chart Type &quot;{type}&quot;</h5>
                </div>
            )}
        </Card>
    );
}

export default memo(ReportCard);
