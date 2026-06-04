/**
 * NEXUS 2026 - Charts Module
 * Chart.js integration for financial data visualization
 */

class NexusCharts {
    constructor() {
        this.charts = {};
        this.chartInstances = {};
    }

    /**
     * Initialize all charts
     */
    initCharts() {
        this.createTrendChart();
        this.createAllocationChart();
        this.createHeatmapChart();
        log('Charts initialized', 'success');
    }

    /**
     * Create 24H market trend chart
     */
    createTrendChart() {
        const ctx = $('#chart-trend');
        if (!ctx) return;

        const data = MOCK_DATA.marketTrend24h;

        this.chartInstances.trend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'S&P 500',
                        data: data.sp500,
                        borderColor: '#00d9ff',
                        backgroundColor: 'rgba(0, 217, 255, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 4,
                        pointBackgroundColor: '#00d9ff',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                    },
                    {
                        label: 'NASDAQ',
                        data: data.nasdaq,
                        borderColor: '#ff006e',
                        backgroundColor: 'rgba(255, 0, 110, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 4,
                        pointBackgroundColor: '#ff006e',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                    },
                    {
                        label: 'DJIA',
                        data: data.djia,
                        borderColor: '#b300ff',
                        backgroundColor: 'rgba(179, 0, 255, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 4,
                        pointBackgroundColor: '#b300ff',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: '#a0a0a0',
                            font: { size: 12, family: "'Inter', sans-serif" },
                        },
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 14, 39, 0.9)',
                        titleColor: '#00d9ff',
                        bodyColor: '#e8e8e8',
                        borderColor: '#00d9ff',
                        borderWidth: 1,
                    },
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(0, 217, 255, 0.1)',
                        },
                        ticks: {
                            color: '#a0a0a0',
                            font: { size: 10 },
                        },
                    },
                    y: {
                        grid: {
                            color: 'rgba(0, 217, 255, 0.1)',
                        },
                        ticks: {
                            color: '#a0a0a0',
                            font: { size: 10 },
                        },
                    },
                },
            },
        });
    }

    /**
     * Create portfolio allocation pie chart
     */
    createAllocationChart() {
        const ctx = $('#chart-allocation');
        if (!ctx) return;

        const data = MOCK_DATA.allocation;

        this.chartInstances.allocation = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        data: data.values,
                        backgroundColor: data.colors,
                        borderColor: 'rgba(10, 14, 39, 0.9)',
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#a0a0a0',
                            font: { size: 11, family: "'Inter', sans-serif" },
                            padding: 15,
                        },
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 14, 39, 0.9)',
                        titleColor: '#00d9ff',
                        bodyColor: '#e8e8e8',
                        borderColor: '#00d9ff',
                        borderWidth: 1,
                        callbacks: {
                            label: function (context) {
                                return context.label + ': ' + context.parsed + '%';
                            },
                        },
                    },
                },
            },
        });
    }

    /**
     * Create risk heatmap bar chart
     */
    createHeatmapChart() {
        const ctx = $('#chart-heatmap');
        if (!ctx) return;

        const data = MOCK_DATA.riskHeatmap;

        // Generate colors based on risk level
        const colors = data.riskLevels.map((level) => {
            if (level > 70) return '#ff0033';
            if (level > 50) return '#ffd700';
            if (level > 30) return '#b300ff';
            return '#00d9ff';
        });

        this.chartInstances.heatmap = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.sectors,
                datasets: [
                    {
                        label: 'Risk Level (%)',
                        data: data.riskLevels,
                        backgroundColor: colors,
                        borderColor: 'rgba(0, 217, 255, 0.3)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 14, 39, 0.9)',
                        titleColor: '#00d9ff',
                        bodyColor: '#e8e8e8',
                        borderColor: '#00d9ff',
                        borderWidth: 1,
                        callbacks: {
                            label: function (context) {
                                return 'Risk: ' + context.parsed.x + '%';
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        min: 0,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 217, 255, 0.1)',
                        },
                        ticks: {
                            color: '#a0a0a0',
                            font: { size: 10 },
                        },
                    },
                    y: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            color: '#a0a0a0',
                            font: { size: 11 },
                        },
                    },
                },
            },
        });
    }

    /**
     * Update chart data
     */
    updateChart(chartName, newData) {
        if (this.chartInstances[chartName]) {
            this.chartInstances[chartName].data = newData;
            this.chartInstances[chartName].update();
        }
    }

    /**
     * Destroy all charts
     */
    destroyAll() {
        Object.values(this.chartInstances).forEach((chart) => {
            chart.destroy();
        });
        this.chartInstances = {};
    }
}

// Create global charts instance
const nexusCharts = new NexusCharts();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    nexusCharts.initCharts();
});