export function perDayData(records){
    let data=records.map(recordItem=>({"time":recordItem.time, "severity":recordItem.severity}))
    return data
}

export function perSymptomData(symptom){
    let data=symptom.severity.map(day=>{
        let avg=day.records.reduce((acc,curr)=>acc+curr.severity,0)
        return {"date":day.date, "avgSeverity":+(avg/day.records.length).toFixed(2)}
    })
    return data
}