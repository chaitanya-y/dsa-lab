// console.log("valid anagram brute force approach")
// function validAnagram(string1,string2){
//     let s1 = string1.split("").sort().join("")
//     let s2 = string2.split("").sort().join("")

//     return s1 === s2
// }


console.log("valid anagram Optimizedd approach")

function validAnagram(string1,string2){
 if(string1.length !== string2.length){
    return false
 }
    let count={}

    for(let char of string1){
        count[char] = (count[char] || 0) + 1;
    }

    for(let char of string2){
        if(!count[char]){
            return false
        }
        count[char]++
    }
    return true
}



console.log("valid anagram",validAnagram("anagram","nagaram"))
