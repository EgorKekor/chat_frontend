import { postRequest, deleteRequest, getRequest, putRequest, RetardsPostRequest } from "./ajax.js";


export async function getRooms() {
    let response = await getRequest("/rooms");
    if (!response) {
        return null;
    }
    if (response.status === 500) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Cannot get room list: ${response.statusText}`);
    }

    const roomList = await response.json();
    return roomList;
}


export async function createRoom(roomName) {
    let response = await postRequest("/room/create/" + roomName);
    if (!response) {
        return null;
    }
    if (response.status === 500) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Cannot create room: ${response.statusText}`);
    }

    const resultMesssage = await response.json();
    return resultMesssage;
}


export async function enterRoom(userName, roomName) {
    let response = await postRequest("/room/enter/" + roomName + "/" + userName);
    if (!response) {
        return null;
    }
    if (response.status === 500) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Cannot enter room: ${response.statusText}`);
    }

    const resultMesssage = await response.json();
    return resultMesssage;
}


export async function postMessage(roomName, userName, messageObj) {
    let response = await postRequest("/message/send/" + roomName + "/" + userName, JSON.stringify(messageObj));
    if (!response) {
        return null;
    }
    if (response.status === 500) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Cannot send message: ${response.statusText}`);
    }

    const resultMesssage = await response.json();
    return resultMesssage;
}


export async function getReadInfo(roomName) {
    let response = await getRequest("/room/read/" + roomName);
    if (!response) {
        return null;
    }
    if (response.status === 500) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Cannot read notify: ${response.statusText}`);
    }

    const resultMesssage = await response.json();
    return resultMesssage;
}


