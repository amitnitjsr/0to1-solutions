import Data from '../assets/data/shoppingData';

const iState = {
    list: Data,
    cartData: [],
    totalPrice: 0
};

const reducer = (state = iState, action) => {
    switch (action.type) {
        case "pushListCarts":
            // Add carts values
            if (state.cartData.length === 0) {
                const pr = state.list.filter(f => f.id === action.payload.id)
                return {
                    "cartData": pr,
                    "list": state.list,
                    "totalPrice": state.totalPrice + parseInt(pr[0].price, 10)
                };
            }
            const existingProduct = state.cartData.filter(val => val.id === action.payload.id);

            if (existingProduct.length > 0) {
                const withOutExistProduct = state.cartData.filter(val => val.id !== action.payload.id)
                const upDatedUnitsProduct = {
                    ...existingProduct[0],
                    count: existingProduct[0].count + action.payload.count
                }
                return {
                    "cartData": [...withOutExistProduct, upDatedUnitsProduct],
                    "list": state.list,
                    "totalPrice": state.totalPrice + parseInt(existingProduct[0].price, 10)
                }
            }
            else {
                const n = state.list.filter(f => f.id === action.payload.id)
                return {
                    "cartData": [...state.cartData, n[0]],
                    "list": state.list,
                    "totalPrice": state.totalPrice + parseInt(n[0].price, 10)
                }
            }
        case "deleteCartListById":
            // Delete cart
            let result = Object.entries(action.payload.id);
            let array = result.map((val) => {
                return val[0]
            });
            const price = state.cartData.filter(f => array.includes(f.id.toString()))
            const t = price.map(val => {
                return parseInt(val.price, 10) * parseInt(val.count, 10)
            })
            let tot = 0;
            for (let i = 0; i < t.length; i++) {
                tot = tot + parseInt(t[i], 10);
            }

            // filter array with array of object
            return {
                "cartData": state.cartData.filter(f => !array.includes(f.id.toString())),
                "list": state.list,
                "totalPrice": state.totalPrice - tot
            };
        case "addListCart":
            // Add Quantity
            const existingProduct1 = state.cartData.filter(val => val.id === action.payload.id);
            if (existingProduct1.length > 0) {
                const updatedCart = state.cartData.map((data) => {
                    if (data.id !== action.payload.id)
                        return data
                    else {
                        return {
                            ...data,
                            count: data.count + 1
                        }
                    }
                })
                return {
                    "cartData": [...updatedCart],
                    "list": state.list,
                    "totalPrice": state.totalPrice + parseInt(existingProduct1[0].price, 10)
                }
            }
        // eslint-disable-next-line
        case "subCartList":
            //Subtract Quantity
            const existingProduct2 = state.cartData.filter(val => val.id === action.payload.id);
            if (existingProduct2.length > 0) {
                const updatedCart = state.cartData.map((data) => {
                    if (data.id !== action.payload.id)
                        return data
                    else {
                        return {
                            ...data,
                            count: data.count - 1
                        }
                    }
                })
                return {
                    "cartData": [...updatedCart],
                    "list": state.list,
                    "totalPrice": state.totalPrice - parseInt(existingProduct2[0].price, 10)
                }
            }
        // eslint-disable-next-line
        case "clearListCarts":
            // Clear cart values
            return {
                "list": state.list,
                "totalPrice": 0,
                "cartData": []
            }

        case "search":
            let filteredData = '';
            if (state.list.length === 0)
                state.list = Data
            if (action.payload.searchInput) {
                filteredData = state.list.filter(value => {
                    if (action.payload.type === 'Category')
                        return value.Category
                            .toString()
                            .toLowerCase()
                            .includes(action.payload.searchInput.toLowerCase())
                    else
                        return value.Name
                            .toString()
                            .toLowerCase()
                            .includes(action.payload.searchInput.toLowerCase())
                })
                return {
                    "cartData": state.cartData,
                    "list": filteredData,
                    "totalPrice": state.totalPrice
                }
            }
            else {
                return {
                    "cartData": state.cartData,
                    "list": Data,
                    "totalPrice": state.totalPrice
                }
            }
        // eslint-disable-next-line
        default:
            return state;
    }
}

export default reducer;