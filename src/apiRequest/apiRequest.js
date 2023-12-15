import axios from "axios";

export async function listTaskRequest(){
    try {
        let res=await fetch("https://workmanager-srijonashraf.vercel.app/api/v1");
        let JSONData=await res.json();
        return JSONData['data'];
    }catch (e) {
        return []
    }
}