import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "nasos.mn";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [logoUrl, setLogoUrl] = useState('');

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        } if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        try {
            console.log('url in fetchFoodList:', url); // Add this line
            const response = await axios.get(url + "/api/food/list");
            console.log("Response from API",response)
            setFoodList(response.data.data);
            console.log('food_list after fetchFoodList:', food_list);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    }

    const loadCartdata = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    }

    const fetchLogoUrl = async () => {
        try {
            const response = await axios.get(url + "/api/settings");  // Your API endpoint
            console.log("Logo response: ", response);
            setLogoUrl(response.data.data.logoUrl);  // Access the logoUrl from the response
        } catch (error) {
            console.error("Error fetching logo URL:", error);
            // Optionally, set a default logo URL here
            setLogoUrl('/images/default-logo.png');  // Or use a placeholder
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            await fetchLogoUrl();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartdata(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])

    const ContextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        logoUrl
    }

    console.log('food_list in ContextValue:', food_list);

    return (
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;