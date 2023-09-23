
import getApiResponse from "../core/apiCaller";


export const postData = async (formValues) => {

    const response = await getApiResponse(formValues, 'User/Login', 'GET');
    return response;
};

export const changePassword = async (formValues) => {
    console.log(formValues);
    const response = await getApiResponse(formValues, 'User/ChangePassword', 'GET');
    return response;

};


