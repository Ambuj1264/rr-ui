export const sidebar =(boolean:boolean)=>{
  return {
    type: "sidebar",
    payload:boolean
  }
}

export const calenderAction= (data: any)=>{
    return {
        type: "calender",
        payload: data
    }
}

export const packageAction = (data: any)=>{
    return {
        type: "package",
        payload: data
    }
}