const generateChartImg = require('../generateChartImg');
const { expect, test } = require('@jest/globals');

test('invalid chart type', async () => {
   const type = 'invalid';
   const data = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
   ];
   const xLabel = 'x';
   const yLabel = 'y';
   const title = 'test invalid chart';
   const color = 'blue';

   await expect(
      generateChartImg(type, data, xLabel, yLabel, title, color)
   ).rejects.toThrow();
});

test('bar chart', async () => {
   const type = 'bar';
   const data = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
   ];
   const xLabel = 'x';
   const yLabel = 'y';
   const title = 'test bar chart';
   const color = 'blue';

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});

test('line chart', async () => {
   const type = 'line';
   const data = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
   ];
   const xLabel = 'x';
   const yLabel = 'y';
   const title = 'test line chart';
   const color = 'blue';

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});

test('scatter chart', async () => {
   const type = 'scatter';
   const data = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
   ];
   const xLabel = 'x';
   const yLabel = 'y';
   const title = 'test scatter chart';
   const color = 'blue';

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});

test('hex color short (e.g. #FFF)', async () => {
   const type = 'scatter';
   const data = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
   ];
   const xLabel = 'x';
   const yLabel = 'y';
   const title = 'test short hex color chart';
   const color = '#FFF';

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});

test('hex color long (e.g. #FFFFFF)', async () => {
   const type = 'scatter';
   const data = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
   ];
   const xLabel = 'x';
   const yLabel = 'y';
   const title = 'test long hex color chart';
   const color = '#FFFFFF';

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});

test('null color', async () => {
   const type = 'scatter';
   const data = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
   ];
   const xLabel = 'x';
   const yLabel = 'y';
   const title = 'test null color chart';
   const color = null;

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});

test('empty data array', async () => {
   const type = 'scatter';
   const data = [];
   const xLabel = 'x';
   const yLabel = 'y';
   const title = 'test empty data chart';
   const color = 'blue';

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});

test('null data array', async () => {
   const type = 'scatter';
   const data = null;
   const xLabel = 'x';
   const yLabel = 'y';
   const title = 'test null data chart';
   const color = 'blue';

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});

test('data array only x values', async () => {
   const type = 'scatter';
   const data = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }];
   const xLabel = 'x';
   const yLabel = 'y';
   const title = 'test only x data chart';
   const color = 'blue';

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});

test('data array only y values', async () => {
   const type = 'scatter';
   const data = [{ y: 1 }, { y: 2 }, { y: 3 }, { y: 4 }];
   const xLabel = 'x';
   const yLabel = 'y';
   const title = 'test only y data chart';
   const color = 'blue';

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});

test('data array undefined x and y values', async () => {
   const type = 'scatter';
   const data = [{}, {}, {}, {}];
   const xLabel = 'x';
   const yLabel = 'y';
   const title = 'test undefined data chart';
   const color = 'blue';

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});

test('null x and y data values', async () => {
   const type = 'scatter';
   const data = [
      { x: null, y: null },
      { x: null, y: null },
      { x: null, y: null },
      { x: null, y: null },
   ];
   const xLabel = 'x';
   const yLabel = 'y';
   const title = 'test null color chart';
   const color = 'blue';

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});

test('empty x label', async () => {
   const type = 'scatter';
   const data = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
   ];
   const xLabel = '';
   const yLabel = 'y';
   const title = 'test empty x label chart';
   const color = '#FFF';

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});

test('null x label', async () => {
   const type = 'scatter';
   const data = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
   ];
   const xLabel = null;
   const yLabel = 'y';
   const title = 'test null x label chart';
   const color = '#FFF';

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});

test('empty y label', async () => {
   const type = 'scatter';
   const data = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
   ];
   const xLabel = 'x';
   const yLabel = '';
   const title = 'test empty y label chart';
   const color = '#FFF';

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});

test('null y label', async () => {
   const type = 'scatter';
   const data = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
   ];
   const xLabel = 'x';
   const yLabel = null;
   const title = 'test null y label chart';
   const color = '#FFF';

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});

test('empty title', async () => {
   const type = 'scatter';
   const data = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
   ];
   const xLabel = 'x';
   const yLabel = '';
   const title = '';
   const color = '#FFF';

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});

test('null title', async () => {
   const type = 'scatter';
   const data = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
   ];
   const xLabel = 'x';
   const yLabel = '';
   const title = null;
   const color = '#FFF';

   const result = await generateChartImg(
      type,
      data,
      xLabel,
      yLabel,
      title,
      color
   );

   // Match the blob URL with a UUID at the end
   expect(result).toMatch(
      /^blob:nodedata:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
   );
});
