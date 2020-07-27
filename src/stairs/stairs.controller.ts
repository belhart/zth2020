import { Controller, Get, Query, BadRequestException, Logger } from "@nestjs/common";

@Controller("number-of-steps")
export class StairsController {
    @Get("getNumberOfSteps")
    getNumberOfSteps(@Query() query): Number{
        if ((Object.keys(query).indexOf("numberOfStair") > -1) && (Object.keys(query).indexOf("stepSizeList") > -1)){
            var steps = query.stepSizeList.split(",");
            return countWays(query.numberOfStair,steps[steps.length-1]);
        }
        throw new BadRequestException("Not all required query parameters provided");
    }
}

function countWaysUtil2(n: Number, m: Number){
    let res = new Object();
    Logger.log(n);
    res[0] = 1; 
    res[1] = 1; 
    for (let i = 2; i < n; i++) { 
        res[i] = 0; 
        for (let j = 1; j <= m && j <= i; j++) 
            res[i] += res[i - j]; 
    } 
    Logger.log(res);
    return res[Number(n) - 1]; 
}


function countWays(s: Number, m: Number) 
{ 
    return countWaysUtil2(Number(s) + 1, m); 
}
