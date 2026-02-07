const TimeSheet = {
    ADDTIMESHEET: {
        URL: "API/ADDTIMESHEET",
        METHOD: "POST",
    },
    UPDATETIMESHEET:{
        URL:"API/UPDATETIMESHEET",
        METHOD:"PUT",
    },
    DELETETIMESHEET:{
        URL:"API/DELETETIMESHEET",
        METHOD:"DELETE"
    }
};

export const routes = { ...TimeSheet };
