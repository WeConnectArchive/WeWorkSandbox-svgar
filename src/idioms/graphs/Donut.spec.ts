import Donut from "./Donut";
import { expect } from "chai";
import "mocha";

describe("When debugging donut output", () => {

    //let start = new Date().getTime();
    let dwg = new Donut([1, 2, 3, 4, 8, 2, 6], ["one", "two", "three", "four"], ["#ff0000", "#00ff00"]).Build().Compile(undefined, 200, 200);
    //console.log(new Date().getTime() - start);

    it("should log info to console", () => {
        //console.log(dwg);
    })
})