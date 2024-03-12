const sortPoints = require("./sortPoints");

describe(("Validating sorting of an unsorted data points"), function(){

    test(
        "testing unsorted list of size 3 with same y values",
        function(){
            const list = [
                { x: 3, y: 4 },
                { x: 1, y: 4 },
                { x: 2, y: 4 }
            ]
            const answer = [
                { x: 1, y: 4 },
                { x: 2, y: 4 },
                { x: 3, y: 4 }
            ]
            sortPoints(list)
            expect(list).toEqual(answer);
        }
    )

    test(
        "testing unsorted list of size 3 with different y values",
        function(){
            const list = [
                { x: 3, y: 2 },
                { x: 1, y: 3 },
                { x: 2, y: 6 }
            ];

            const answer = [
                { x: 1, y: 3 },
                { x: 2, y: 6 },
                { x: 3, y: 2 }
            ];

            sortPoints(list)
            expect(list).toEqual(answer);
        }
    )

})

describe(("Validating edge cases of low array sizes"), function(){
    test(
        "testing unsorted list of size 1",
        function(){
            const list = [
                { x: 3, y: 4 }
            ]
            const answer = [
                { x: 3, y: 4 }
            ]
            sortPoints(list)
            expect(list).toEqual(answer);
        }
    )

    test(
        "testing unsorted list of size 0",
        function(){
            const list = [
            ]
            const answer = [
            ]
            sortPoints(list)
            expect(list).toEqual(answer);
        }
    )
})

describe(("Validating sorting of sorted data"), function(){
    test(
        "testing sorted list of size 3",
        function(){
            const list = [
                { x: 1, y: 3 },
                { x: 2, y: 6 },
                { x: 3, y: 2 }
            ]
            const answer = [
                { x: 1, y: 3 },
                { x: 2, y: 6 },
                { x: 3, y: 2 }
            ]
            sortPoints(list)
            expect(list).toEqual(answer);
        }
    )

    test(
        "testing sorted list of size 9",
        function(){
            const list = [
                { x: 1, y: 3 },
                { x: 2, y: 6 },
                { x: 3, y: 2 },
                { x: 4, y: 3 },
                { x: 5, y: 6 },
                { x: 6, y: 2 },
                { x: 7, y: 3 },
                { x: 8, y: 6 },
                { x: 9, y: 2 }
            ]
            const answer = [
                { x: 1, y: 3 },
                { x: 2, y: 6 },
                { x: 3, y: 2 },
                { x: 4, y: 3 },
                { x: 5, y: 6 },
                { x: 6, y: 2 },
                { x: 7, y: 3 },
                { x: 8, y: 6 },
                { x: 9, y: 2 }
            ]
            sortPoints(list)
            expect(list).toEqual(answer);
        }
    )
})

describe(("Validating sorting of reversely-sorted data"), function(){
    test(
        "testing sorted list of size 3",
        function(){
            const list = [
                { x: 3, y: 2 },
                { x: 2, y: 6 },
                { x: 1, y: 3 }
            ]
            const answer = [
                { x: 1, y: 3 },
                { x: 2, y: 6 },
                { x: 3, y: 2 }
            ]
            sortPoints(list)
            expect(list).toEqual(answer);
        }
    )

    test(
        "testing sorted list of size 9",
        function(){
            const list = [
                { x: 9, y: 2 },
                { x: 8, y: 6 },
                { x: 7, y: 3 },
                { x: 6, y: 2 },
                { x: 5, y: 6 },
                { x: 4, y: 3 },
                { x: 3, y: 2 },
                { x: 2, y: 6 },
                { x: 1, y: 3 },
            ]
            const answer = [
                { x: 1, y: 3 },
                { x: 2, y: 6 },
                { x: 3, y: 2 },
                { x: 4, y: 3 },
                { x: 5, y: 6 },
                { x: 6, y: 2 },
                { x: 7, y: 3 },
                { x: 8, y: 6 },
                { x: 9, y: 2 }
            ]
            sortPoints(list)
            expect(list).toEqual(answer);
        }
    )
})

describe(("Validating sorting of decimal numbers"), function(){
    test(
        "testing unsorted list of size 3 with same y values",
        function(){
            const list = [
                { x: 3.4, y: 4 },
                { x: 1.1, y: 4 },
                { x: 2.2, y: 4 }
            ]
            const answer = [
                { x: 1.1, y: 4 },
                { x: 2.2, y: 4 },
                { x: 3.4, y: 4 }
            ]
            sortPoints(list)
            expect(list).toEqual(answer);
        }
    )
})

describe(("Validating sorting of negative numbers"), function(){
    test(
        "testing unsorted list of size 3 with same y values",
        function(){
            const list = [
                { x: -3.4, y: 4 },
                { x: -1.1, y: 4 },
                { x: -2.2, y: 4 }
            ]
            const answer = [
                
                { x: -3.4, y: 4 },
                { x: -2.2, y: 4 },
                { x: -1.1, y: 4 }
            ]
            sortPoints(list)
            expect(list).toEqual(answer);
        }
    )
})