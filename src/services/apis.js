import axios from 'react-native-axios'
import Config from 'react-native-config';

const BASE_URL = Config.API_BASE_URL;

const getApi = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL} ${endpoint}`, {
            headers: {
                "Content-type": 'Application/json',
                'Accept': "*",
            }
        })
        return response

    } catch (err) {
        if (error.response) {
            console.log(error.response.data.message)
            return { data: "", message: error.response.data.message };
        } else {
            return { data: "", message: error?.message }
        }
    }

}

const postApi = (endpoint, data) => {
    console.log(endpoint, "api endpoint and params and token =====>")
    console.log("Endpoint", BASE_URL + endpoint);
    console.log("params", data)
    console.log("==============================");
    
    return new Promise((resolve, reject) => {
        try {
            axios.post(BASE_URL + endpoint, data, {
                headers: {
                    'Accept': "*",
                    "Content-Type": "application/json",
                },

            }).then((response) => {
                resolve(response.data);
            })
                .catch((error) => {
                    console.error('api error ==> ', error);
                    reject(error);
                });
        }
        catch (err) {
            console.error('err', err);
        }
    });
}

const getMultipleApiCall = async (url) => {
    try {

        const [user, post] = await Promise.all(
            [
                axios.get(url[0], {
                    headers: {
                        'Content-type': 'Application/json'
                    }
                }),
                axios.get(url[1], {
                    headers: {
                        'Content-type': 'Application/json'
                    }
                })
            ]
        )

        return { user, post }
    } catch (err) {
        return err
    }
}

export { getApi, postApi, getMultipleApiCall };