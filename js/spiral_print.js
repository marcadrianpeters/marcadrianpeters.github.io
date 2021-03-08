
// Input: 2 dimensional array with size nxn 
// Output: 2 2 dimensional array with size nxn but entries are rearranged in a spiral form
 
function spiralPrint(arr) {
    var i, k = 0, l = 0;
    var second_array = JSON.parse(JSON.stringify(arr));
    var number = arr.length*arr[0].length-1;
    var m = arr.length;
    var n = arr[0].length;

    /*
        k - starting row index
        m - ending row index
        l - starting column index
        n - ending column index
        i - iterator  
    */
 
    while (k < m && l < n) {
        // print the first row from the remaining rows
        for (i = l; i < n; ++i) {
            add_entry_to_2d_array(second_array,arr[k][i],number);
            number--;
        }
        k++;
 
        // print the last column from the remaining columns
        for (i = k; i < m; ++i) {
            add_entry_to_2d_array(second_array,arr[i][n-1],number);
            number--;
        }
        n--;
 
        // print the last row from the remaining rows
        if (k < m) {
            for (i = n - 1; i >= l; --i) {
                add_entry_to_2d_array(second_array,arr[m-1][i],number);
                number--;
            }
            m--;
        }
 
        // print the first column from the remaining columns
        if (l < n) {
            for (i = m - 1; i >= k; --i) {
                add_entry_to_2d_array(second_array,arr[i][l],number);
                number--;
            }
            l++;
        }
    }
    return second_array;
}

// This code is contributed by karthiksrinivasprasad (modified version)

 
function add_entry_to_2d_array(array,entry,number){
    array[Math.floor(number/array.length)][number%array.length] = entry;
}

function generate_2d_square_array(dimension){
    var arr = Array(dimension)

    for(var i = 0; i < arr.length; i++){
        arr[i] = Array(dimension);
    
        for(var j = 0; j < arr[0].length; j++){
            arr[i][j] = 9*i + j;
        }
    }

    return arr;
}

function print_2d_array(arr){
    document.write("<br>");
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr[i].length; j++){
            document.write(arr[i][j] + ' ');
        }
        document.write("<br>");
    }
}

function reverse_values(arr,reverse_value){
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr[i].length; j++){
            arr[i][j] = Math.abs(arr[i][j]-reverse_value+1);
        }
    }
    return arr;
}

/*
var arr = generate_2d_square_array(9);
print_2d_array(arr);
arr = spiralPrint(arr);
print_2d_array(arr);
*/
 
