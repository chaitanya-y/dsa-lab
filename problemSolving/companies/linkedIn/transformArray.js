const userSkills = [
  {
    skill: "react",
    user: "Alice"
  },
  {
    skill: "CSS",
    user: "Bob"
  },
  {
    skill: "Node.js",
    user: "Charlie"
  },
  {
    skill: "Python",
    user: "Alice"
  },
  {
    skill: "html",
    user: "David"
  },
  {
    skill: "html",
    user: "chaitanya"
  },{
    skill: "html",
    user: "vinod"
  },
  {
    skill: "CSS",
    user: "Bob"
  }
];


function transfromSkills(endorsements){
    
    if(!Array.isArray(endorsements)){
        return "Input should be an array"
    }
     let transformedSkills = [];
     let tempSkills = {};
    for(let index in endorsements){
        let entry = tempSkills[endorsements[index]];
        
        if(Object.hasOwn(tempSkills,endorsements[index].skill)){
         tempSkills[endorsements[index].skill].push(endorsements[index].user)
        }else{
            tempSkills[endorsements[index].skill] = [endorsements[index].user]
        }
    
        
    }
    console.log(tempSkills)
    
    console.log(Object.entries(tempSkills))
   transformedSkills = Object.entries(tempSkills).map(([skill,user])=>{
        return {
            skill,
            user,
            count:user.length
        }
    })
    
    console.log(transformedSkills.sort((a,b) => b.count - a.count))
    
    
     
    // return endorsements
}
// Example: Print the list to the console
console.log(transfromSkills(userSkills));