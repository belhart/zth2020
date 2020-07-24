import { Controller, Get, Body } from "@nestjs/common";
import { Point } from "./point";

@Controller("squares")
export class SquaresController {
  @Get("/getNumberOfSquares")
  getNumberOfSquares(@Body() listOfPoint: Point[]): number {
    if (listOfPoint.length < 4) return 0;
    if (listOfPoint.length === 4) {
      if (
        isSquare(listOfPoint[0], listOfPoint[1], listOfPoint[2], listOfPoint[3])
      )
        return 1;
      return 0;

    }
    var uniqueIdsToCheck = combine(
      Array.from(Array(listOfPoint.length).keys())
    );
    uniqueIdsToCheck.pop();
    var squares = 0;
    for (var i = 0; i < uniqueIdsToCheck.length; i++) {
      if (
        isSquare(
          listOfPoint[uniqueIdsToCheck[i][0]],
          listOfPoint[uniqueIdsToCheck[i][1]],
          listOfPoint[uniqueIdsToCheck[i][2]],
          listOfPoint[uniqueIdsToCheck[i][3]]
        )
      )
        squares++;
    }
    return squares;
  }
}

function isSquare(point0: Point, point1: Point, point2: Point, point3: Point) {
  var points: Point[] = [point0, point1, point2, point3];
  var isSquare = false;
  var sides = [];
  sides.push(distance(points[0], points[1]));
  sides.push(distance(points[0], points[2]));
  sides.push(distance(points[0], points[3]));
  var equalSide1 = -1;
  var equalSide2 = -1;
  var unequalSide = -1;
  if (sides[0] == sides[1]) {
    if (sides[0] != sides[2]) {
      equalSide1 = 0;
      equalSide2 = 1;
      unequalSide = 2;
    }
  } else if (sides[1] == sides[2]) {
    if (sides[1] != sides[0]) {
      equalSide1 = 1;
      equalSide2 = 2;
      unequalSide = 0;
    }
  } else if (sides[0] == sides[2]) {
    if (sides[0] != sides[1]) {
      equalSide1 = 0;
      equalSide2 = 2;
      unequalSide = 1;
    }
  }
  if (equalSide1 != -1) {
    var opposing = 0;
    switch (unequalSide) {
      case 0:
        opposing = distance(points[2], points[3]);
        break;
      case 1:
        opposing = distance(points[1], points[3]);
        break;
      case 2:
        opposing = distance(points[1], points[2]);
        break;
      default:
        break;
    }
    if (opposing == sides[unequalSide]) {
      var diagonal = opposing;
      var adjacent = sides[equalSide1];
      var stillOK = true;
      for (var a = 0; a < 4; a++) {
        var diagonalCount = 0;
        var adjacentCount = 0;
        for (var b = 0; b < 4; b++) {
          if (a != b) {
            var dist = distance(points[a], points[b]);
            if (dist == diagonal) {
              diagonalCount++;
            } else if (dist == adjacent) {
              adjacentCount++;
            }
          }
        }
        if (!(diagonalCount == 1 && adjacentCount == 2)) {
          stillOK = false;
          break;
        }
      }
      if (stillOK) {
        isSquare = true;
      }
    }
  }

  if (!isSquare) {
    return false;
  }
  return true;
}

function distance(point1, point2) {
  var dist =
    Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2);
  dist = Math.sqrt(dist);
  return dist;
}

var combine = function(a) {
  var fn = function(n, src, got, all) {
    if (n === 0) {
      if (got.length > 0) all[all.length] = got;
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  };
  var all = [];
  fn(4, a, [], all);
  all.push(a);
  return all;
};
