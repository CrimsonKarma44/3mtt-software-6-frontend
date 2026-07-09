const BACKEND_URL = 'http://localhost:3002';

window.login = async (email, password) => {
    if(!email || !password) {
        const error = new Error("Email and password are required");
        error.status = 400;
        throw error;
    }

    const base = BACKEND_URL || 'http://localhost:3002';
    const response = await fetch(`${base}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData?.message || 'Something went wrong');
        error.status = response.status;
        throw error;
    }

    return response.json();
};

window.register = async (firstname, lastname, email, password) => {
    if(!firstname || !lastname || !email || !password) {
        const error = new Error("Firstname, lastname, email and password are required");
        error.status = 400;
        throw error;
    }

    const base = BACKEND_URL || 'http://localhost:3002';
    const response = await fetch(`${base}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstname, lastname, email, password })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData?.message || 'Something went wrong');
        error.status = response.status;
        throw error;
    }

    return response.json();
};