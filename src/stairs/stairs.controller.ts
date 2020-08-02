import { Controller, Get, Query, BadRequestException, Logger } from "@nestjs/common";

@Controller("number-of-steps")
export class StairsController {
    @Get("getNumberOfSteps")
    getNumberOfSteps(@Query() query): Number{
        if ((Object.keys(query).indexOf("numberOfStair") > -1) && (Object.keys(query).indexOf("stepSizeList") > -1)){
            var steps = query.stepSizeList.split(",");
            steps.sort(function(a, b) {
                return Number(a) - Number(b);
            });
            if (steps.length !== Number(steps[steps.length - 1])){
                 const missingSteps = GetMissingSteps(steps); // check if a step is missing
                 return CountWaysMissingSteps(missingSteps, query.numberOfStair, steps[steps.length - 1]);
            }
            return CountWays(query.numberOfStair,steps[steps.length-1]);
        }
        throw new BadRequestException("Not all required query parameters provided");
    }
}

function CountWaysUtilNoMissingSteps(n: Number, m: Number){
    let res = new Object();
    res[0] = 1; 
    res[1] = 1; 
    for (let i = 2; i < n; i++) { 
        res[i] = 0; 
        for (let j = 1; j <= m && j <= i; j++) 
            res[i] += res[i - j]; 
    }
    return res[Number(n) - 1]; 
}

function CountWaysUtilMissingSteps(n: Number, m: Number, missingSteps){
    let res = new Object();
    res[0] = 1; 
    res[1] = 1; 
    for (let i = 2; i < n; i++) { 
        res[i] = 0; 
        for (let j = 1; j <= m && j <= i; j++){
            if (missingSteps.indexOf(j) < 0) res[i] += res[i - j];
        }
    }
    return res[Number(n) - 1]; 
}

function CountWays(s: Number, m: Number) 
{ 
    return CountWaysUtilNoMissingSteps(Number(s) + 1, m); 
}

function CountWaysMissingSteps(missingSteps, s:Number, m:Number)
{ 
    return CountWaysUtilMissingSteps(Number(s) + 1, m, missingSteps);
}

function GetMissingSteps(steps){
    const missingSteps = new Array<Number>();
    for(var i = 2; i < steps[steps.length - 1]; i++)
    { 
        if(Object.keys(steps).indexOf(i.toString()) < 0) missingSteps.push(i);
    }

    return missingSteps;
}
