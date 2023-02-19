

/***
 * this used to calculate the dijigstra calculation 
 * @input du is d[u] the selected building value
 * @input cuv is c(u,v) the distance between the selected building and neghborin building
 * @input dv is d[v] the neghibor building value
 * 
 * @returns d[v]
 */
function calculator(du,cuv,dv){
    /**
     * the formula for this d[u] + c(u,v) < d[v]
     */

    let localDv

    localDv = du + cuv
    if(dv == 'infinity'){
        return localDv
    }
   else{
    if(localDv < dv)
    return localDv
else
    return dv
   }

}



/**
 * this. table initializer
 * @input list of the building 
 * @input starting building
 * @return routing table 
 */

function initialize (buildingList,start){
    let buildingKeys = []
    let inputRow = {}
    let resultValue = {}
    buildingKeys = Object.keys(buildingList)
    
    // inputRow = 
    buildingKeys.forEach(element=>{
        if(element == start)
            resultValue[element] = 0
        else
            resultValue[element] = 'infinity'
    })

    // inputRow{start : resultValue}
    
    inputRow[start] = resultValue

    return inputRow
}

/**
 * this is used to extract the value from the table and 
 * @input routTable -- [{A: {A:0,B: 'infinity',C:'inifinity',...}}]
 * @input neighbors     {B:10,C:5}
 * @return c(u,v) and d[v]
 */

function valueExtraction(routTable,neighbors){

   
    let lastTableValue  // take the last table value
    let visitedKey  // the visited key variable
    let du  // take d[u]
    let cuv // take c(u,v)
    let dv // take d[v]
    let visitedValue // {A : {A:0,B:'infinity',C:'inifinity',...}} from this it takes this {A:0,B:'infinity',C:'inifinity',...}
    let neighborKey = Object.keys(neighbors) // [B,C]
    let neighborValue = Object.values(neighbors) // [10,5]
    let distance = {} // to take the distance value
    let distanceKey = []
    let result = {}
    let temp,tempKey

    lastTableValue =  routTable.pop() // {A : {A:0,B:'infinity',C:'inifinity',...}} from this it takes this {A:0,B:'infinity',C:'inifinity',...}

    visitedKey = Object.keys(lastTableValue) // A
  

    visitedValue = Object.values(lastTableValue) // {A:0,B:'infinity',C:'inifinity',...}} from this it takes this {A:0,B:'infinity',C:'inifinity',...}
    

    
    du = visitedValue[0][visitedKey[0]] // 0


    // visitedValue.forEach(visited=>{

    // })


    
    neighborKey.forEach(element=>{
    
           distance[element] = calculator(du,neighbors[element],visitedValue[0][element])
           visitedValue[0][element] = distance[element]
        })
        // this is for last keys if the neigbor is not more than one
    delete visitedValue[0][visitedKey] // delete the previos visited key or building

        if(neighborKey.length <= 1){

            let notVisitedKeys = Object.keys(visitedValue[0]) // 
            temp = visitedValue[0][notVisitedKeys[0]]
            tempKey = notVisitedKeys[0]
            notVisitedKeys.forEach(element=>{
                if(visitedValue[0][element] < temp){
                    temp = visitedValue[0][element]
                    tempKey = element
                }
            })
        }
    else {
        temp = distance[neighborKey[0]] // take the first neightbor value
     tempKey = neighborKey[0] // take the the first neighbor key

    neighborKey.forEach(element=>{
        if(distance[element] < temp)
        {
            temp = distance[element]
            tempKey = element
        }
    })
    }
     
    

    result[tempKey] = visitedValue[0] // {visitedKey: {A:0,}}

    // console.log(result)
    return result // {C :{B:10,C:5,D:'infinity',E:'infinity'}}

}

/***
 * the main function accept the list of building and selectedBuildign
 * 
 * 
 */



function delivery_route_optimization(buildingList = {},selectedBuilding){

    // take the keys of the 
    let buildingKeys = Object.keys(buildingList)
    let initial = 0
    let neighborKeys = []
    let routTable = []
    let mainTable = {}
    let inputRow = {}

    let tableMap = new Map()
    // first shift the selected building to front

    const foundIdx = buildingKeys.findIndex(el => el == selectedBuilding)
    buildingKeys.splice(foundIdx, 1)
    buildingKeys.unshift(selectedBuilding)

    // ==============
    
    routTable.push(initialize(buildingList,selectedBuilding))
    let extractedValue
    mainTable = initialize(buildingList,selectedBuilding)
    tableMap.set(Object.keys(mainTable)[0],Object.values(mainTable)[0])
    
   
    // this loop for the building rout calculation and make tables 
    // for(let i = 0;i <= buildingKeys.length; i++){
        let i = 0

   let keys = []
   let values = []
   let shiftedKey 
   let shiftedValue
   let path = [selectedBuilding]
   let prePathValue = []
   console.log(mainTable)

   
    while(1){
        
        extractedValue = valueExtraction(routTable,buildingList[buildingKeys[0]])
        routTable.push(extractedValue)

        console.log(extractedValue)
        let extractKey = Object.keys(extractedValue)[0]
        let extractValue = Object.values(extractedValue)[0]

        prePathValue.push(extractValue[extractKey])

        shiftedKey =buildingKeys.shift()
        
       
        path.push(extractKey)
        const foundIdx = buildingKeys.findIndex(el => el == extractKey)
        buildingKeys.splice(foundIdx, 1)
        buildingKeys.unshift(extractKey[0])

        result = extractedValue
        if(buildingKeys.length <= 1)
        break;

        i++


    }

    // console.log(tableMap)
   
    console.log('our shortest path from A is D and D to A')
    console.log(result)
}



// inuput list of buildinng 
let BuildingList = {
    A : {C : 5, B : 10},
    B:  {D: 1},
    C : {B : 3, D : 9,E : 2},
    D : { },
    E:  { D: 6}
}

// callback for the main function
delivery_route_optimization(BuildingList,'A')

