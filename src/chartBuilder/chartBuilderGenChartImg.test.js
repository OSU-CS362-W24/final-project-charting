/**
 * @jest-environment jsdom
 */

const path = require('path');

// import { beforeEach, jest } from "@jest/globals";

beforeEach(() => {
    jest.resetModules();
    window.localStorage.clear()
});

const fs = require("fs")
const domTesting = require('@testing-library/dom')
const { hasUncaughtExceptionCaptureCallback } = require("process")
const { default: expect } = require("expect")
const { error } = require("console")
require('@testing-library/jest-dom')
require("whatwg-fetch")
const userEvent = require("@testing-library/user-event").default

function initDomFromFiles(htmlPath, jsPath){
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    require(jsPath)
}


test("testing if generateChartImg retrieves a valid link", async ()=>{
    const htmlAbsolutePath = path.resolve(__dirname, '..',  "bar/bar.html");
    const jsAbsolutePath = path.resolve(__dirname, '..', "bar/bar.js");
    initDomFromFiles(htmlAbsolutePath, jsAbsolutePath)

    const user = userEvent.setup()

    // creates a mock of the generateChartImg to avoid api calls
    jest.mock("../lib/generateChartImg.js")
    const generateChartImgSpy = require("../lib/generateChartImg.js")
    generateChartImgSpy.mockImplementation(function() {
        return "http://placekitten.com/480/480";
    });

    // edits the x-y axis titles of the graph
    const x_input = domTesting.getByLabelText(document, "X label")
    const y_input = domTesting.getByLabelText(document, "Y label")
    await user.type(x_input, "x-label")
    await user.type(y_input, "y-label")
    // adds a data point
    const xval_input = domTesting.getByLabelText(document, "X")
    const yval_input = domTesting.getByLabelText(document, "Y")
    await user.type(xval_input, "1")
    await user.type(yval_input, "2")
    // adds the title to the graph
    const chart_title = domTesting.getByLabelText(document, "Chart title")
    await user.type(chart_title, "simple graph")
    // changes the color
    const chart_color = domTesting.getByLabelText(document, "Chart color")
    chart_color.value = "#ffffff"   // no good way to use userevent
    // generates the chart
    const button = domTesting.getByText(document, "Generate chart")
    await user.click(button)

    // checks to see if the mock generateChartImg has been called
    expect(generateChartImgSpy).toHaveBeenCalledTimes(1);
    expect(generateChartImgSpy.mock.results[0].value).toEqual("http://placekitten.com/480/480");
    // checking if the parameters passed in are correct
    expect(generateChartImgSpy.mock.calls[0][0]).toEqual("bar");
    expect(generateChartImgSpy.mock.calls[0][1]).toEqual([{"x": "1", "y": "2"}]);
    expect(generateChartImgSpy.mock.calls[0][2]).toEqual("x-label");
    expect(generateChartImgSpy.mock.calls[0][3]).toEqual("y-label");
    expect(generateChartImgSpy.mock.calls[0][4]).toEqual("simple graph");
    expect(generateChartImgSpy.mock.calls[0][5]).toEqual("#ffffff");

    generateChartImgSpy.mockRestore()
})