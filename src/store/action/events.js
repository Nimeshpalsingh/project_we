import getApiResponse from "../core/apiCaller";


// games event cricket soccer tennis -page
export const getEvents = async (formValues) => {
    const response = await getApiResponse(formValues, 'Event/GetAll', 'GET');
    return response;
};