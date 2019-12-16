const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/', (req, res) => {
    console.log(req.body)
    if (req.body["operation"] == "addition") {
        var num = 0;
        for (const key in req.body) {
            if (req.body[key] != "addition") {
                var temp = parseInt(req.body[key]);
                if (isNaN(temp))
                    res.status(500).send({ "Error": "Enter numbers" });
                num = num + temp;
            }
        }
        res.send({ result: num });
    }
    if (req.body["operation"] == "stringEval") {
        var input_string = req.body["string_input"];
        var re = /(\+|\*|\-|\/)/;
        var input_arr = input_string.split(re);

        function getAllIndexes(str, val) {
            var indexes = [], i = -1;
            while ((i = str.indexOf(val, i + 1)) != -1) {
                indexes.push(i);
            }
            return indexes;
        }

        var divIndexes = getAllIndexes(input_arr, "/");

        for (i = 0; i <= divIndexes.length - 1; i++) {
            nLeft = parseFloat(input_arr[divIndexes[i] - 1]);
            nRight = parseFloat(input_arr[divIndexes[i] + 1]);
            nVal = nLeft / nRight;
            input_arr[divIndexes[i] - 1] = nVal;
            input_arr.splice(divIndexes[i], 2);
            divIndexes = getAllIndexes(input_arr, "/");
            i--;
        }

        var MulIndexes = getAllIndexes(input_arr, "*");

        for (i = 0; i <= MulIndexes.length - 1; i++) {
            nLeft = parseFloat(input_arr[MulIndexes[i] - 1]);
            nRight = parseFloat(input_arr[MulIndexes[i] + 1]);
            nVal = nLeft * nRight;
            input_arr[MulIndexes[i] - 1] = nVal;
            input_arr.splice(MulIndexes[i], 2);
            MulIndexes = getAllIndexes(input_arr, "*");
            i--;
        }

        var nResult = parseFloat(input_arr[0]);
        for (i = 1; i < input_arr.length - 1; i++) {
            if (input_arr[i] == '+') {
                nResult = nResult + parseFloat(input_arr[i + 1]);
            } else if (input_arr[i] == '-') {
                nResult = nResult - parseFloat(input_arr[i + 1]);
            }
            i++;
        }

        var evalResult = eval(input_string);
        res.send({ result: nResult, evalresult: evalResult });
    }

    if (req.body["operation"] == "arrEval") {
        var input_string = req.body["arr_input"];
        var input_arr = input_string.split(',');

        var first = 0;
        var second = 0;

        for (i = 0; i < input_arr.length ; i++) {
            if (input_arr[i] >= first) {
                second = first;
                first = input_arr[i];
            }

            else if(input_arr[i] > second & input_arr[i] != first){
                second = input_arr[i];
            }
        }
        res.send({ firstHighest: first , secondHighest: second });
    }

});

module.exports = router;