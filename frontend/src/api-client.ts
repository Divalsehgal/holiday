import { RegisterFormProps } from "./pages/register";
import { SignInProps } from "./pages/signin";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormProps) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",// tell browser to set cookies
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
};

export const sigin = async (formData: SignInProps) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",// tell browser to set cookies
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
}


export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include", // tell browser to set cookies
    });


    if (!response.ok) {
        throw new Error("Token invalid");
    }
};


export const logout = async () => {

    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include", // tell browser to set cookies
        method: "POST"
    });

    if (!response.ok) {
        throw new Error("Error during logout");
    }

};



export const addMyHotel = async (hotelFormData: FormData) => {
     console.log(hotelFormData);
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData,
    });
    console.log(response)
    if (!response.ok) {
        throw new Error("Failed to add hotel");
    }

    return response.json();
};

