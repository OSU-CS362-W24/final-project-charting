/**
 * @jest-environment jsdom
 */

const fs = require("fs")
const domTesting = require('@testing-library/dom')
require('@testing-library/jest-dom')
const userEvent = require("@testing-library/user-event").default
const html = __dirname + "/bar.html"
const js = __dirname + "/bar.js"

function initDomFromFiles(htmlPath, jsPath) {
	const html = fs.readFileSync(htmlPath, 'utf8')
	document.open()
	document.write(html)
	document.close()
	require(jsPath)
}

beforeEach(function() {
    jest.resetModules()
    window.localStorage.clear()
})

test("adding values in the chart builder", async function() {
    initDomFromFiles(html, js)
    const addBtn = await domTesting.findByText(document, "+")
    const xAxis = await domTesting.getByLabelText(document, "X label")
    const yAxis = await domTesting.getByLabelText(document, "Y label")
    const xValue = await domTesting.getByLabelText(document, "X")
    const yValue = await domTesting.getByLabelText(document, "Y")

    await userEvent.type(xAxis, "X")
    await userEvent.type(yAxis, "Y")
    await userEvent.type(xValue, "1")
    await userEvent.type(yValue, "2")
    await userEvent.click(addBtn)

    const xValues = domTesting.queryAllByLabelText(document, "X")
    const yValues = domTesting.queryAllByLabelText(document, "Y")
    expect(xValues.length).toBe(2)
    expect(yValues.length).toBe(2)
    expect(xValues[0]).toHaveValue("1")
    expect(yValues[0]).toHaveValue(2)
    expect(xValues[1]).toHaveValue("")
    expect(yValues[1]).toHaveValue(null)
    expect(xAxis).toHaveValue("X")
    expect(yAxis).toHaveValue("Y")
})

describe("alerts displayed for missing chart data", function() {
    test("no data", async function() {
        initDomFromFiles(html, js)
        const xAxis = await domTesting.getByLabelText(document, "X label")
        const yAxis = await domTesting.getByLabelText(document, "Y label")
        const generateChartBtn = await domTesting.findByText(document, "Generate chart")
        const spy = jest.spyOn(window, "alert")
    
        await userEvent.type(xAxis, "X")
        await userEvent.type(yAxis, "Y")
        await userEvent.click(generateChartBtn)
        
        expect(spy).toHaveBeenCalledTimes(1)
        const alert = spy.mock.lastCall[0]
        expect(alert).toBe("Error: No data specified!")
        spy.mockRestore()
    })

    test("no x or y labels", async function() {
        initDomFromFiles(html, js)
        const xValue = await domTesting.getByLabelText(document, "X")
        const yValue = await domTesting.getByLabelText(document, "Y")
        const generateChartBtn = await domTesting.findByText(document, "Generate chart")
        const spy = jest.spyOn(window, "alert")
        
        await userEvent.type(xValue, "1")
        await userEvent.type(yValue, "2")
        await userEvent.click(generateChartBtn)
        
        expect(spy).toHaveBeenCalledTimes(1)
        const alert = spy.mock.lastCall[0]
        expect(alert).toBe("Error: Must specify a label for both X and Y!")
        spy.mockRestore()
    })
})

test("clearing chart data", async function() {
    initDomFromFiles(html, js)
    const addBtn = await domTesting.findByText(document, "+")
    const clearBtn = await domTesting.findByText(document, "Clear chart data")
    const title = await domTesting.getByLabelText(document, "Chart title")
    const color = await domTesting.getByLabelText(document, "Chart color")
    const xAxis = await domTesting.getByLabelText(document, "X label")
    const yAxis = await domTesting.getByLabelText(document, "Y label")
    await userEvent.click(addBtn)
    xValues = await domTesting.queryAllByLabelText(document, "X")
    yValues = await domTesting.queryAllByLabelText(document, "Y")

    await userEvent.type(title, "Title")

    color.value = "ffffff"  //don't know if this is allowed but not sure if there's a better way to do it
                            //feel free to suggest ideas
    
    await userEvent.type(xAxis, "X")
    await userEvent.type(yAxis, "Y")
    await userEvent.type(xValues[0], "1")
    await userEvent.type(yValues[0], "2")
    await userEvent.type(xValues[1], "3")
    await userEvent.type(yValues[1], "4")
    await userEvent.click(clearBtn)
    
    xValues = await domTesting.queryAllByLabelText(document, "X")
    yValues = await domTesting.queryAllByLabelText(document, "Y")
    expect(title).toHaveValue("")
    expect(color).toHaveValue("#ff4500")
    expect(xAxis).toHaveValue("")
    expect(yAxis).toHaveValue("")
    expect(xValues.length).toBe(1)
    expect(yValues.length).toBe(1)
    expect(xValues[0]).toHaveValue("")
    expect(yValues[0]).toHaveValue(null)
})
