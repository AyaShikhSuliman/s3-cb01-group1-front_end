import jwt_decode from "jwt-decode";

const TokenManager={
    getToken: () => localStorage.getItem("accessToken"),

    setToken: (token) =>{
        localStorage.setItem("accessToken", token)
        const claims = jwt_decode(token)
        localStorage.setItem("claims", JSON.stringify(claims));
        return claims
    },
    clearToken:()=>{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("claims");
    }
}

export default TokenManager;