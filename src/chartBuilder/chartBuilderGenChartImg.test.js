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

    jest.mock("../lib/generateChartImg.js")
    const generateChartImgSpy = require("../lib/generateChartImg.js")
    generateChartImgSpy.mockImplementation(function() {
        return "http://placekitten.com/480/480";
    });

    const x_input = domTesting.getByLabelText(document, "X label")
    const y_input = domTesting.getByLabelText(document, "Y label")
    await user.type(x_input, "0")
    await user.type(y_input, "0")
    const addNew = domTesting.getByText(document, "Generate chart")
    const xval_input = domTesting.getByLabelText(document, "X")
    const yval_input = domTesting.getByLabelText(document, "Y")
    await user.type(xval_input, "1")
    await user.type(yval_input, "2")
    const button = domTesting.getByText(document, "Generate chart")
    await user.click(button)

    expect(generateChartImgSpy).toHaveBeenCalledTimes(1);
    expect(generateChartImgSpy.mock.results[0].value).toEqual("http://placekitten.com/480/480");

    generateChartImgSpy.mockRestore()
})