export default function unauthorized(code){
    if(code===401){
        sessionStorage.clear();
        localStorage.clear();
        let lastLocation=window.location
        sessionStorage.setItem("lastLocation",lastLocation);

        window.location.href="/"
    }
}