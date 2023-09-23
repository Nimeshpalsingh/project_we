import Variables from '../../common/Variables';
import Cookies from 'universal-cookie';
import { uid } from 'uid';

export async function getApiResponse(formData, apiUrl, apiType = 'POST') {

    const baseUrl = Variables.IsLive ? Variables.LiveApiBaseUrl : Variables.LocalApiBaseUrl;

    let apiResponse = undefined;
    let token = '';
    const cookies = new Cookies();
    const deviceId = cookies.get('DeviceId');

    if (!deviceId) {
        const randomDeviceId = generateRandomUID();
        cookies.set('DeviceId', randomDeviceId, { path: '/' });
        formData.DeviceId = randomDeviceId;
    } else {
        formData.DeviceId = deviceId;
    }

    function generateRandomUID() {
        return uid(16);;
    }

    if (apiType == 'POST' && apiUrl.toString().indexOf('?', 0) > -1) {

        let queryString = '';
        for (let key in formData) {
            if (queryString != '') {
                queryString += '&';
            }
            queryString += key.toString() + '=' + formData[key].toString()
        }

        apiUrl += queryString;
        console.log('POST - ' + baseUrl + apiUrl);

        apiResponse = await fetch(
            baseUrl + 'api/' + apiUrl,
            {
                method: 'POST',
                headers: {
                    //'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

    }
    else if (apiType == 'POST') {
        console.log('POST - ' + baseUrl + apiUrl);

        apiResponse = await fetch(
            baseUrl + 'api/' + apiUrl,
            {
                method: 'POST',
                headers: {
                    //'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(formData)
            }
        );
    } else {

        let queryString = '';
        for (let key in formData) {
            if (queryString != '') {
                queryString += '&';
            }
            queryString += key.toString() + '=' + formData[key].toString()
        }
        apiUrl += '?' + queryString;

        console.log('GET - ' + baseUrl + 'api/' + apiUrl);

        //console.log(token);

        apiResponse = await fetch(
            baseUrl + 'api/' + apiUrl,
            {
                method: 'GET'
            }
        );

    }

    const textResponse = await apiResponse.text();
    // console.log(textResponse);
    if (!apiResponse.ok) {
        console.log(textResponse + '\n\n\n');
        throw new Error('Unable to connect to the server' + apiResponse.status);
    }

    const jsonResponse = JSON.parse(textResponse);

    console.log(jsonResponse);

    return jsonResponse;

}

export default getApiResponse
























// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationActions } from 'react-navigation';

// import Variables from '../../constants/Variables';

// export async function getApiResponse(formData, apiUrl) {

//     //console.log((Variables.IsLive ? Variables.LiveApiBaseUrl : Variables.LocalApiBaseUrl) + apiUrl);
//     const userData = await AsyncStorage.getItem('userData');
//     if (userData) {
//         const objData = JSON.parse(userData);
//         const { mobile, password } = objData;

//         formData.append('login_mobile', mobile);
//         formData.append('login_password', password);
//     }

//     const baseUrl = Variables.IsLive ? Variables.LiveApiBaseUrl : Variables.LocalApiBaseUrl;

//     console.log(baseUrl + 'api/' + apiUrl);

//     const apiResponse = await fetch(
//         baseUrl + 'api/' + apiUrl,
//         {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'multipart/form-data'
//             },
//             body: formData
//         }
//     );

//     if (!apiResponse.ok) {
//         console.log(apiResponse);
//         throw new Error('Unable to connect to the server' + apiResponse.status);
//     }

//     const textResponse = await apiResponse.text();

//     let jsonResponse = '';
//     try {
//         jsonResponse = JSON.parse(textResponse);
//     } catch (err) {
//         console.log(textResponse + '\n\n\n');
//         throw new Error(err.message);
//     }

//     if (jsonResponse.status == 'Error') {
//         console.log(textResponse + '\n\n\n');
//         throw new Error(jsonResponse.message);
//     }

//     return jsonResponse;
// }
// const apiResponse = await fetch(
//     baseUrl + 'api/' + apiUrl,
//     {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'multipart/form-data'
//         },
//         body: formData
//     }
// ); // if (!response.data) {

//     throw new Error('Unable to connect to the server' + response.data.status);
// }

// const textResponse = await apiResponse.text();

// let jsonResponse = '';
// try {
//     jsonResponse = JSON.parse(textResponse);
// } catch (err) {
//     console.log(textResponse + '\n\n\n');
//     throw new Error(err.message);
// }

// if (jsonResponse.status == 'Error') {
//     console.log(textResponse + '\n\n\n');
//     throw new Error(jsonResponse.message);
// }

// return jsonResponse;