import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"





// register
export const registerApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}

// login
export const loginApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}

// get user details
export const getUserApi=async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/getuser`,"",reqHeader)
}

// update profile
export const updateApi=async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update`,reqBody,reqHeader)
}

// fetch all users
export const getAllUserApi=async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/users`,"",reqHeader)
}

// fetch previously intracted users
export const getIntractedUsersApi=async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/interacted-users`,"",reqHeader)
}

// fetch chat history for a selected room
export const getChatHistoryApi=async(chatRoom,reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/chat/${chatRoom}`,"",reqHeader)
}
