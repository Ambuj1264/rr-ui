

    const initialReservation={
        payload: []
    }

 

    export const reservation = (state= initialReservation, action: any)=>{
        if (action.type === "calender") {
            return { ...state, payload: action.payload };
          } else {
            return state;
          }
    }
    export const packageReducer = (state= initialReservation, action: any)=>{
        if (action.type === "package") {
            return { ...state, payload: action.payload };
          } else {
            return state;
          }
    }