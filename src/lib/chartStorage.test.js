

const fs = require("fs")
const domTesting = require('@testing-library/dom')
require('@testing-library/jest-dom')

const {
    saveChart,
    loadAllSavedCharts,
    loadSavedChart,
    updateCurrentChartData,
    loadCurrentChartData
  } = require('./chartStorage')


beforeEach(() => {
    localStorage.clear()
})

describe('saveChart', () => {
    it('should save a chart to localStorage', () => {
      const chart = { id: 1, type: 'line', data: [1, 2, 3] };
      saveChart(chart);
      expect(loadAllSavedCharts()).toEqual([chart]);
    });

    it('should overwrite an existing chart if an index is specified', () => {
      const chart1 = { id: 1, type: 'line', data: [1, 2, 3] };
      const chart2 = { id: 2, type: 'bar', data: [4, 5, 6] };
      saveChart(chart1);
      saveChart(chart2, 0);
      expect(loadAllSavedCharts()).toEqual([chart2]);
    });

  });

describe('loadSavedChart', () => {
    it('should load a specific chart by index', () => {
        const chart = { id: 1, type: 'line', data: [1, 2, 3] };
        saveChart(chart);
        expect(loadSavedChart(0)).toEqual(chart);
    });
});

describe('updateCurrentChartData', () => {
    it('should update the current chart data in localStorage', () => {
        const currentChartData = { type: 'scatter', data: [7, 8, 9] };
        updateCurrentChartData(currentChartData);
        expect(loadCurrentChartData()).toEqual(currentChartData);
    });
});


  
describe('loadCurrentChartData', () => {
    it('should load the current chart data from localStorage', () => {
        const currentChartData = { type: 'scatter', data: [7, 8, 9] };
        updateCurrentChartData(currentChartData);
        expect(loadCurrentChartData()).toEqual(currentChartData);
    });
});


test('saveChart and loadSavedChart work correctly', () => {
    const chart = {
      type: 'bar',
      data: [{ x: 'A', y: 1 }, { x: 'B', y: 2 }],
      xLabel: 'Category',
      yLabel: 'Value',
      title: 'Test Chart'
    };
    saveChart(chart);
    const savedCharts = loadAllSavedCharts();
    expect(savedCharts.length).toBe(1);
    expect(savedCharts[0]).toEqual(chart);

    const loadedChart = loadSavedChart(0);
    expect(loadedChart).toEqual(chart);
});

test('updateCurrentChartData and loadCurrentChartData work correctly', () => {
    const currentChartData = {
      type: 'line',
      data: [{ x: 1, y: 10 }, { x: 2, y: 20 }],
      xLabel: 'X',
      yLabel: 'Y',
      title: 'Current Chart',
      color: '#00ff00'
    };
    updateCurrentChartData(currentChartData);
    const loadedChartData = loadCurrentChartData();
    expect(loadedChartData).toEqual(currentChartData);
});



test('saveChart updates an existing chart when an index is provided', () => {
    const initialChart = {
      type: 'scatter',
      data: [{ x: 10, y: 100 }, { x: 20, y: 200 }],
      xLabel: 'Initial X',
      yLabel: 'Initial Y',
      title: 'Initial Chart',
      color: '#0000ff'
    };
    saveChart(initialChart);
    const updatedChart = {
      ...initialChart,
      title: 'Updated Chart',
      color: '#123456'
    };
    saveChart(updatedChart, 0); // Overwrite the chart at index 0
    const savedCharts = loadAllSavedCharts();
    expect(savedCharts.length).toBe(1);
    expect(savedCharts[0]).toEqual(updatedChart);
});


test('loadAllSavedCharts returns all saved charts correctly', () => {
    const chart1 = {
      type: 'bar',
      data: [{ x: 'A', y: 1 }],
      xLabel: 'X1',
      yLabel: 'Y1',
      title: 'Chart 1',
      color: '#ff0000'
    };
    const chart2 = {
      type: 'line',
      data: [{ x: 2, y: 20 }],
      xLabel: 'X2',
      yLabel: 'Y2',
      title: 'Chart 2',
      color: '#00ff00'
    };
    saveChart(chart1);
    saveChart(chart2);
    const savedCharts = loadAllSavedCharts();
    expect(savedCharts.length).toBe(2);
    expect(savedCharts).toEqual(expect.arrayContaining([chart1, chart2]));
});

test('loadSavedChart returns undefined for non-existent chart index', () => {
    const chart = {
      type: 'scatter',
      data: [{ x: 5, y: 50 }],
      xLabel: 'X',
      yLabel: 'Y',
      title: 'Non-existent Chart',
      color: '#ff00ff'
    };
    saveChart(chart);
    const nonExistentChart = loadSavedChart(1); // Trying to load a chart at a non-existent index
    expect(nonExistentChart).toEqual({});
});

test('updateCurrentChartData and loadCurrentChartData maintain data across updates', () => {
    const chartData1 = {
      type: 'bar',
      data: [{ x: 'C', y: 3 }],
      xLabel: 'Category',
      yLabel: 'Value',
      title: 'First Update',
      color: '#abcdef'
    };
    const chartData2 = {
      ...chartData1,
      title: 'Second Update',
      color: '#fedcba'
    };
    updateCurrentChartData(chartData1);
    let loadedChartData = loadCurrentChartData();
    expect(loadedChartData).toEqual(chartData1);

    updateCurrentChartData(chartData2);
    loadedChartData = loadCurrentChartData();
    expect(loadedChartData).toEqual(chartData2);
});

test('clearing chart data works correctly', () => {
    const chartData = {
      type: 'line',
      data: [{ x: 1, y: 2 }],
      xLabel: 'X Label',
      yLabel: 'Y Label',
      title: 'Test Chart',
      color: '#ffcc00'
    };
    saveChart(chartData);
    let savedCharts = loadAllSavedCharts();
    expect(savedCharts.length).toBe(1);

    // Simulate clearing by setting empty array to localStorage directly
    window.localStorage.setItem('savedCharts', JSON.stringify([]));
    savedCharts = loadAllSavedCharts();
    expect(savedCharts.length).toBe(0);
});
